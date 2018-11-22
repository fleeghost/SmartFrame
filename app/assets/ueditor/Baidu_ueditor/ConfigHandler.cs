﻿using System;
using System.Collections.Generic;
using System.Web;
using System.Linq;
namespace EmptyProjectNet40_FineUI
{
    /// <summary>
    /// Config 的摘要说明
    /// </summary>
    public class ConfigHandler : Handler
    {
        public ConfigHandler(HttpContext context) : base(context) { }

        public override void Process()
        {
            WriteJson(Config.Items);
        }
    }
}