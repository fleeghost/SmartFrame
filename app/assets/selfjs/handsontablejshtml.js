$(function () {
    handsontablPageInit.init();
    dataInit.init();
    moduleListAction.init(2);
    moduleListAction.dropdownTree();
    handsontablPageInit.showEditDialog($(".editdialog"));
    handsontablPageInit.initControlProperty();
});

var handsontablPageInit = {
    editor: null,
    work_editor:null,
    init: function () {
        $(".angularjs_main").css("height", (window.screen.availHeight - 201) + "px");
        $(".controlProperty").css("height", (window.screen.availHeight - 201) + "px");
        $(".code_btn button").click(function () {
            var that = $(this);
            $(".code_btn button").removeClass("active");
            that.addClass("active");
            var porperty = that.attr("for");
            $(".angularjs_code").css("z-index", "998");
            $("#" + porperty).css("z-index", "999");

        });
        //sql数据源绑定
        $.post("/SQLInterface/GetDataSourceConfig", {
            programId: localStorage.getItem("programId"),
        }, function (data) {
            if (data.status == 200) {
                for (var i = 0; i < data.data.ds.length; i++) {
                    $("#ddlDbLink").append('<option value="' + data.data.ds[i].Id + '">' + data.data.ds[i].name + '</option>');
                }
            }
        }, "json");
    },
    //显示脚本框
    showEditDialog: function (obj) {
        $(obj).click(function () {
        });
        $(obj).focus(function () {
            $(this).blur();
        });
        $(obj).dblclick(function () {
            var that = $(this);
            var title = $(this).attr("dialogtitle");
            var content = $(this).val();
            var dialogType = $(this).attr("dialogtype");
            layer.open({
                type: 1,
                title: title,
                closeBtn: 1,
                anim: 5,
                scrollbar: false,
                shade: 0,
                shadeClose: true,
                area: ['750px', '500px'],
                content: $('#editor_area'),
                cancel: function () {
                    that.val(handsontablPageInit.editor.getValue());
                    that.next().val(handsontablPageInit.editor.getValue());
                    that.next().change();
                }
            });
            setTimeout(function () {
                $("#editor_container").html("");
                handsontablPageInit.editor = null;
                require.config({ paths: { 'vs': '/assets/monaco_editor/min/vs' } });
                require(['vs/editor/editor.main'], function () {
                    handsontablPageInit.editor = monaco.editor.create(document.getElementById('editor_container'), {
                        language: dialogType,
                        theme: "vs-dark"
                    });
                });
                setTimeout(function () {
                    handsontablPageInit.editor.setValue(that.next().val());
                }, 1000);
            },1000);
        });
    },
    //控件属性
    controlProperty: {},
    changeControlProperty:function(){
        window.frames["designFrame"].window.changeControlType(handsontablPageInit.controlProperty);
    },
    initControlProperty:function(){
        $("#controlType").change(function () {
            handsontablPageInit.controlProperty.type = $("#controlType").val();
            handsontablPageInit.changeControlProperty();
            $(".controlProp").hide();
            //属性切换
            switch ($("#controlType").val()) {
                case "4": $("#datasourceProp").show(); break;
                case "5": $("#datasourceProp").show(); break;
                case "7": $("#datasourceProp").show(); break;
                case "10": $("#picProp").show(); break;
                case "12": $("#childTableProp").show(); break;
            }
        });
        $("#controlSQLData").next().change(function () {
            handsontablPageInit.controlProperty.datasource = $("#controlSQLData").next().val();
            handsontablPageInit.changeControlProperty();
        });
        $("#controlChangeSQLData").next().change(function () {
            handsontablPageInit.controlProperty.changeDatasource = $("#controlChangeSQLData").next().val();
            handsontablPageInit.changeControlProperty();
        });
        $("#controlChangeSQLData").next().change(function () {
            handsontablPageInit.controlProperty.changeDatasource = $("#controlChangeSQLData").next().val();
            handsontablPageInit.changeControlProperty();
        });


        $("#controlDisplayValue").change(function () {
            handsontablPageInit.controlProperty.displayValue = $("#controlDisplayValue").val();
            handsontablPageInit.changeControlProperty();
        });
        $("#controlHiddenValue").change(function () {
            handsontablPageInit.controlProperty.hiddenValue = $("#controlHiddenValue").val();
            handsontablPageInit.changeControlProperty();
        });
        $("#controlName").change(function () {
            handsontablPageInit.controlProperty.name = $("#controlName").val();
            handsontablPageInit.changeControlProperty();
        });
        $("#controldefault").change(function () {
            handsontablPageInit.controlProperty.defaultValue = $("#controldefault").val();
            handsontablPageInit.changeControlProperty();
        });
        $("#controlrequired").change(function () {
            debugger;
            if ($("#controlrequired").is(":checked")) {
                handsontablPageInit.controlProperty.isRequired = "1";
            }
            else {
                handsontablPageInit.controlProperty.isRequired = "0";
            }
            
            handsontablPageInit.changeControlProperty();
        });
        $("#controlIsReadOnly").change(function () {
            if ($("#controlIsReadOnly").is(":checked")) {
                handsontablPageInit.controlProperty.isReadOnly = "1";
            }
            else {
                handsontablPageInit.controlProperty.isReadOnly = "0";
            }
            handsontablPageInit.changeControlProperty();
        });
        $("#objRole").next().change(function () {
            handsontablPageInit.controlProperty.role = $("#objRole").next().val();
            handsontablPageInit.changeControlProperty();
        });
        $("#likeSearch").change(function () {
            if ($("#likeSearch").is(":checked")) {
                handsontablPageInit.controlProperty.likeSearch = "1";
            }
            else {
                handsontablPageInit.controlProperty.likeSearch = "0";
            }

            handsontablPageInit.changeControlProperty();
        });
        $("#matchNum").change(function () {
            handsontablPageInit.controlProperty.matchNum = $("#matchNum").val();
            handsontablPageInit.changeControlProperty();
        });
        //样式属性
        $("#controlcss").next().change(function () {
            handsontablPageInit.controlProperty.controlCss = $("#controlcss").next().val();
            handsontablPageInit.changeControlProperty();
        });


        //子表属性
        $("#subPhysicalTableName").change(function () {
            handsontablPageInit.controlProperty.childListphysicalTableName = $("#subPhysicalTableName").val();
        });
        $("#childListSql").next().change(function () {
            handsontablPageInit.controlProperty.childListSql = $("#childListSql").next().val();
            handsontablPageInit.changeControlProperty();
        });
        $("#childListRowSql").next().change(function () {
            handsontablPageInit.controlProperty.childListRowSql = $("#childListRowSql").next().val();
            handsontablPageInit.changeControlProperty();
        });
        //图片属性
        $("#picSrc").change(function () {
            debugger;
            handsontablPageInit.controlProperty.picSrc = $("#picSrc").val();
            handsontablPageInit.changeControlProperty();
        });
        $("#picAllowUpload").change(function () {
            if ($("#picAllowUpload").is(":checked")) {
                handsontablPageInit.controlProperty.picAllowUpload = "1";
            }
            else {
                handsontablPageInit.controlProperty.picAllowUpload = "0";
            }

            handsontablPageInit.changeControlProperty();
        });
    },
    showControlProperty: function (obj) {
        debugger;
        $(".property_btn button").eq(1).click();
        handsontablPageInit.clearControlProperty();
        if (obj != "" && obj != undefined && obj != null) {
            var base = new Base64();
            obj = JSON.parse(base.decode(obj));
            handsontablPageInit.controlProperty = obj;
            $("#controlType").val(obj.type);
            
            $("#controlSQLData").val(obj.datasource);
            $("#controlSQLData").next().val(obj.datasource);
            $("#controlChangeSQLData").val(obj.changeDatasource);
            $("#controlChangeSQLData").next().val(obj.changeDatasource);
            $("#controlDisplayValue").val(obj.displayValue);
            $("#controlHiddenValue").val(obj.hiddenValue);
            $("#controlName").val(obj.name);
            if (obj.isRequired == "1") {
                $("#controlrequired").prop('checked', true);
            }
            if (obj.isReadOnly == "1") {
                $("#controlIsReadOnly").prop('checked', true);
            }
            $("#controldefault").val(obj.defaultValue);
            $("#objRole").val(obj.role);
            $("#objRole").next().val(obj.role);
            $(".property_btn button").eq(1).click();
            if (obj.likeSearch == "1") {
                $("#likeSearch").prop('checked', true);
            }
            $("#matchNum").val(obj.matchNum);
            //样式属性
            $("#controlcss").val(obj.controlCss);
            $("#controlcss").next().val(obj.controlCss);
            //子表属性
            $("#subPhysicalTableName").val(obj.childListphysicalTableName);
            $("#childListSql").val(obj.childListSql);
            $("#childListSql").next().val(obj.childListSql);
            $("#childListRowSql").val(obj.childListRowSql);
            $("#childListRowSql").next().val(obj.childListRowSql);
            handsontablPageInit.childListColumns = obj.childListColumns;
            //图片属性
            $("#picSrc").val(obj.picSrc);
            if (obj.picAllowUpload == "1") {
                $("#picAllowUpload").prop('checked', true);
            }
            $("#controlType").trigger("change");
        }
    },
    //清除控件属性
    clearControlProperty: function () {
        $("#controlType").val("");
        $("#controlSQLData").val("");
        $("#controlSQLData").next().val("");
        $("#controlChangeSQLData").val("");
        $("#controlChangeSQLData").next().val("");
        $("#controlDisplayValue").val("");
        $("#controlHiddenValue").val("");
        $("#controlName").val("");

        $("#controlrequired").removeAttr("checked");
        $("#controlIsReadOnly").removeAttr("checked");

        $("#controldefault").val("");
        $("#objRole").val("");
        $("#objRole").next().val("");
        $("#likeSearch").removeAttr("checked");
        $("#matchNum").val("");
        //样式属性
        $("#controlcss").val("");
        $("#controlcss").next().val("");
        //子表属性
        $("#subPhysicalTableName").val("");
        $("#childListSql").val("");
        $("#childListSql").next().val("");
        $("#childListRowSql").val("");
        $("#childListRowSql").next().val("");
        handsontablPageInit.childListColumns = [];
        //图片属性
        $("#picSrc").val("");
        $("#picAllowUpload").removeAttr("checked");
    },
    //业务流按钮
    workEventBtns:[],
    //添加业务事件
    addWorkEvent: function (data) {
        //业务流按钮事件
    },
    //删除业务事件
    deleteWorkEvent: function (obj) {
        $(obj).parent().parent().parent().remove();
    },
    //显示业务按钮
    showWorkEventBtn: function () {
        var html = "";
        for (var i = 0; i < handsontablPageInit.workEventBtns.length; i++) {
            html += '<div class="form-group" >' +
                '<div class="col-sm-3 text-center"><img src="' + handsontablPageInit.workEventBtns[i].icon +'" /></div>' +
                '<div class="col-sm-4 control">' +
                '    <label class="control-label" style="padding-top:0px">' + handsontablPageInit.workEventBtns[i].name+'</label>' +
                '</div>' +
                '<div class="col-sm-2">' +
                '    <a class="btn btn-success btn-icon btn-circle btn-xs" onclick="handsontablPageInit.editWorkEventBtn('+i+')"><i class="fa fa-pencil"></i></a>' +
                '</div>' +
                '<div class="col-sm-2">' +
                '    <a class="btn btn-danger btn-icon btn-circle btn-xs" onclick="handsontablPageInit.deleteWorkEventBtn('+i+')" ><i class="fa fa-times"></i></a>' +
                '</div>' +
                '</div >';
        }
        $("#eventList").html(html);
    },
    //新增业务按钮
    addWorkEventBtn: function () {
        layer.open({
            type: 1,
            title: '新增业务按钮',
            closeBtn: 1,
            anim: 5,
            scrollbar: false,
            shade: 0,
            shadeClose: true,
            area: ['750px', '520px'],
            content: $('#workEventBtnEdit'),
            cancel: function () {
                var workList = [];
                //保存已有的业务按钮
                $("#workEventList li").each(function () {
                    var workDetail = $(this).attr("works");
                    var base = new Base64();
                    var data = base.decode(workDetail);
                    workList.push(JSON.parse(data));
                });
                handsontablPageInit.workEventBtns.push({
                    name: $("#workEventBtnName").val(),
                    icon: $("#workEventBtnEdit_icon").val(),
                    titleInfo: $("#workEventTitleInfo").val(),
                    isValited: ($("#workEventBtnEdit_IsValited").is(":checked") ? "1" : "0"),
                    role: $("#workEventBtnEdit_Role").next().val(),
                    works: workList
                });
                handsontablPageInit.showWorkEventBtn();
            }
        });
        setTimeout(function () {
            $("#workEventBtnName").val("");
            $("#workEventBtnEdit_icon").val("");
            $("#workEventBtnEdit_IsValited").prop('checked', false);
            $("#workEventBtnEdit_Role").val("");
            $("#workEventBtnEdit_Role").next().val("");
            $("#workEventList").html("");
            $("#workList_Name").val("");
            $("#editor_workevent").html("");
            handsontablPageInit.work_editor = null;
            require.config({ paths: { 'vs': '/assets/monaco_editor/min/vs' } });
            require(['vs/editor/editor.main'], function () {
                handsontablPageInit.work_editor = monaco.editor.create(document.getElementById('editor_workevent'), {
                    language: 'sql',
                    theme: "vs-dark"
                });
            });
            setTimeout(function () {
                //handsontablPageInit.editor.setValue(that.next().val());
            }, 1000);
        }, 1000);
    },
    //删除业务按钮
    deleteWorkEventBtn: function (index) {
        handsontablPageInit.workEventBtns.splice(index, 1);
        handsontablPageInit.showWorkEventBtn();
    },
    //编辑业务按钮
    editWorkEventBtn: function (index) {
        layer.open({
            type: 1,
            title: '修改业务按钮',
            closeBtn: 1,
            anim: 5,
            scrollbar: false,
            shade: 0,
            shadeClose: true,
            area: ['750px', '520px'],
            content: $('#workEventBtnEdit'),
            cancel: function () {
                var workList = [];
                //保存已有的业务按钮
                $("#workEventList li").each(function () {
                    var workDetail = $(this).attr("works");
                    var base = new Base64();
                    var data = base.decode(workDetail);
                    workList.push(JSON.parse(data));
                });
                handsontablPageInit.workEventBtns[index].name = $("#workEventBtnName").val();
                handsontablPageInit.workEventBtns[index].icon = $("#workEventBtnEdit_icon").val();
                handsontablPageInit.workEventBtns[index].isValited = ($("#workEventBtnEdit_IsValited").is(":checked") ? "1" : "0");
                handsontablPageInit.workEventBtns[index].role = $("#workEventBtnEdit_Role").next().val();
                handsontablPageInit.workEventBtns[index].titleInfo = $("#workEventTitleInfo").val();
                handsontablPageInit.workEventBtns[index].works = workList;

                handsontablPageInit.showWorkEventBtn();
            }
        });
        setTimeout(function () {
            var currentWorkBtn = handsontablPageInit.workEventBtns[index];
            $("#workEventBtnName").val(currentWorkBtn.name);
            $("#workEventBtnEdit_icon").val(currentWorkBtn.icon);
            if (currentWorkBtn.isValited == '1') {
                $("#workEventBtnEdit_IsValited").prop('checked', true);
            }
            else {
                $("#workEventBtnEdit_IsValited").prop('checked', false);
            }
            debugger;
            $("#workEventTitleInfo").val(currentWorkBtn.titleInfo);
            $("#workEventBtnEdit_Role").val(currentWorkBtn.role);
            $("#workEventBtnEdit_Role").next().val(currentWorkBtn.role);
            $("#workEventList").html("");
            for (var i = 0; i < currentWorkBtn.works.length; i++) {
                var newWork = {
                    name: currentWorkBtn.works[i].name,
                    sql: currentWorkBtn.works[i].sql
                };
                var base = new Base64();
                var data = base.encode(JSON.stringify(newWork));
                $("#workEventList").append('<li works="' + data + '" onclick="handsontablPageInit.selectWorkLists(this)"><a href="javascript:void"><i class="fa fa-fw m-r-5"></i>' + currentWorkBtn.works[i].name + '</a></li>');
            } 

            $("#editor_workevent").html("");
            $("#workList_Name").val("");
            handsontablPageInit.work_editor = null;
            require.config({ paths: { 'vs': '/assets/monaco_editor/min/vs' } });
            require(['vs/editor/editor.main'], function () {
                handsontablPageInit.work_editor = monaco.editor.create(document.getElementById('editor_workevent'), {
                    language: 'sql',
                    theme: "vs-dark"
                });
            });
            setTimeout(function () {
                //handsontablPageInit.editor.setValue(that.next().val());
            }, 1000);
        }, 1000);
    },

    //选择icon
    selectIconBtn: function () {
        var icon_Layer = layer.open({
            type: 1,
            title: '选择图标',
            closeBtn: 1,
            anim: 5,
            scrollbar: false,
            shade: 0,
            shadeClose: true,
            area: ['500px', '350px'],
            content: $('#iconselect'),
            cancel: function () {
            }
        });
        $(".icon_box").click(function () {
            $("#workEventBtnEdit_icon").val($(this).find("img").attr("src"));
            layer.close(icon_Layer);
        });
    },
    //新增业务流
    addWorkLists: function () {
        var newWork = {
            name: "业务流",
            sql: ""
        };
        var base = new Base64();
        var data = base.encode(JSON.stringify(newWork));
        $("#workEventList").append('<li works="' + data +'" onclick="handsontablPageInit.selectWorkLists(this)"><a href="javascript:void"><i class="fa fa-fw m-r-5"></i>' + "业务流" + '</a></li>');
    },
    //选择业务流
    selectWorkLists: function (obj) {
        var works = $(obj).attr("works");
        var base = new Base64();
        var data = JSON.parse(base.decode(works));
        $("#workList_Name").val(data.name);
        handsontablPageInit.work_editor.setValue(data.sql);
        $.currentWoekList = obj;
    },
    //保存业务流
    saveWorkLists: function () {
        if ($.currentWoekList != undefined) {
            var newWork = {
                name: $("#workList_Name").val(),
                sql: handsontablPageInit.work_editor.getValue()
            };
            var base = new Base64();
            var data = base.encode(JSON.stringify(newWork));
            $($.currentWoekList).attr("works", data);
            $($.currentWoekList).html('<a href="javascript:void"><i class="fa fa-fw m-r-5"></i>' + $("#workList_Name").val() + '</a>');
            layer.msg("保存成功");
        }
    },
    upWorkList: function () {
        if ($($.currentWoekList).prev())
            $($.currentWoekList).after($($.currentWoekList).prev());
    },
    downWorkList: function () {
        if ($($.currentWoekList).next())
            $($.currentWoekList).next().after($($.currentWoekList));
    },
    deleteWorkList: function () {
        $($.currentWoekList).remove();
        $("#workList_Name").val("");
        handsontablPageInit.work_editor.setValue("");
    },

    childListColumns:[],
    //显示子表列数据
    showChildListColumns: function () {
        $("#childListColumns_form form").html("");
        handsontablPageInit.childListColumns = (handsontablPageInit.childListColumns == null ? [] : handsontablPageInit.childListColumns);
        if (handsontablPageInit.childListColumns.length > 0) {
            for (var i = 0; i < handsontablPageInit.childListColumns.length; i++) {
                var checkedObj = handsontablPageInit.childListColumns[i].colShow == "1" ? ("checked='checked'") : '';
                var html = '<div class="form-group colInfo">' +
                        '<div class="col-xs-3">' +
                            '<input type="text" class="form-control param_input" placeholder="列名称" value="' + handsontablPageInit.childListColumns[i].colName + '">' +
                        '</div>' +
                        '<div class="col-xs-3">' +
                             '<input type="text" class="form-control param_input" placeholder="列描述" value="' + handsontablPageInit.childListColumns[i].colDesc + '">' +
                        '</div>' +
                         '<div class="col-xs-2">' +
                             '<input type="checkbox" ' + checkedObj + ' /> <span class="param_input" style="color:white">是否显示 </span>  ' +
                        '</div>' +
                        '<div class="col-xs-2">' +
                             '<a class="btn btn-danger btn-icon btn-circle btn-xs" onclick="handsontablPageInit.deleteChildListColumns(this)"><i class="fa fa-times"></i></a>' +
                        '</div>' +
                    '</div>';
                $("#childListColumns_form form").append(html);
            }
        }

        layer.open({
            type: 1,
            title: '子表列数据',
            closeBtn: 1,
            anim: 5,
            shadeClose: false,
            area: ['750px', '500px'],
            content: $("#childListColumns"),
            end: function () {
                handsontablPageInit.childListColumns = [];
                $(".colInfo").each(function () {
                    handsontablPageInit.childListColumns.push({
                        colName: $(this).find(".colName").val(),
                        colDesc: $(this).find(".colDesc").val(),
                        colShow: ($(this).find(".colShow").is(":checked")?"1":"0")
                    });
                });
                handsontablPageInit.controlProperty.childListColumns = handsontablPageInit.childListColumns;
                handsontablPageInit.changeControlProperty();
            }
        });
    },
    addChildListColumns: function () {
        var html = '<div class="form-group colInfo">' +
                    '<div class="col-xs-3">' +
                        '<input type="text" class="form-control param_input colName" placeholder="列名称" value="' + '' + '">' +
                    '</div>' +
                    '<div class="col-xs-3">' +
                         '<input type="text" class="form-control param_input colDesc" placeholder="列描述" value="' + '' + '">' +
                    '</div>' +
                    '<div class="col-xs-2">' +
                         '<input type="checkbox" checked="checked" /> <span class="param_input" style="color:white">是否显示 </span>  ' +
                    '</div>' +
                     '<div class="col-xs-2">' +
                         '<a class="btn btn-danger btn-icon btn-circle btn-xs" onclick="handsontablPageInit.deleteChildListColumns(this)"><i class="fa fa-times"></i></a>' +
                         '</div>' +
                    '</div>';
        $("#childListColumns_form form").append(html);
    },
    deleteChildListColumns: function (obj) {
        $(obj).parent().parent().remove();
    },
    //初始化列
    initPhysicalColumns: function () {
        var physcialName = $("#physicalTableName").val();
        $.post("/HandsontablejsHtml/GetPhysicalColumnName", {
            programId: localStorage.getItem("programId"),
            physicalTableName: physcialName
        }, function (data) {
            if (data.data != null && data.data != undefined) {
                $("#childListColumns_form form").html("");
                for (var i = 0; i < data.data.ds.length; i++) {
                    var html = '<div class="form-group colInfo">' +
                    '<div class="col-xs-3">' +
                        '<input type="text" class="form-control param_input colName" placeholder="列名称" value="' + data.data.ds[i].COLUMN_NAME + '">' +
                    '</div>' +
                    '<div class="col-xs-3">' +
                         '<input type="text" class="form-control param_input colDesc" placeholder="列描述" value="' + data.data.ds[i].COLUMN_NAME + '">' +
                    '</div>' +
                    '<div class="col-xs-2">' +
                         '<input type="checkbox" checked="checked" class="colShow" /> <span class="param_input" style="color:white">是否显示 </span>  ' +
                    '</div>' +
                    '<div class="col-xs-2">' +
                         '<a class="btn btn-danger btn-icon btn-circle btn-xs" onclick="handsontablPageInit.deleteChildListColumns(this)"><i class="fa fa-times"></i></a>' +
                         '</div>' +
                    '</div>';
                    '</div>';
                    $("#childListColumns_form form").append(html);
                }
            }
        },"json");
    },
    //更改物理表名时，自动更新或新增系统初始化
    changePhysicalTableName: function () {
        var physicalTableName = $("#physicalTableName").val();
        $.post("/HandsontablejsHtml/GetWorkEventSql", {
            programId: localStorage.getItem("programId"),
            physicalTableName: physicalTableName
        }, function (sqlObj) {
            var sql_insert = sqlObj.insert;
            var sql_update = sqlObj.update;
            var sql_delete = sqlObj.delete;
            var sql_init = sqlObj.init;


            //判断业务按钮中是否已存在系统级别的保存按钮，该按钮不允许删除
            var isHave = false;
            for (var i = 0; i < handsontablPageInit.workEventBtns.length; i++) {
                if (handsontablPageInit.workEventBtns[i].name == '新增') {
                    isHave = true;
                    for (var j = 0; j < handsontablPageInit.workEventBtns[i].works.length; j++) {
                        if (handsontablPageInit.workEventBtns[i].works[j].name == '系统新增') {
                            handsontablPageInit.workEventBtns[i].works[j].sql = sql_insert;
                        }
                    }
                }
            }
            if (!isHave) {
                handsontablPageInit.workEventBtns.push({
                    name: '新增',
                    icon: '/res/common_icon/add.png',
                    isValited: '1',
                    role: '',
                    works: [{
                        name: '系统新增',
                        sql: sql_insert
                    }]
                })
            }
            var isHave = false;
            for (var i = 0; i < handsontablPageInit.workEventBtns.length; i++) {
                if (handsontablPageInit.workEventBtns[i].name == '保存') {
                    isHave = true;
                    for (var j = 0; j < handsontablPageInit.workEventBtns[i].works.length; j++) {
                        if (handsontablPageInit.workEventBtns[i].works[j].name == '系统保存') {
                            handsontablPageInit.workEventBtns[i].works[j].sql = sql_update;
                        }
                    }
                }
            }
            if (!isHave) {
                handsontablPageInit.workEventBtns.push({
                    name: '保存',
                    icon: '/res/common_icon/system_save.gif',
                    isValited: '1',
                    role: '',
                    works: [{
                        name: '系统保存',
                        sql: sql_update
                    }]
                })
            }
            var isHave = false;
            for (var i = 0; i < handsontablPageInit.workEventBtns.length; i++) {
                if (handsontablPageInit.workEventBtns[i].name == '删除') {
                    isHave = true;
                    for (var j = 0; j < handsontablPageInit.workEventBtns[i].works.length; j++) {
                        if (handsontablPageInit.workEventBtns[i].works[j].name == '系统删除') {
                            handsontablPageInit.workEventBtns[i].works[j].sql = sql_delete;
                        }
                    }
                }
            }
            if (!isHave) {
                handsontablPageInit.workEventBtns.push({
                    name: '删除',
                    icon: '/res/common_icon/delete.png',
                    isValited: '1',
                    role: '',
                    works: [{
                        name: '系统删除',
                        sql: sql_delete
                    }]
                })
            }
            handsontablPageInit.showWorkEventBtn();
            $("#objSQL").val(sql_init);
            $("#objSQL").next().val(sql_init);
            layer.msg("初始化完成");
        },"json");
    },
    initGlobalControlName: function () {
        window.frames["designFrame"].window.initGlobalName();
        //layer.msg("初始化控件名称成功");
    }
}

var dataInit = {
    init: function () {
        var keyId = $("#keyId").val();
        if (keyId != "") {
            $.post("/HandsontablejsHtml/GetDataById", {
                programId: localStorage.getItem("programId"),
                Id: keyId
            }, function (data) {
                var base = new Base64();
                var data = base.decode(data);
                data = eval("(" + data + ")");
                $("#objNo").val(data.data.ds[0].no);
                $("#objName").val(data.data.ds[0].name);
                $("#physicalTableName").val(data.data.ds[0].physicalTableName);
                $("#objType").val(data.data.ds[0].typename);
                $("#moduleType").val(data.data.ds[0].TypeId);
                if (data.data.ds[0].connectId != undefined && data.data.ds[0].connectId != '' && data.data.ds[0].connectId != 0) {
                    $("#ddlDbLink").val(data.data.ds[0].connectId);
                }
                $("#objSQL").val(data.data.ds[0].sql);
                $("#objSQL").next().val(data.data.ds[0].sql);
                setTimeout(function () {
                    window.frames["designFrame"].window.loadHot(data.data.ds[0].designContent);
                }, 500);
                debugger;
                for (var i = 0; i < data.data.ds1.length; i++) {

                    var workList = [];
                    if (data.data.ds1[i].workEvent != '') {
                        var base = new Base64();
                        workList = JSON.parse(base.decode(data.data.ds1[i].workEvent));
                    }
                    handsontablPageInit.workEventBtns.push({
                        name: data.data.ds1[i].workName,
                        icon: data.data.ds1[i].workIcon,
                        titleInfo: data.data.ds1[i].workTitle,
                        isValited: (data.data.ds1[i].IsValited?'1':'0'),
                        role: data.data.ds1[i].workRole,
                        works: workList
                    });
                    handsontablPageInit.showWorkEventBtn();
                }
            });
        }
    },
    bindEditor: function (data) {
        if (pageInit.htmlEditor == null || pageInit.htmlEditor == undefined) {
            setTimeout(function () {
                dataInit.bindEditor(data);
            }, 500);
        }
        else {
            pageInit.htmlEditor.setValue(data.data.ds[0].Html);
            pageInit.controllerEditor.setValue(data.data.ds[0].ControllerJs);
            pageInit.modelEditor.setValue(data.data.ds[0].ModelJS);
            pageInit.cssEditor.setValue(data.data.ds[0].Css);
        }
    }
}

//项目类型
var moduleListAction = {
    init: function (moduleMode) {
        $.post("/Program/ModuleTypeList", {
            programId: localStorage.getItem("programId"),
            moduleMode: moduleMode
        }, function (data) {
            var moduleTypeList = data;
            var treeNodes = [];
            for (var i = 0; i < moduleTypeList.ds.length; i++) {
                if (moduleTypeList.ds[i].ParentId == 0) {
                    var root = {
                        "text": moduleTypeList.ds[i].Name,
                        "icon": "fa fa-file-o",
                        "typeId": moduleTypeList.ds[i].Id
                    }
                    root.children = moduleListAction.getChildrenNodes(moduleTypeList, moduleTypeList.ds[i].Id);
                    treeNodes.push(root);
                }
            }
            var jt = $("#moduleTypeList").jstree({
                "core": {
                    "themes": {
                        "responsive": false
                    },
                    "check_callback": true,
                    'data': treeNodes
                },
                //"types": {
                //    "default": {
                //        "icon": "fa fa-folder text-warning fa-lg"
                //    },
                //    "file": {
                //        "icon": "fa fa-file text-warning fa-lg"
                //    }
                //},
                //"state": { "key": "demo2" },
                "plugins": ["contextmenu", "dnd", "state", "types"],
                "contextmenu": {
                    "items": {
                        "create": null,
                        "rename": null,
                        "remove": null,
                        "ccp": null,
                        "新建": {
                            "label": "新建",
                            "action": function (data) {
                                $.ddtFlag++;
                                var inst = $.jstree.reference(data.reference),
                                    obj = inst.get_node(data.reference);
                                $.post("/Program/AddModuleType", {
                                    programId: localStorage.getItem("programId"),
                                    moduleMode: moduleMode,
                                    name: "新类型",
                                    parentId: obj.original.typeId
                                }, function (data) {
                                    if (data.status == 200) {
                                        inst.create_node(obj, {
                                            "icon": "fa fa-file-o",
                                            "text": "新类型",
                                            "typeId": data.data
                                        }, "last", function (new_node) {
                                            setTimeout(function () {
                                                inst.edit(new_node);
                                            }, 0);
                                        });
                                    }
                                }, "json");
                            }
                        },
                        "编辑": {
                            "label": "编辑",
                            "action": function (data) {
                                $.ddtFlag++;
                                var inst = $.jstree.reference(data.reference),
							    obj = inst.get_node(data.reference);
                                inst.edit(obj);
                            }
                        },
                        "删除": {
                            "label": "删除",
                            "action": function (data) {
                                $.ddtFlag++;
                                var inst = $.jstree.reference(data.reference),
							        obj = inst.get_node(data.reference);
                                $.post("/Program/DeleteModuleType", {
                                    programId: localStorage.getItem("programId"),
                                    moduleMode: moduleMode,
                                    typeId: obj.original.typeId
                                }, function (data) {
                                    debugger;
                                    if (data == "ok") {
                                        inst.delete_node(inst.get_selected());
                                    }
                                    else {
                                        layer.alert("请先删除子节点或子文件");
                                    }
                                });
                            }
                        }
                    }
                }
            });
            jt.bind("rename_node.jstree", function (event, data) {
                $.post("/Program/UpdateModuleType", {
                    name: data.node.text,
                    typeId: data.node.original.typeId,
                    programId: localStorage.getItem("programId"),
                    moduleMode: moduleMode
                }, function (data) { });
            })
            jt.bind("move_node.jstree", function (event, data) {
                //debugger;
            })
            jt.bind("activate_node.jstree", function (obj, e) {
                var currentNode = e.node;
                $(".treedropdownlist").val(currentNode.text);
                $("#moduleTypeList").hide();
                $("#moduleType").val(currentNode.original.typeId);
            })
            jt.bind("ready.jstree", function (obj, e) {
                $(".jstree-themeicon").hide();
            });
        }, "json");
    },
    getChildrenNodes: function (moduleTypeList, parentId) {
        var node = [];
        for (var i = 0; i < moduleTypeList.ds.length; i++) {
            if (moduleTypeList.ds[i].ParentId == parentId) {
                var n = {
                    "text": moduleTypeList.ds[i].Name,
                    "icon": "fa fa-file-o",
                    "typeId": moduleTypeList.ds[i].Id
                }
                n.children = moduleListAction.getChildrenNodes(moduleTypeList, moduleTypeList.ds[i].Id);
                node.push(n);
            }
        }
        return node;
    },
    dropdownTree: function () {
        //$.ddtFlag = 0;
        $(".treedropdownlist").click(function () {
            //$.ddtFlag++;
            //var pos = $(this).position();
            //$("#moduleTypeList").css("left", pos.left + "px");
            //$("#moduleTypeList").css("top", pos.top + $(this).parent().height() + "px");
            //$("#moduleTypeList").css("width", $(this).parent().width());
            //moduleListAction.init(2);
            //$("#moduleTypeList").toggle();
            moduleListAction.openModuleTypeConfig(6);
        });
        //$("body").click(function () {
        //    if ($.ddtFlag == 0) {
        //        $("#moduleTypeList").hide();
        //    }
        //    $.ddtFlag = 0;
        //});
        //$("#moduleTypeList").click(function () {
        //    $.ddtFlag++;
        //});
        //$("#moduleTypeList").find("*").click(function () {
        //    $.ddtFlag++;
        //});
    },
    //打开模块分类
    openModuleTypeConfig: function (moduleType) {
        $.moduleTpyeIndex = layer.open({
            type: 2,
            title: '类型编辑',
            closeBtn: 1,
            anim: 5,
            shadeClose: false,
            area: ['750px', '500px'],
            content: ['/Home/ModuleType?moduleType=' + moduleType, 'no']
        });
    },
    //关闭模块分类
    closeModuleTypeConfig: function (name, typeId) {
        $("#objType").val(name);
        $("#moduleType").val(typeId);
        layer.close($.moduleTpyeIndex);
    }
}

//保存数据
function savedata() {
    debugger;
    var Id = 0;
    var keyId = $("#keyId").val();
    if (keyId != "") {
        Id = parseInt(keyId);
    }

    $.post("/HandsontablejsHtml/UpdateData", {
        programId: localStorage.getItem("programId"),
        Id: Id,
        no: $("#objNo").val(),
        physicalTableName: $("#physicalTableName").val(),
        name: $("#objName").val(),
        TypeId: $("#moduleType").val(),
        connectId: $("#ddlDbLink").val(),
        sql: $("#objSQL").next().val(),
        designContent: window.frames["designFrame"].window.save(),
        works: handsontablPageInit.workEventBtns
    }, function (data) {
        if (data.status == 200) {
            layer.msg("更新成功");
            top.programRole.initMenus();
        }
        else {
            layer.msg(data.msg);
        }
    }, "json");
}
function updateAcutal() {
    var Id = 0;
    var keyId = $("#keyId").val();
    if (keyId != "") {
        Id = parseInt(keyId);
    }
    $.post("/HandsontablejsHtml/UpdateActual", {
        programId: localStorage.getItem("programId"),
        selectlistId: Id
    }, function (data) {
        if (data.status == 200) {
            layer.msg("更新成功");
            top.programRole.initMenus();
        }
        else {
            layer.alert(data.msg);
        }
    }, "json");
}