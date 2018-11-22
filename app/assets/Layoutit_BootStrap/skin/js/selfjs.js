$(function () {
    propertyControl.init();
    propertyControl.showEditDialog($(".editdialog"));
});
//属性控制
var propertyControl = {
    editor:null,
    init: function () {
        $(".property_btn button").click(function () {
            var that = $(this);
            $(".property_btn button").removeClass("active");
            that.addClass("active");
            var porperty = that.attr("for");
            $(".prop").hide();
            $("." + porperty).show();
        });
    },
    //显示脚本框
    showEditDialog:function(obj){
        $(obj).click(function () {
        });
        $(obj).focus(function () {
            $(this).blur();
        });
        $(obj).dblclick(function () {
            var title = $(this).attr("dialogtitle");
            var content = $(this).val();
            var dialogType = $(this).attr("dialogtype");
            layer.open({
                type: 1,
                title: title,
                closeBtn: 1,
                anim: 5,
                scrollbar: false,
                shade:0,
                shadeClose: true,
                area: ['750px', '500px'],
                content: $('#editor_area')
            });
            $("#editor_container").html("");
            propertyControl.editor = null;
            require.config({ paths: { 'vs': '/assets/monaco_editor/min/vs' } });
            require(['vs/editor/editor.main'], function () {
                propertyControl.editor = monaco.editor.create(document.getElementById('editor_container'), {
                    language: dialogType,
                    theme: "vs-dark"
                });
            });
        });
    }
}
//运行调试
function run() {
    //var container = $("#settingContainer").clone();
    //$("body").removeClass("edit");
    //$("body").addClass("devpreview sourcepreview");
    //removeMenuClasses();
    var e = "";
    $("#download-layout").children().html($(".demo").html());
    var t = $("#download-layout").children();
    t.find(".preview, .configuration, .drag, .remove, .isformedit").remove();
    t.find(".lyrow").addClass("removeClean");
    t.find(".box-element").addClass("removeClean");
    t.find(".lyrow .lyrow .lyrow .lyrow .lyrow .removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".lyrow .lyrow .lyrow .lyrow .removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".lyrow .lyrow .lyrow .removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".lyrow .lyrow .removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".lyrow .removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".removeClean").remove();
    $("#download-layout .column").removeClass("ui-sortable");
    $("#download-layout .row-fluid").removeClass("clearfix").children().removeClass("column");
    if ($("#download-layout .container").length > 0) {
        changeStructure("row-fluid", "row")
    }
    formatSrc = $.htmlClean($("#download-layout").html(), {
        format: true,
        allowedAttributes: [
            ["id"],
            ["class"],
            ["data-toggle"],
            ["data-target"],
            ["data-parent"],
            ["role"],
            ["data-dismiss"],
            ["aria-labelledby"],
            ["aria-hidden"],
            ["data-slide-to"],
            ["data-slide"]
        ]
    });
    $("#prevContainer").html(formatSrc);
    $("body").removeClass("edit");
    $("body").addClass("devpreview sourcepreview");
    layer.open({
        type: 1,
        title: '预览展示',
        closeBtn: 1,
        anim: 5,
        shadeClose: false,
        area: ['100%', '100%'],
        content: $("#prevLayerContainer"),
        end: function () {
            $("body").removeClass("devpreview sourcepreview");
            $("body").addClass("edit");
            $("#prevContainer").html("");
        }
    });
}