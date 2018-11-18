using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using Common;
using System.Configuration;

namespace EmptyProjectNet40_FineUI
{
    /// <summary>
    /// UploadHandler 的摘要说明
    /// </summary>
    public class UploadHandler : Handler
    {

        public UploadConfig UploadConfig { get; private set; }
        public UploadResult Result { get; private set; }

        public UploadHandler(HttpContext context, UploadConfig config)
            : base(context)
        {
            this.UploadConfig = config;
            this.Result = new UploadResult() { State = UploadState.Unknown };
        }

        public override void Process()
        {
            byte[] uploadFileBytes = null;
            string uploadFileName = null;

            if (UploadConfig.Base64)
            {
                uploadFileName = UploadConfig.Base64Filename;
                uploadFileBytes = Convert.FromBase64String(Request[UploadConfig.UploadFieldName]);
            }
            else
            {
                var file = Request.Files[UploadConfig.UploadFieldName];
                uploadFileName = file.FileName;

                if (!CheckFileType(uploadFileName))
                {
                    Result.State = UploadState.TypeNotAllow;
                    WriteResult();
                    return;
                }
                //if (!CheckFileSize(file.ContentLength))
                //{
                //    Result.State = UploadState.SizeLimitExceed;
                //    WriteResult();
                //    return;
                //}

                uploadFileBytes = new byte[file.ContentLength];
                try
                {
                    file.InputStream.Read(uploadFileBytes, 0, file.ContentLength);
                }
                catch (Exception)
                {
                    Result.State = UploadState.NetworkError;
                    WriteResult();
                }
            }

            Result.OriginFileName = uploadFileName;

            var savePath = PathFormatter.Format(uploadFileName, UploadConfig.PathFormat);

            //var localPath = Server.MapPath(savePath);
            try
            {
                fineuisupportEntities entity = new fineuisupportEntities();
                //登录验证
                var user = System.Web.HttpContext.Current.User;
                var loginInfo = user.Identity.Name.FromJSON<dynamic>();
                string connectId = (string)loginInfo.connectId;
                entity.Database.Connection.ConnectionString = ProgramConfigHelper.GetValueByName(connectId);
                //获取当前客户端cookie的值
                UploadConfig.ControlId = CookieHelper.GetCookies("formcontrolid").ToInt32();
                var currentControl = entity.form1_controls.Where(x => x.Id == UploadConfig.ControlId).FirstOrDefault();
                if(currentControl==null)
                {
                    Result.State = UploadState.FileAccessError;
                    Result.ErrorMessage = "需要配置控件参数";
                    return;
                }

                //服务器地址
                string serverPath = "";
                if (currentControl.extraparams.FromJSON<dynamic>().ueditorServerPath != null)
                {
                    serverPath = (string)currentControl.extraparams.FromJSON<dynamic>().ueditorServerPath;
                }
                string filePath = "";
                //文件地址
                if (currentControl.extraparams.FromJSON<dynamic>().ueditorFilePath != null)
                {
                    filePath = (string)currentControl.extraparams.FromJSON<dynamic>().ueditorFilePath;
                }
                if (serverPath == "")
                {
                    Result.State = UploadState.FileAccessError;
                    Result.ErrorMessage = "服务器地址不能为空";
                    return;
                }
                if (filePath == "")
                {
                    Result.State = UploadState.FileAccessError;
                    Result.ErrorMessage = "文件地址不能为空";
                    return;
                }

                HttpPostedFile ffff = System.Web.HttpContext.Current.Request.Files[UploadConfig.UploadFieldName];
                string filePathName = DateTime.Now.Ticks + ".jpg";
                Byte[] FileByteArray = new Byte[ffff.ContentLength]; //图象文件临时储存Byte数组
                Stream StreamObject = ffff.InputStream; //建立数据流对像
                //读取图象文件数据，FileByteArray为数据储存体，0为数据指针位置、FileLnegth为数据长度
                StreamObject.Seek(0, SeekOrigin.Begin);
                StreamObject.Read(FileByteArray, 0, ffff.ContentLength);

                string serviceUrl = Path.Combine(filePath, filePathName);

                UploadFileHelper uploadFileHelper = new UploadFileHelper(serverPath);
                uploadFileHelper.Upload(FileByteArray, ffff.ContentLength, serviceUrl);

                Result.Url = "http://" + serverPath.Replace("http://", "").Split('/')[0] + serviceUrl;

                //Result.Url = "http://192.168.1.222:8018" + serverUrl;
                Result.State = UploadState.Success;
            }
            catch (Exception e)
            {
                Result.State = UploadState.FileAccessError;
                Result.ErrorMessage = e.Message;
            }
            finally
            {
                WriteResult();
            }
        }

        private void WriteResult()
        {
            this.WriteJson(new
            {
                state = GetStateMessage(Result.State),
                url = Result.Url,
                title = Result.OriginFileName,
                original = Result.OriginFileName,
                error = Result.ErrorMessage
            });
        }

        private string GetStateMessage(UploadState state)
        {
            switch (state)
            {
                case UploadState.Success:
                    return "SUCCESS";
                case UploadState.FileAccessError:
                    return "文件访问出错，请检查写入权限";
                case UploadState.SizeLimitExceed:
                    return "文件大小超出服务器限制";
                case UploadState.TypeNotAllow:
                    return "不允许的文件格式";
                case UploadState.NetworkError:
                    return "网络错误";
            }
            return "未知错误";
        }

        private bool CheckFileType(string filename)
        {
            var fileExtension = Path.GetExtension(filename).ToLower();
            return UploadConfig.AllowExtensions.Select(x => x.ToLower()).Contains(fileExtension);
        }

        private bool CheckFileSize(int size)
        {
            return size < UploadConfig.SizeLimit;
        }
    }

    public class UploadConfig
    {
        /// <summary>
        /// 文件命名规则
        /// </summary>
        public string PathFormat { get; set; }

        /// <summary>
        /// 上传表单域名称
        /// </summary>
        public string UploadFieldName { get; set; }

        /// <summary>
        /// 上传大小限制
        /// </summary>
        public int SizeLimit { get; set; }

        /// <summary>
        /// 上传允许的文件格式
        /// </summary>
        public string[] AllowExtensions { get; set; }

        /// <summary>
        /// 文件是否以 Base64 的形式上传
        /// </summary>
        public bool Base64 { get; set; }

        /// <summary>
        /// Base64 字符串所表示的文件名
        /// </summary>
        public string Base64Filename { get; set; }
        /// <summary>
        /// 控件Id
        /// </summary>
        public int ControlId { get; set; }
    }

    public class UploadResult
    {
        public UploadState State { get; set; }
        public string Url { get; set; }
        public string OriginFileName { get; set; }

        public string ErrorMessage { get; set; }
    }

    public enum UploadState
    {
        Success = 0,
        SizeLimitExceed = -1,
        TypeNotAllow = -2,
        FileAccessError = -3,
        NetworkError = -4,
        Unknown = 1,
    }
}
