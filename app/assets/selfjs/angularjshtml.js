$(function () {
    pageInit.init();
    dataInit.init();
    moduleListAction.init(2);
    moduleListAction.dropdownTree();
});

var pageInit = {
    htmlEditor: null,
    controllerEditor: null,
    modelEditor: null,
    cssEditor:null,
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

        require.config({ paths: { 'vs': '/assets/monaco_editor/min/vs' } });
        require(['vs/editor/editor.main'], function () {
            pageInit.htmlEditor = monaco.editor.create(document.getElementById('html_code'), {
                language: 'html',
                theme: "vs-dark"
            });
        });
        require.config({ paths: { 'vs': '/assets/monaco_editor/min/vs' } });
        require(['vs/editor/editor.main'], function () {
            pageInit.controllerEditor = monaco.editor.create(document.getElementById('controller_code'), {
                language: 'javascript',
                theme: "vs-dark"
            });
        });
        require.config({ paths: { 'vs': '/assets/monaco_editor/min/vs' } });
        require(['vs/editor/editor.main'], function () {
            pageInit.modelEditor = monaco.editor.create(document.getElementById('model_code'), {
                language: 'javascript',
                theme: "vs-dark"
            });
        });
        require.config({ paths: { 'vs': '/assets/monaco_editor/min/vs' } });
        require(['vs/editor/editor.main'], function () {
            pageInit.cssEditor = monaco.editor.create(document.getElementById('css_code'), {
                language: 'css',
                theme: "vs-dark"
            });
        });
    }


}

var dataInit = {
    init: function () {
        var keyId = $("#keyId").val();
        if (keyId != "") {
            $.post("/AngularjsHtml/GetDataById", {
                programId: localStorage.getItem("programId"),
                Id: keyId
            }, function (data) {
                var base = new Base64();
                var data = base.decode(data);
                data = eval("(" + data + ")");
                $("#objName").val(data.data.ds[0].Name);
                $("#objOriginName").val(data.data.ds[0].Name);
                $("#originLink").val(data.data.ds[0].originUrl);
                $("#staticLink").val(data.data.ds[0].staticUrl);
                $("#objType").val(data.data.ds[0].typename);
                $("#moduleType").val(data.data.ds[0].TypeId);
                if (data.data.ds[0].isCache.toString() == "false") {
                    $("#isCache").removeAttr("checked");
                }
                else {
                    $("#isCache").attr("checked","checked");
                }
                $("#cacheTime").val(data.data.ds[0].cacheTime);
                setTimeout(function () {
                    dataInit.bindEditor(data);
                }, 500);
                
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
            jt.bind("ready.jstree",function(obj,e){
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
            moduleListAction.openModuleTypeConfig(2);
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
    var Id = 0;
    var keyId = $("#keyId").val();
    if (keyId != "") {
        Id = parseInt(keyId);
    }
    $.post("/AngularjsHtml/UpdateData", {
        programId: localStorage.getItem("programId"),
        Id: Id,
        Html: pageInit.htmlEditor.getValue(),
        ControllerJs: pageInit.controllerEditor.getValue(),
        ModelJs: pageInit.modelEditor.getValue(),
        Css: pageInit.cssEditor.getValue(),
        OriginUrl: $("#originLink").val(),
        StaticUrl: $("#staticLink").val(),
        isCache: ($("#isCache").attr("checked") == "checked" ? 1 : 0),
        cacheTime: ($("#cacheTime").val() == "" ? 0 : parseInt($("#cacheTime").val())),
        isSeo: ($("#isSeo").attr("checked") == "checked" ? 1 : 0),
        TypeId: $("#moduleType").val()
    }, function (data) {
        if (data.status == 200) {
            layer.msg("保存成功");
            top.programRole.initMenus();
        }
        else {
            layer.alert(data.msg);
        }
    },"json");
}
//更新至生产环境
function updateAcutal() {
    var Id = 0;
    var keyId = $("#keyId").val();
    if (keyId != "") {
        Id = parseInt(keyId);
    }
    $.post("/AngularjsHtml/UpdateActual", {
        programId: localStorage.getItem("programId"),
        Id: Id,
        Html: pageInit.htmlEditor.getValue(),
        ControllerJs: pageInit.controllerEditor.getValue(),
        ModelJs: pageInit.modelEditor.getValue(),
        Css: pageInit.cssEditor.getValue(),
        OriginUrl: $("#originLink").val(),
        StaticUrl: $("#staticLink").val(),
        isCache: ($("#isCache").attr("checked") == "checked" ? 1 : 0),
        cacheTime: ($("#cacheTime").val() == "" ? 0 : parseInt($("#cacheTime").val())),
        isSeo: ($("#isSeo").attr("checked") == "checked" ? 1 : 0),
        TypeId: $("#moduleType").val(),
        Name: $("#objName").val(),
        OriginName: $("#objOriginName").val()
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