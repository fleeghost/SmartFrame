$(function () {
    pageInit.init();
});
var pageInit = {
    sqlEditor: null,
    init: function () {
        

        require.config({ paths: { 'vs': '/assets/monaco_editor/min/vs' } });
        require(['vs/editor/editor.main'], function () {
            pageInit.sqlEditor = monaco.editor.create(document.getElementById('sqlAnalysis'), {
                language: 'sql',
                theme: "vs-dark"
            });
        });
    }
}
//运行
function run() {
    layer.msg('查询中...请等待', {time: 9999999 });
    $.post("/SQLAnalysis/Run", {
        programId: localStorage.getItem("programId"),
        sql: pageInit.sqlEditor.getValue()
    }, function (data) {
        layer.closeAll();
        if (data.status == 500) {
            $("#sqlResult").html("");
            var html = "";
            html += "<table class='table table-hover'>";
            html += "<thead><tr><th>错误信息</th></tr></thead>";
            html += "<tbody><tr><td>" + data.msg + "</td></tr></tbody>";
            html += "</table>";
            $("#sqlResult").html(html);
        }
        else {
            $("#sqlResult").html("");
            var html = "";
            var index = 0;
            for (var key in data.data) {
                html += "<table class='table table-hover'>";
                html += "<thead><tr>";
                for (var i = 0; i < data.columns[index].split(',').length; i++) {
                    html += "<th>" + data.columns[index].split(',')[i] + "</th>";
                }
                html += "</tr></thead>";
                html += "<tbody>";
                for (var i = 0; i < data.data[key].length; i++) {
                    html += "<tr>";
                    for (var j = 0; j < data.columns[index].split(',').length; j++) {
                        html += "<td><a title='" + data.data[key][i][data.columns[index].split(',')[j]] + "'>" + data.data[key][i][data.columns[index].split(',')[j]] + "</a></td>";
                    }
                    html += "</tr>";
                }
                html += "</tbody>";
                html += "</table>";
                index++;
            }
            $("#sqlResult").html(html);
            //调整样式
            var w = $("table th").length * 100;
            if (w < $("#sqlResult").width()) {
                w = $("#sqlResult").width()
            }

            $("table").css("width", w+"px");
            $("table").css("height", $("#sqlResult").height()+'px');
            $("thead").css("width", $("table").width()+'px').css("table-layout", "fixed");
            $("tbody").css("height", $("#sqlResult").height()-50 + 'px').css("overflow-y", "auto").addClass("scrollbar");
        }
    },"json")
}