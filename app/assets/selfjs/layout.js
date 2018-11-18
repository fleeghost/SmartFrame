$(function () {
    fileAction();
    //mainTabAction.addTab('测试', '');
    
    pageInit();
    menuAction.init();
    programRole.initProgram();
    programRole.initMenus();
    moduleListAction.dropdownTree();
    //按键初始
    top.$.keyEvent = false;
});

//项目权限类
var programRole = {
    //是否选中项目
    selectionProgram: function () {
        if (localStorage.getItem("programId") == null || localStorage.getItem("programId") == undefined) {
            layer.alert("请先选择项目");
            return false;
        }
        else {
            return true;
        }
    },
    //项目初始化
    initProgram: function () {
        var originLastestPrograms = localStorage.getItem("lastestPrograms");
        if (originLastestPrograms == null || originLastestPrograms == undefined || originLastestPrograms == "") {
            originLastestPrograms = "[]";
        }
        originLastestPrograms = JSON.parse(originLastestPrograms);
        $("#lastestProgram").html("");
        for (var i = 0; i < originLastestPrograms.length; i++) {
            $("#lastestProgram").append('<li><a href="javascript:;"><i class="fa fa-fw m-r-5 fa-file-text-o "></i>' + originLastestPrograms[i].programName + '</a></li>');
        }
    },
    //项目菜单初始化
    initMenus: function () {
        //通过项目Id来获取模块列表
        $.post("/Program/ModuleList", {
            programId: localStorage.getItem("programId")
        }, function (data) {
            $("#programName").html(data.programName);
            //moduleList1,拖拽式布局
            //var moduleTypeList1 = data.moduleTypeList1;
            //var moduleList1 = data.moduleList1;
            //var html = "";
            //for (var i = 0; i < moduleTypeList1.ds.length; i++) {
            //    //根节点
            //    if (moduleTypeList1.ds[i]["ParentId"] == 0) {
            //        var childHtml = "";
            //        childHtml = programRole.selectlist1Init(moduleTypeList1, moduleList1, childHtml, moduleTypeList1.ds[i]["Id"]);
            //        if (childHtml == "") {
            //            html += '<li>' +
            //                    '<a href="javascript:;">' +
            //                        moduleTypeList1.ds[i]["Name"] +
            //                    '</a>';
            //            html += '</li>';
            //        }
            //        else {
            //            html += '<li class="has-sub">' +
            //                    '<a href="javascript:;">' +
            //                        '<b class="caret pull-right"></b>' +
            //                        moduleTypeList1.ds[i]["Name"] +
            //                    '</a>';
            //            //中间插入所需要的节点
            //            html += '<ul class="sub-menu" style="display: block;">';
            //            //递归节点
            //            //html = programRole.selectlist1Init(moduleTypeList1, moduleList1, html, moduleTypeList1.ds[i]["Id"]);
            //            html += childHtml;
            //            //插入文件的节点
            //            for (var j = 0; j < moduleList1.ds.length; j++) {
            //                if (moduleList1.ds[j].TypeId == moduleTypeList1.ds[i]["Id"]) {
            //                    html += '<li><a href="javascript:;">' + moduleList1.ds[j].Name + '</a></li>';
            //                }
            //            }
            //            html += '</ul>';
            //            html += '</li>';
            //        }
            //    }
            //}
            //$("#menuNav .top_nav").eq(0).html(html);
            //$("#menuNav .totalNum").eq(0).html(moduleList1.ds.length);
            //moduleList2,AngularJs
            var moduleTypeList2 = data.moduleTypeList2;
            var moduleList2 = data.moduleList2;
            html = "";
            for (var i = 0; i < moduleTypeList2.ds.length; i++) {
                //根节点
                if (moduleTypeList2.ds[i]["ParentId"] == 0) {
                    var childHtml = "";
                    childHtml = programRole.selectlist2Init(moduleTypeList2, moduleList2, childHtml, moduleTypeList2.ds[i]["Id"]);
                    if (childHtml == "") {
                        //判断是否有子节点文件
                        var subFileHtml = "";
                        //插入文件的节点
                        for (var j = 0; j < moduleList2.ds.length; j++) {
                            if (moduleList2.ds[j].TypeId == moduleTypeList2.ds[i]["Id"]) {
                                subFileHtml += '<li><a href="javascript:;" onclick="mainTabAction.addTab(\'' + moduleList2.ds[j]["Name"] + '\', \'/AngularjsHtml/Index?Id=' + moduleList2.ds[j]["Id"] + '\')">' + moduleList2.ds[j].Name + '</a></li>';
                            }
                        }
                        if (subFileHtml != "") {
                            subFileHtml = '<ul class="sub-menu" style="display: block;">' + subFileHtml + '</ul>';
                        }
                        if (subFileHtml == "") {
                            html += '<li>' +
                               '<a href="javascript:;">' +
                                    moduleTypeList2.ds[i].Name +
                               '</a>';
                        }
                        else {
                            html += '<li class="has-sub">' +
                               '<a href="javascript:;">' +
                                    '<b class="caret pull-right"></b>' +
                                               moduleTypeList2.ds[i].Name +
                               '</a>';
                            html += subFileHtml;
                        }
                        html += '</li>';
                    }
                    else {
                        html += '<li class="has-sub">' +
                                '<a href="javascript:;">' +
                                    '<b class="caret pull-right"></b>' +
                                    moduleTypeList2.ds[i]["Name"] +
                                '</a>';
                        //中间插入所需要的节点
                        html += '<ul class="sub-menu" style="display: block;">';
                        //递归节点
                        //html = programRole.selectlist1Init(moduleTypeList1, moduleList1, html, moduleTypeList1.ds[i]["Id"]);
                        html += childHtml;
                        //插入文件的节点
                        for (var j = 0; j < moduleList2.ds.length; j++) {
                            if (moduleList2.ds[j].TypeId == moduleTypeList2.ds[i]["Id"]) {
                                //html += '<li><a href="javascript:;">' + moduleList2.ds[j].Name + '</a></li>';
                                html += '<li><a href="javascript:;" onclick="mainTabAction.addTab(\'' + moduleList2.ds[j]["Name"] + '\', \'/AngularjsHtml/Index?Id=' + moduleList2.ds[j]["Id"] + '\')">' + moduleList2.ds[j].Name + '</a></li>';
                            }
                        }
                        html += '</ul>';
                        html += '</li>';
                    }
                }
            }
            $("#menuNav .top_nav").eq(1).html(html);
            $("#menuNav .totalNum").eq(1).html(moduleList2.ds.length);
            //moduleList4 SQL
            var moduleTypeList4 = data.moduleTypeList4;
            var moduleList4 = data.moduleList4;
            html = "";
            for (var i = 0; i < moduleTypeList4.ds.length; i++) {
                //根节点
                if (moduleTypeList4.ds[i]["ParentId"] == 0) {
                    var childHtml = "";
                    childHtml = programRole.selectlist4Init(moduleTypeList4, moduleList4, childHtml, moduleTypeList4.ds[i]["Id"]);
                    if (childHtml == "") {
                        //判断是否有子节点文件
                        var subFileHtml = "";
                        //插入文件的节点
                        for (var j = 0; j < moduleList4.ds.length; j++) {
                            if (moduleList4.ds[j].TypeId == moduleTypeList4.ds[i]["Id"]) {
                                subFileHtml += '<li><a href="javascript:;" onclick="mainTabAction.addTab(\'' + moduleList4.ds[j]["Name"] + '\', \'/SQLInterface/Index?Id=' + moduleList4.ds[j]["Id"] + '\')">' + moduleList4.ds[j].Name + '</a></li>';
                            }
                        }
                        if (subFileHtml != "") {
                            subFileHtml = '<ul class="sub-menu" style="display: block;">' + subFileHtml + '</ul>';
                        }
                        if (subFileHtml == "") {
                            html += '<li>' +
                               '<a href="javascript:;">' +
                                    moduleTypeList4.ds[i].Name +
                               '</a>';
                        }
                        else {
                            html += '<li class="has-sub">' +
                               '<a href="javascript:;">' +
                                    '<b class="caret pull-right"></b>' +
                                               moduleTypeList4.ds[i].Name +
                               '</a>';
                            html += subFileHtml;
                        }
                        html += '</li>';
                    }
                    else {
                        html += '<li class="has-sub">' +
                                '<a href="javascript:;">' +
                                    '<b class="caret pull-right"></b>' +
                                    moduleTypeList4.ds[i]["Name"] +
                                '</a>';
                        //中间插入所需要的节点
                        html += '<ul class="sub-menu" style="display: block;">';
                        //递归节点
                        //html = programRole.selectlist1Init(moduleTypeList1, moduleList1, html, moduleTypeList1.ds[i]["Id"]);
                        html += childHtml;
                        //插入文件的节点
                        for (var j = 0; j < moduleList4.ds.length; j++) {
                            if (moduleList4.ds[j].TypeId == moduleTypeList4.ds[i]["Id"]) {
                                //html += '<li><a href="javascript:;">' + moduleList2.ds[j].Name + '</a></li>';
                                html += '<li><a href="javascript:;" onclick="mainTabAction.addTab(\'' + moduleList4.ds[j]["Name"] + '\', \'/SQLInterface/Index?Id=' + moduleList4.ds[j]["Id"] + '\')">' + moduleList4.ds[j].Name + '</a></li>';
                            }
                        }
                        html += '</ul>';
                        html += '</li>';
                    }
                }
            }
            $("#menuNav .top_nav").eq(3).html(html);
            $("#menuNav .totalNum").eq(3).html(moduleList4.ds.length);
            //handsontable
            var moduleTypeList6 = data.moduleTypeList6;
            var moduleList6 = data.moduleList6;
            html = "";
            for (var i = 0; i < moduleTypeList6.ds.length; i++) {
                //根节点
                if (moduleTypeList6.ds[i]["ParentId"] == 0) {
                    var childHtml = "";
                    childHtml = programRole.selectlist6Init(moduleTypeList6, moduleList6, childHtml, moduleTypeList6.ds[i]["Id"]);
                    if (childHtml == "") {
                        //判断是否有子节点文件
                        var subFileHtml = "";
                        //插入文件的节点
                        for (var j = 0; j < moduleList6.ds.length; j++) {
                            if (moduleList6.ds[j].TypeId == moduleTypeList6.ds[i]["Id"]) {
                                subFileHtml += '<li><a href="javascript:;" onclick="mainTabAction.addTab(\'' + moduleList6.ds[j]["Name"] + '\', \'/HandsontablejsHtml/Index?Id=' + moduleList6.ds[j]["Id"] + '\')">' + moduleList6.ds[j].Name + '</a></li>';
                            }
                        }
                        if (subFileHtml != "") {
                            subFileHtml = '<ul class="sub-menu" style="display: block;">' + subFileHtml + '</ul>';
                        }
                        if (subFileHtml == "") {
                            html += '<li>' +
                               '<a href="javascript:;">' +
                                    moduleTypeList6.ds[i].Name +
                               '</a>';
                        }
                        else {
                            html += '<li class="has-sub">' +
                               '<a href="javascript:;">' +
                                    '<b class="caret pull-right"></b>' +
                                               moduleTypeList6.ds[i].Name +
                               '</a>';
                            html += subFileHtml;
                        }
                        html += '</li>';
                    }
                    else {
                        html += '<li class="has-sub">' +
                                '<a href="javascript:;">' +
                                    '<b class="caret pull-right"></b>' +
                                    moduleTypeList6.ds[i]["Name"] +
                                '</a>';
                        //中间插入所需要的节点
                        html += '<ul class="sub-menu" style="display: block;">';
                        //递归节点
                        //html = programRole.selectlist1Init(moduleTypeList1, moduleList1, html, moduleTypeList1.ds[i]["Id"]);
                        html += childHtml;
                        //插入文件的节点
                        for (var j = 0; j < moduleList6.ds.length; j++) {
                            if (moduleList6.ds[j].TypeId == moduleTypeList6.ds[i]["Id"]) {
                                //html += '<li><a href="javascript:;">' + moduleList2.ds[j].Name + '</a></li>';
                                html += '<li><a href="javascript:;" onclick="mainTabAction.addTab(\'' + moduleList6.ds[j]["Name"] + '\', \'/HandsontablejsHtml/Index?Id=' + moduleList6.ds[j]["Id"] + '\')">' + moduleList6.ds[j].Name + '</a></li>';
                            }
                        }
                        html += '</ul>';
                        html += '</li>';
                    }
                }
            }
            $("#menuNav .top_nav").eq(5).html(html);
            $("#menuNav .totalNum").eq(5).html(moduleList6.ds.length);




            handleSidebarMenu();
        }, "json");
    },
    //拖拽模块
    selectlist1Init: function (moduleTypeList1, moduleList1, html, parentId) {
        for (var i = 0; i < moduleTypeList1.ds.length; i++) {
            if (moduleTypeList1.ds[i].ParentId == parentId) {
                var childHtml = "";
                childHtml = programRole.selectlist1Init(moduleTypeList1, moduleList1, childHtml, moduleTypeList1.ds[i].Id);
                if(childHtml==""){
                    html += '<li>' +
                            '<a href="javascript:;">' +
                                            moduleTypeList1.ds[i].Name +
                    '</a>';
                    html += '</li>';
                }
                else{
                    html += '<li class="has-sub">' +
                            '<a href="javascript:;">' +
                                 '<b class="caret pull-right"></b>' +
                                            moduleTypeList1.ds[i].Name +
                    '</a>' +
                    '<ul class="sub-menu" style="display: block;">';
                    //递归节点  
                    html += childHtml;
                    //插入文件的节点
                    for (var j = 0; j < moduleList1.ds.length; j++) {
                        if (moduleList1.ds[j].TypeId == moduleTypeList1.ds[i]["Id"]) {
                            html += '<li><a href="javascript:;">' + moduleList1.ds[j].Name + '</a></li>';
                        }
                    }
                    html += '</ul>' +
                    '</li>';
                }
                
            }
        }
        return html;
    },
    //Angularjs
    selectlist2Init: function (moduleTypeList2, moduleList2, html, parentId) {
        for (var i = 0; i < moduleTypeList2.ds.length; i++) {
            if (moduleTypeList2.ds[i].ParentId == parentId) {
                var childHtml = "";
                childHtml = programRole.selectlist2Init(moduleTypeList2, moduleList2, childHtml, moduleTypeList2.ds[i].Id);
                if (childHtml == "") {
                   
                    //判断是否有子节点文件
                    var subFileHtml = "";
                    //插入文件的节点
                    for (var j = 0; j < moduleList2.ds.length; j++) {
                        if (moduleList2.ds[j].TypeId == moduleTypeList2.ds[i]["Id"]) {
                            //subFileHtml += '<li><a href="javascript:;">' + moduleList2.ds[j].Name + '</a></li>';
                            subFileHtml += '<li><a href="javascript:;" onclick="mainTabAction.addTab(\'' + moduleList2.ds[j]["Name"] + '\', \'/AngularjsHtml/Index?Id=' + moduleList2.ds[j]["Id"] + '\')">' + moduleList2.ds[j].Name + '</a></li>';
                        }
                    }
                    if (subFileHtml != "") {
                        subFileHtml = '<ul class="sub-menu" style="display: block;">' + subFileHtml + '</ul>';
                    }
                    if (subFileHtml == "") {
                        html += '<li>' +
                           '<a href="javascript:;">' +
                                moduleTypeList2.ds[i].Name +
                           '</a>';
                    }
                    else {
                        html += '<li class="has-sub">' +
                           '<a href="javascript:;">' +
                                '<b class="caret pull-right"></b>' +
                                           moduleTypeList2.ds[i].Name +
                           '</a>';
                        html += subFileHtml;
                    }
                    html += '</li>';
                }
                else {
                    html += '<li class="has-sub">' +
                            '<a href="javascript:;">' +
                                 '<b class="caret pull-right"></b>' +
                                            moduleTypeList2.ds[i].Name +
                    '</a>' +
                    '<ul class="sub-menu" style="display: block;">';
                    //递归节点  
                    html += childHtml;
                    //插入文件的节点
                    for (var j = 0; j < moduleList2.ds.length; j++) {
                        if (moduleList2.ds[j].TypeId == moduleTypeList2.ds[i]["Id"]) {
                            //html += '<li><a href="javascript:;">' + moduleList2.ds[j].Name + '</a></li>';
                            html += '<li><a href="javascript:;" onclick="mainTabAction.addTab(\'' + moduleList2.ds[j]["Name"] + '\', \'/AngularjsHtml/Index?Id=' + moduleList2.ds[j]["Id"] + '\')">' + moduleList2.ds[j].Name + '</a></li>';
                        }
                    }
                    html += '</ul>' +
                    '</li>';
                }
            }
        }


        return html;
    },
    //SQL
    selectlist4Init: function (moduleTypeList4, moduleList4, html, parentId) {
        for (var i = 0; i < moduleTypeList4.ds.length; i++) {
            if (moduleTypeList4.ds[i].ParentId == parentId) {
                var childHtml = "";
                childHtml = programRole.selectlist4Init(moduleTypeList4, moduleList4, childHtml, moduleTypeList4.ds[i].Id);
                if (childHtml == "") {
                   
                    //判断是否有子节点文件
                    var subFileHtml = "";
                    //插入文件的节点
                    for (var j = 0; j < moduleList4.ds.length; j++) {
                        if (moduleList4.ds[j].TypeId == moduleTypeList4.ds[i]["Id"]) {
                            //subFileHtml += '<li><a href="javascript:;">' + moduleList2.ds[j].Name + '</a></li>';
                            subFileHtml += '<li><a href="javascript:;" onclick="mainTabAction.addTab(\'' + moduleList4.ds[j]["Name"] + '\', \'/SQLInterface/Index?Id=' + moduleList4.ds[j]["Id"] + '\')">' + moduleList4.ds[j].Name + '</a></li>';
                        }
                    }
                    if (subFileHtml != "") {
                        subFileHtml = '<ul class="sub-menu" style="display: block;">' + subFileHtml + '</ul>';
                    }
                    if (subFileHtml == "") {
                        html += '<li>' +
                           '<a href="javascript:;">' +
                                moduleTypeList4.ds[i].Name +
                           '</a>';
                    }
                    else {
                        html += '<li class="has-sub">' +
                           '<a href="javascript:;">' +
                                '<b class="caret pull-right"></b>' +
                                           moduleTypeList4.ds[i].Name +
                           '</a>';
                        html += subFileHtml;
                    }
                    html += '</li>';
                }
                else {
                    html += '<li class="has-sub">' +
                            '<a href="javascript:;">' +
                                 '<b class="caret pull-right"></b>' +
                                            moduleTypeList4.ds[i].Name +
                    '</a>' +
                    '<ul class="sub-menu" style="display: block;">';
                    //递归节点  
                    html += childHtml;
                    //插入文件的节点
                    for (var j = 0; j < moduleList4.ds.length; j++) {
                        if (moduleList4.ds[j].TypeId == moduleTypeList4.ds[i]["Id"]) {
                            //html += '<li><a href="javascript:;">' + moduleList2.ds[j].Name + '</a></li>';
                            html += '<li><a href="javascript:;" onclick="mainTabAction.addTab(\'' + moduleList4.ds[j]["Name"] + '\', \'/SQLInterface/Index?Id=' + moduleList4.ds[j]["Id"] + '\')">' + moduleList4.ds[j].Name + '</a></li>';
                        }
                    }
                    html += '</ul>' +
                    '</li>';
                }
            }
        }


        return html;
    },
    //HandsoneTable
    selectlist6Init: function (moduleTypeList6, moduleList6, html, parentId) {
        for (var i = 0; i < moduleTypeList6.ds.length; i++) {
            if (moduleTypeList6.ds[i].ParentId == parentId) {
                var childHtml = "";
                childHtml = programRole.selectlist6Init(moduleTypeList6, moduleList6, childHtml, moduleTypeList6.ds[i].Id);
                if (childHtml == "") {

                    //判断是否有子节点文件
                    var subFileHtml = "";
                    //插入文件的节点
                    for (var j = 0; j < moduleList6.ds.length; j++) {
                        if (moduleList6.ds[j].TypeId == moduleTypeList6.ds[i]["Id"]) {
                            //subFileHtml += '<li><a href="javascript:;">' + moduleList2.ds[j].Name + '</a></li>';
                            subFileHtml += '<li><a href="javascript:;" onclick="mainTabAction.addTab(\'' + moduleList6.ds[j]["Name"] + '\', \'/HandsontablejsHtml/Index?Id=' + moduleList6.ds[j]["Id"] + '\')">' + moduleList6.ds[j].Name + '</a></li>';
                        }
                    }
                    if (subFileHtml != "") {
                        subFileHtml = '<ul class="sub-menu" style="display: block;">' + subFileHtml + '</ul>';
                    }
                    if (subFileHtml == "") {
                        html += '<li>' +
                           '<a href="javascript:;">' +
                                moduleTypeList6.ds[i].Name +
                           '</a>';
                    }
                    else {
                        html += '<li class="has-sub">' +
                           '<a href="javascript:;">' +
                                '<b class="caret pull-right"></b>' +
                                           moduleTypeList6.ds[i].Name +
                           '</a>';
                        html += subFileHtml;
                    }
                    html += '</li>';
                }
                else {
                    html += '<li class="has-sub">' +
                            '<a href="javascript:;">' +
                                 '<b class="caret pull-right"></b>' +
                                            moduleTypeList6.ds[i].Name +
                    '</a>' +
                    '<ul class="sub-menu" style="display: block;">';
                    //递归节点  
                    html += childHtml;
                    //插入文件的节点
                    for (var j = 0; j < moduleList6.ds.length; j++) {
                        if (moduleList6.ds[j].TypeId == moduleTypeList6.ds[i]["Id"]) {
                            //html += '<li><a href="javascript:;">' + moduleList2.ds[j].Name + '</a></li>';
                            html += '<li><a href="javascript:;" onclick="mainTabAction.addTab(\'' + moduleList6.ds[j]["Name"] + '\', \'/HandsontablejsHtml/Index?Id=' + moduleList6.ds[j]["Id"] + '\')">' + moduleList6.ds[j].Name + '</a></li>';
                        }
                    }
                    html += '</ul>' +
                    '</li>';
                }
            }
        }


        return html;
    }
}
//页面初始化
var pageInit = function () {
    //模块点击
    $(".widget_link").click(function () {
        var link = $(this).attr("link");
        var title = $(this).attr("title");
        var modelType = parseInt($(this).attr("modelType"));
        //mainTabAction.addTab(title, link);
        mainTabAction.addBasicModel(modelType);
    });
    //搜索模块
    $("#txtKeySearch").focus(function () {
        
    })
    .blur(function () {
        $("#search_result").hide();
    });
    $("#btnSearchKeyword").click(function () {
        var keyword = $("#txtKeySearch").val();
        $.post("/Program/SearchModule", {
            programId: localStorage.getItem("programId"),
            keyword:keyword
        }, function (data) {
            $("#search_result").html("");
            var html = "";
            if (data.data.searchResult2.ds.length > 0) {
                html += '<li class="dropdown-header">AngularJs模块</li>';
                for (var i = 0; i < data.data.searchResult2.ds.length; i++) {
                    html += '<li class="media">'+
                                '<a href="javascript:;" onclick="$(\'#search_result\').hide();  mainTabAction.addTab(\'' + data.data.searchResult2.ds[i].Name + '\', \'/AngularjsHtml/Index?Id=' + data.data.searchResult2.ds[i].Id + '\')"      >' +
                                    '<div class="media-body">'+
                                        '<h6 class="media-heading">' + data.data.searchResult2.ds[i].Name + '</h6>' +
                                    '</div>'+
                                '</a>'+
                            '</li>';
                }
            }
            if (data.data.searchResult4.ds.length > 0) {
                html += '<li class="dropdown-header">SQL模块</li>';
                for (var i = 0; i < data.data.searchResult4.ds.length; i++) {
                    html += '<li class="media">' +
                                '<a href="javascript:;" onclick="$(\'#search_result\').hide();mainTabAction.addTab(\'' + data.data.searchResult4.ds[i].Name + '\', \'/SQLInterface/Index?Id=' + data.data.searchResult4.ds[i].Id + '\')"  >' +
                                    '<div class="media-body">' +
                                        '<h6 class="media-heading">' + data.data.searchResult4.ds[i].Name + '</h6>' +
                                    '</div>' +
                                '</a>' +
                            '</li>';
                }
            }
            $("#search_result").html(html);
            $("#search_result").show();
        },"json");
    });
}


//项目模块类初始化
var fileAction = function () {
    $(".self-newprogram").click(function () {
        layer.open({
            type: 2,
            title: '我的项目',
            closeBtn: 1,
            anim: 5,
            shadeClose: false,
            area: ['750px', '500px'],
            content: ['/Home/Program', 'no']
        });
    });
    $(".self-promember").click(function () {
        if (programRole.selectionProgram()) {
            layer.open({
                type: 2,
                title: '开发成员',
                closeBtn: 1,
                anim: 5,
                shadeClose: false,
                area: ['750px', '500px'],
                content: ['/Program/Member?programId=' + localStorage.getItem("programId"), 'no']
            });
        }


    });
    $(".self-newmodule").click(function () {
        if (programRole.selectionProgram()) {
            layer.open({
                type: 2,
                title: '新建模块',
                closeBtn: 1,
                anim: 5,
                shadeClose: false,
                area: ['750px', '500px'],
                content: ['/Program/Module', 'no']
            });
        }
    });
}
//顶部页签模块
var mainTabAction = {
    tabsFrame: new Array(),
    addTab: function (title, url) {
        for (var i in mainTabAction.tabsFrame) {
            if (mainTabAction.tabsFrame[i].title == title && mainTabAction.tabsFrame[i].url == url) {
                $("#mainTabStrip li").removeClass("active");
                $("#mainTabStrip li").eq(i + 2).addClass("active");
                $("#content").hide();
                $("iframe").hide();
                $("#" + mainTabAction.hash(title + url)).show();
                return;
            }
        }
        mainTabAction.tabsFrame.push({
            title: title,
            url: url
        });
        $("#mainTabStrip li").removeClass("active");
        $("#mainTabStrip li").eq($("#mainTabStrip li").length - 2).after('<li class="active"><a href="#" data-toggle="tab" aria-expanded="true" link="' + url + '" stitle="' + title + '">' + title + '<i class="ion-close-round"></i></a></li>');
        $("#content").hide();
        $("iframe").hide();
        $("#page-container").append('<iframe src="' + url + '" id="' + mainTabAction.hash(title + url) + '" name="' + mainTabAction.hash(title + url) + '"></iframe>')
        $('[data-click="prev-tab"]').unbind("click");
        $('[data-click="next-tab"]').unbind("click");
        handleUnlimitedTabsRender();
        mainTabAction.resizeFrame();
        $("#mainTabStrip li").eq($("#mainTabStrip li").length - 2).click(function () {
            $("#content").hide();
            $("iframe").hide();
            $("#mainTabStrip li").removeClass("active");
            $("#mainTabStrip li").eq($("#mainTabStrip li").length - 2).addClass("active");
            var obj = $(this).find("a");
            $("#" + mainTabAction.hash(obj.attr("stitle") + obj.attr("link"))).show();
        });
        $("#mainTabStrip li .ion-close-round").click(function () {
            $(this).parent().parent().remove();
            var link = $(this).parent().attr("link");
            var title = $(this).parent().attr("stitle");
            $("#" + mainTabAction.hash(title + url)).remove();
            $("#mainTabStrip li").removeClass("active");
            //激活最后一个节点
            $("#mainTabStrip li").eq($("#mainTabStrip li").length - 2).addClass("active");
            if ($("#mainTabStrip li").length == 3) {
                $("iframe").hide();
                $("#content").show();
            }
            else {
                $("iframe").hide();
                $("#content").hide();
                var obj = $("#mainTabStrip li").eq($("#mainTabStrip li").length - 2).find("a");
                $("#" + mainTabAction.hash(obj.attr("stitle") + obj.attr("link"))).show();
            }
            for (var i in mainTabAction.tabsFrame) {
                if (mainTabAction.tabsFrame[i].title == title && mainTabAction.tabsFrame[i].url == url) {
                    mainTabAction.tabsFrame.splice(i, 1);
                    return;
                }
            }
        });
    },
    removeTab: function (obj) {
        $(obj).remove();
    },
    changeContent: function (url) {
        if (url == '') {
            $("#content").show();
            $("#iframe_content").hide();
        }
        else {
            $("#content").hide();
            $("#active_iframe").attr("src", url);
            $("#iframe_content").show();
        }
    },
    resizeFrame: function () {
        var width = $("body").width();
        var height = $("body").height();
        $("iframe").css("width", (width - 60) + "px").css("height", (height - 95) + "px");
    },
    showMainTable: function () {
        $("#content").show();
        $("iframe").hide();
    },
    hash: function (input) {
        var I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');
        var hash = 5381;
        var i = input.length - 1;

        if (typeof input == 'string') {
            for (; i > -1; i--)
                hash += (hash << 5) + input.charCodeAt(i);
        }
        else {
            for (; i > -1; i--)
                hash += (hash << 5) + input[i];
        }
        var value = hash & 0x7FFFFFFF;

        var retValue = '';
        do {
            retValue += I64BIT_TABLE[value & 0x3F];
        }
        while (value >>= 6);

        return retValue;
    },
    addBasicModel: function (modelType) {
        if (modelType == 1) {
            mainTabAction.addTab("test", "/BootStrapDrag/Design");
        }
        if (modelType == 2) {
            //优先先把属性改为当前模块
            $(".treedropdownlist").attr("moduleMode", "2");
            $(".treedropdownlist").val("");
            $("#moduleType").val("");
            $("#moduleBasicName").val("");
            $("#moduleStaticUrl").val("");
            $("#moduleStaticUrl").parent().parent().show();
            layer.open({
                type: 1,
                title: '新增Angularjs模块',
                closeBtn: 1,
                anim: 5,
                scrollbar: false,
                shadeClose: false,
                area: ['400px', 'auto'],
                content: $("#basicMoodel")
            });
            $(".btnBasicModel").unbind("click");
            $(".btnBasicModel").click(function () {
                mainTabAction.openBasicModel(modelType);
            });
        }
        if (modelType == 4) {
            //优先先把属性改为当前模块
            $(".treedropdownlist").attr("moduleMode", "4");
            $(".treedropdownlist").val("");
            $("#moduleType").val("");
            $("#moduleBasicName").val("");
            $("#moduleStaticUrl").val("");
            $("#moduleStaticUrl").parent().parent().hide();
            layer.open({
                type: 1,
                title: '新增SQL接口模块',
                closeBtn: 1,
                anim: 5,
                scrollbar: false,
                shadeClose: false,
                area: ['400px', 'auto'],
                content: $("#basicMoodel")
            });
            $(".btnBasicModel").unbind("click");
            $(".btnBasicModel").click(function () {
                mainTabAction.openBasicModel(modelType);
            });
        }
        if (modelType == 6) {
            //优先先把属性改为当前模块
            $(".treedropdownlist").attr("moduleMode", "6");
            $(".treedropdownlist").val("");
            $("#moduleType").val("");
            $("#moduleBasicName").val("");
            $("#moduleStaticUrl").val("");
            $("#moduleStaticUrl").parent().parent().hide();
            layer.open({
                type: 1,
                title: '新增报表模块',
                closeBtn: 1,
                anim: 5,
                scrollbar: false,
                shadeClose: false,
                area: ['400px', 'auto'],
                content: $("#basicMoodel")
            });
            $(".btnBasicModel").unbind("click");
            $(".btnBasicModel").click(function () {
                mainTabAction.openBasicModel(modelType);
            });
        }
    },
    openBasicModel: function (modelType) {
        if (modelType == 2) {
            $.post("/AngularjsHtml/SaveBasicModel", {
                programId: localStorage.getItem("programId"),
                name: $("#moduleBasicName").val(),
                typeId: $("#moduleType").val(),
                staticUrl: $("#moduleStaticUrl").val()
            }, function (data) {
                if (data.status == 200) {
                    programRole.initMenus();
                    var link = "/AngularjsHtml/Index?Id="+data.data;
                    mainTabAction.addTab($("#moduleBasicName").val(), link);
                    layer.closeAll();
                }
                else {
                    layer.alert(data.msg);
                }
            },"json");
        }
        if (modelType == 4) {
            $.post("/SQLInterface/SaveBasicModel", {
                programId: localStorage.getItem("programId"),
                name: $("#moduleBasicName").val(),
                typeId: $("#moduleType").val()
            }, function (data) {
                if (data.status == 200) {
                    programRole.initMenus();
                    var link = "/SQLInterface/Index?Id=" + data.data;
                    mainTabAction.addTab($("#moduleBasicName").val(), link);
                    layer.closeAll();
                }
                else {
                    layer.alert(data.msg);
                }
            }, "json");
        }
        if (modelType == 6) {
            $.post("/HandsontablejsHtml/SaveBasicModel", {
                programId: localStorage.getItem("programId"),
                name: $("#moduleBasicName").val(),
                typeId: $("#moduleType").val()
            }, function (data) {
                if (data.status == 200) {
                    programRole.initMenus();
                    var link = "/HandsontablejsHtml/Index?Id=" + data.data;
                    mainTabAction.addTab($("#moduleBasicName").val(), link);
                    layer.closeAll();
                }
                else {
                    layer.alert(data.msg);
                }
            }, "json");

        }
    }
}
//菜单事件
var menuAction = {
    init: function () {
        $(document).keydown(function (event) {
            if (event.ctrlKey && event.shiftKey && event.keyCode == 70) {
                $(".self-newprogram").click();
                event.preventDefault();
            }
        });
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
                        "typeId":moduleTypeList.ds[i].Id
                    }
                    root.children = moduleListAction.getChildrenNodes(moduleTypeList, moduleTypeList.ds[i].Id);
                    treeNodes.push(root);
                }
            }
            try {
                $('#moduleTypeList').jstree("destroy");
            }
            catch (e) { }
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
                                    if(data.status == 200){
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
                                },"json");
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
                }, function (data) {});
            });
            jt.bind("move_node.jstree", function (event, data) {
                //debugger;
            });
            jt.bind("activate_node.jstree", function (obj, e) {
                var currentNode = e.node;
                $(".treedropdownlist").val(currentNode.text);
                $("#moduleTypeList").hide();
                $("#moduleType").val(currentNode.original.typeId);
            });
        },"json");
    },
    getChildrenNodes: function (moduleTypeList,parentId) {
        var node = [];
        for (var i = 0; i < moduleTypeList.ds.length; i++) {
            if (moduleTypeList.ds[i].ParentId == parentId) {
                var n = {
                    "text": moduleTypeList.ds[i].Name,
                    "icon": "fa fa-file-o",
                    "typeId": moduleTypeList.ds[i].Id
                }
                n.children = moduleListAction.getChildrenNodes(moduleTypeList,moduleTypeList.ds[i].Id);
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
            ////把模块Mode放在属性中
            var model = $(this).attr("moduleMode");
            //if (model != undefined) {
            //    model = parseInt(model);
            //}
            //else {
            //    model = 1;
            //}
            //moduleListAction.init(model);
            //$("#moduleTypeList").toggle();
            moduleListAction.openModuleTypeConfig(model);
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
    openModuleTypeConfig: function (moduleType) {
        $.moduleTpyeIndex = layer.open({
            type: 2,
            title: '类型编辑',
            closeBtn: 1,
            anim: 5,
            shadeClose: false,
            area: ['750px', '500px'],
            content: ['/Home/ModuleType?moduleType='+moduleType, 'no']
        });
    },
    closeModuleTypeConfig: function (name,typeId) {
        $("#moduleName").val(name);
        $("#moduleType").val(typeId);
        layer.close($.moduleTpyeIndex);
    }
}
//退出登录
function LoginOut() {
    window.location = "/Home/Login";
}
//信息编辑
function EditInfo() {
    layer.open({
        type: 2,
        title: '编辑信息',
        closeBtn: 1,
        anim: 5,
        shadeClose: false,
        area: ['750px', '500px'],
        content: ['/Home/UserEdit', 'no']
    });
}
