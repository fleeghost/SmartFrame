$(function () {
    pageInit.init();
    dataInit.init();
    moduleListAction.init(2);
    moduleListAction.dropdownTree();
});

var pageInit = {
    sqlEditor: null,
    jsonEdotor: null,
    sqlParamsList: [],
    init: function () {
        $(".sql_main").css("height", (window.screen.availHeight - 201) * 0.6 + "px");
        $("#paramsList form").css("height", (window.screen.availHeight - 250) * 0.3 + "px");
        $("#debugger_result").css("height", (window.screen.availHeight - 206) * 0.3 + "px");
        require.config({ paths: { 'vs': '/assets/monaco_editor/min/vs' } });
        require(['vs/editor/editor.main'], function () {
            pageInit.sqlEditor = monaco.editor.create(document.getElementById('sql_code'), {
                language: 'sql',
                theme: "vs-dark"
            });
        });
        require.config({ paths: { 'vs': '/assets/monaco_editor/min/vs' } });
        require(['vs/editor/editor.main'], function () {
            pageInit.jsonEdotor = monaco.editor.create(document.getElementById('debugger_result'), {
                language: 'json',
                theme: "vs-dark",
                value: '{}'
            });
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
    insertSqlParams: function (sqlParamsObj) {
        sqlParamsObj = $.extend({
            name: "",
            type: "int",
            remark: "",
            id: 0
        }, sqlParamsObj);
        pageInit.sqlParamsList.push(sqlParamsObj);
        var html = '<div class="form-group">' +
                    '<div class="col-xs-3">' +
                        '<input type="text" class="form-control param_input" placeholder="参数名称" value="' + sqlParamsObj.name + '">' +
                        '<input type="hidden" class="keyid" value="' + sqlParamsObj.id + '" />' +
                    '</div>' +
                    '<div class="col-xs-3">' +
                        '<select class="form-control param_input" placeholder="参数类型">' +
                            '<option value="int"' + (sqlParamsObj.type == "int" ? "selected" : "") + '>int</option>' +
                            '<option value="varchar"' + (sqlParamsObj.type == "varchar" ? "selected" : "") + '>varchar</option>' +
                            '<option value="nvarchar"' + (sqlParamsObj.type == "nvarchar" ? "selected" : "") + '>nvarchar</option>' +
                            '<option value="decimal"' + (sqlParamsObj.type == "decimal" ? "selected" : "") + '>decimal</option>' +
                            '<option value="bit"' + (sqlParamsObj.type == "bit" ? "selected" : "") + '>bit</option>' +
                        '</select>' +
                    '</div>' +
                    '<div class="col-xs-3">' +
                        '<input type="text" class="form-control param_input" placeholder="备注" value="' + sqlParamsObj.remark + '">' +
                    '</div>' +
                    '<div class="col-xs-3">' +
                        '<a class="btn btn-danger btn-icon btn-circle btn-xs" onclick="pageInit.removeSqlParams(this)" sqlId="' + sqlParamsObj.id + '" ><i class="fa fa-times"></i></a>' +
                    '</div>' +
                    '</div>';
        $("#paramsList form").append(html);
    },
    bindSqlParams: function (data) {
        $("#paramsList form").html("");
        pageInit.sqlParamsList = [];
        for (var i = 0; i < data.data2.ds.length; i++) {
            pageInit.insertSqlParams({
                name: data.data2.ds[i].ParamName,
                type: data.data2.ds[i].ParamType,
                remark: data.data2.ds[i].Remark,
                id: data.data2.ds[i].Id
            });
        }
    },
    removeSqlParams: function (obj) {
        $(obj).parent().parent().remove();
    },
    //运行调试
    run_debugger: function () {
        var sql = pageInit.sqlEditor.getValue();
        var listSqlParam = [];
        var i = 0;
        $("#paramsList .form-group").each(function () {
            listSqlParam.push({
                name: $(this).find(".form-control").eq(0).val(),
                type: $(this).find(".form-control").eq(1).val(),
                value: $(".paramValue").eq(i).val()
            });
            i++;
        });
        //for (var i = 0; i < pageInit.sqlParamsList.length; i++) {
        //    listSqlParam.push({
        //        name: pageInit.sqlParamsList[i].name,
        //        type: pageInit.sqlParamsList[i].type,
        //        value: $(".paramValue").eq(i).val()
        //    })
        //}
        $.post("/SQLInterface/DebuggerSQL", {
            programId: localStorage.getItem("programId"),
            sql: pageInit.sqlEditor.getValue(),
            listSqlParam: listSqlParam,
            connStrId: $("#ddlDbLink").val()
        }, function (data) {
            layer.closeAll();
            pageInit.jsonEdotor.setValue(data);
        });
    },

}

var dataInit = {
    init: function () {
        var keyId = $("#keyId").val();
        if (keyId != "") {
            $.post("/SQLInterface/GetDataById", {
                programId: localStorage.getItem("programId"),
                Id: keyId
            }, function (data) {
                var base = new Base64();
                var data = base.decode(data);
                data = eval("(" + data + ")");
                //$("#objName").val(data.data.ds[0].Name);
                //$("#originLink").val(data.data.ds[0].originUrl);
                //$("#staticLink").val(data.data.ds[0].staticUrl);
                //$("#objType").val(data.data.ds[0].typename);
                //$("#moduleType").val(data.data.ds[0].TypeId);
                //if (data.data.ds[0].isCache.toString() == "false") {
                //    $("#isCache").removeAttr("checked");
                //}
                //else {
                //    $("#isCache").attr("checked", "checked");
                //}
                //$("#cacheTime").val(data.data.ds[0].cacheTime);
                //sql参数
                pageInit.bindSqlParams(data);
                $("#objName").val(data.data.ds[0].name);
                $("#objDesc").val(data.data.ds[0].desc);
                $("#objType").val(data.data.ds[0].typename);
                $("#moduleType").val(data.data.ds[0].typeId);
                if (data.data.ds[0].connectId != undefined && data.data.ds[0].connectId != '' && data.data.ds[0].connectId != 0) {
                    $("#ddlDbLink").val(data.data.ds[0].connectId);
                }
                setTimeout(function () {
                    dataInit.bindEditor(data);
                }, 500);

            });
        }
    },
    bindEditor: function (data) {
        if (pageInit.sqlEditor == null || pageInit.sqlEditor == undefined) {
            setTimeout(function () {
                dataInit.bindEditor(data);
            }, 500);
        }
        else {
            pageInit.sqlEditor.setValue(data.data.ds[0].sql);
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
        $.ddtFlag = 0;
        $(".treedropdownlist").click(function () {
            //$.ddtFlag++;
            //var pos = $(this).position();
            //$("#moduleTypeList").css("left", pos.left + "px");
            //$("#moduleTypeList").css("top", pos.top + $(this).parent().height() + "px");
            //$("#moduleTypeList").css("width", $(this).parent().width());
            //moduleListAction.init(2);
            //$("#moduleTypeList").toggle();
            moduleListAction.openModuleTypeConfig(4);
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

//运行调试
function run() {
    $("#debugger_form form").html("");
    $("#paramsList .form-group").each(function () {
        var sqlParamsObj = {
            Id: parseInt($(this).find(".keyid").val()),
            paramName: $(this).find(".form-control").eq(0).val(),
            paramType: $(this).find(".form-control").eq(1).val(),
            remark: $(this).find(".form-control").eq(2).val()
        };
        var html = '<div class="form-group">' +
                    '<div class="col-xs-3">' +
                        '<input type="text" class="form-control param_input" readonly placeholder="参数名称" value="' + sqlParamsObj.paramName + '">' +
                    '</div>' +
                    '<div class="col-xs-2">' +
                        '<select class="form-control param_input" placeholder="参数类型" readonly>' +
                            '<option value="int"' + (sqlParamsObj.paramType == "int" ? "selected" : "") + '>int</option>' +
                            '<option value="varchar"' + (sqlParamsObj.paramType == "varchar" ? "selected" : "") + '>varchar</option>' +
                            '<option value="nvarchar"' + (sqlParamsObj.paramType == "nvarchar" ? "selected" : "") + '>nvarchar</option>' +
                            '<option value="decimal"' + (sqlParamsObj.paramType == "decimal" ? "selected" : "") + '>decimal</option>' +
                            '<option value="bit"' + (sqlParamsObj.paramType == "bit" ? "selected" : "") + '>bit</option>' +
                        '</select>' +
                    '</div>' +
                    '<div class="col-xs-3">' +
                        '<input type="text" class="form-control param_input" readonly placeholder="备注" value="' + sqlParamsObj.remark + '">' +
                    '</div>' +
                    '<div class="col-xs-3">' +
                        '<input type="text" class="form-control param_input paramValue"  placeholder="参数值" value="">' +
                    '</div>' +
                    '</div>';
        $("#debugger_form form").append(html);
    });
    layer.open({
        type: 1,
        title: '调试SQL',
        closeBtn: 1,
        anim: 5,
        shadeClose: false,
        area: ['750px', '500px'],
        content: $("#debuggerDom")
    });
}
//保存数据
function savedata() {
    var keyId = $("#keyId").val();
    var listSqlParams = [];
    $("#paramsList .form-group").each(function () {
        listSqlParams.push({
            Id: parseInt($(this).find(".keyid").val()),
            paramName: $(this).find(".form-control").eq(0).val(),
            paramType: $(this).find(".form-control").eq(1).val(),
            remark: $(this).find(".form-control").eq(2).val()
        });
    });
    $.post("/SQLInterface/UpdateData", {
        programId: localStorage.getItem("programId"),
        Id: parseInt(keyId),
        name: $("#objName").val(),
        sql: pageInit.sqlEditor.getValue(),
        connectId: parseInt($("#ddlDbLink").val()),
        desc: $("#objDesc").val(),
        typeId: parseInt($("#moduleType").val()),
        listSqlParams: listSqlParams
    }, function (data) {
        layer.msg("保存成功");
        top.programRole.initMenus();
    });
}
