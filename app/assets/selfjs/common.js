$(function () {
    menuAction.init();
});
//菜单事件
var menuAction = {
    init: function () {
        $(document).keydown(function (event) {
            
            if (event.ctrlKey && event.keyCode == 83) {
                top.eventAction.save();
                return false;
            }
            if (event.ctrlKey && event.keyCode == 75) {
                top.eventAction.openSQLAnalysis();
                return false;
            }
            if (event.ctrlKey && event.keyCode == 116) {
                top.eventAction.refresh();
                return false;
            }
            if (event.shiftKey && event.keyCode == 83) {
                top.eventAction.updateAcutal();
                return false;
            }
            if (event.keyCode == 116) {
                top.eventAction.run();
                return false;
            }
        });
    }
}


var eventAction = {
    //保存
    save: function () {
        var nowDate = new Date().getTime();
        if (top.$.actionTime != undefined && (nowDate - top.$.actionTime) < 100) {
            //小于100毫秒的都过滤
            return;
        }
        var activeTab = $("#mainTabStrip .active").find("a");
        if (activeTab != undefined) {
            var link = activeTab.attr("link");
            var stitle = activeTab.attr("stitle");
            if (link != undefined && link != "" && stitle != undefined && stitle != "") {
                var name = mainTabAction.hash(stitle + link);
                if (window.frames[name] != undefined && window.frames[name].window.savedata!=undefined) {
                    window.frames[name].window.savedata();
                }
            }
        }
        top.$.actionTime = nowDate;
    },
    //打开SQL查询分析器
    openSQLAnalysis: function () {
        mainTabAction.addTab('SQL调试器', '/SQLAnalysis/Index');
    },
    //运行F5
    run: function () {
        var nowDate = new Date().getTime();
        if (top.$.runTime != undefined && (nowDate - top.$.runTime) < 100) {
            //小于100毫秒的都过滤
            return;
        }
        var activeTab = $("#mainTabStrip .active").find("a");
        debugger;
        if (activeTab != undefined) {
            var link = activeTab.attr("link");
            var stitle = activeTab.attr("stitle");
            if (link != undefined && link != "" && stitle != undefined && stitle != "") {
                var name = mainTabAction.hash(stitle + link);
                if (window.frames[name] != undefined && window.frames[name].window.run != undefined) {
                    window.frames[name].window.run();
                }
            }
        }
        top.$.runTime = nowDate;
    },
    //打开数据库连接
    openSQLConnection: function () {
        layer.open({
            type: 2,
            title: 'SQL连接配置',
            closeBtn: 1,
            anim: 5,
            shadeClose: false,
            area: ['750px', '500px'],
            content: ['/Connection/SQLConfig', 'no']
        });
    },
    //刷新模块
    refresh: function () {
        var nowDate = new Date().getTime();
        if (top.$.actionTime != undefined && (nowDate - top.$.actionTime) < 100) {
            //小于100毫秒的都过滤
            return;
        }
        var activeTab = $("#mainTabStrip .active").find("a");
        if (activeTab != undefined) {
            var link = activeTab.attr("link");
            var stitle = activeTab.attr("stitle");
            if (link != undefined && link != "" && stitle != undefined && stitle != "") {
                var name = mainTabAction.hash(stitle + link);
                if (window.frames[name] != undefined) {
                    window.frames[name].window.location.reload();
                }
            }
        }
        top.$.actionTime = nowDate;
    },
    //更新至生产环境
    updateAcutal:function(){
        var nowDate = new Date().getTime();
        if (top.$.actionTime != undefined && (nowDate - top.$.actionTime) < 100) {
            //小于100毫秒的都过滤
            return;
        }
        var activeTab = $("#mainTabStrip .active").find("a");
        if (activeTab != undefined) {
            var link = activeTab.attr("link");
            var stitle = activeTab.attr("stitle");
            if (link != undefined && link != "" && stitle != undefined && stitle != "") {
                var name = mainTabAction.hash(stitle + link);
                if (window.frames[name] != undefined && window.frames[name].window.updateAcutal != undefined) {
                    window.frames[name].window.updateAcutal();
                }
            }
        }
        top.$.actionTime = nowDate;
    }
}