//当前表格对象
var hot, ue;
//当前选中的行、列
var currentSelectRow = 0, currentSelectCol = 0;

$(document).ready(function () {
    loadHot('');
});
//加载表格对象
function loadHot(data) {
    var options = {};
    if (data != '' && data != null) {
        options = JSON.parse(data);
    }
    else {
        options = {
            "colWidths": [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            "rowHeights": [null, null, null, null, null, null, null, null, null, null],
            "data": [[null, null, null, null, "", "", "", "", "", "", "", null], [null, null, null, null, null, null, null, null, "", null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null], ["", null, null, null, null, null, null, null, null, null, null, null], ["", null, null, null, null, null, null, null, null, null, null, null], ["", null, null, null, null, null, null, null, null, null, null, null], ["", null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null]],
            "mergeCells": [],
            "cellMetaArray": [{ "className": "", "col": 0, "row": 0, "readOnly": false, "renderer": "html" }, { "className": "", "col": 0, "row": 1, "readOnly": false, "renderer": "html" }, { "className": "", "col": 0, "row": 2, "readOnly": false, "renderer": "html" }, { "className": "", "col": 0, "row": 3, "readOnly": false, "renderer": "html" }, { "className": "", "col": 0, "row": 4, "readOnly": false, "renderer": "html" }, { "className": "", "col": 0, "row": 5, "readOnly": false, "renderer": "html" }, { "className": "", "col": 0, "row": 6, "readOnly": false, "renderer": "html" }, { "className": "", "col": 0, "row": 7, "readOnly": false, "renderer": "html" }, { "className": "", "col": 0, "row": 8, "readOnly": false, "renderer": "html" }, { "className": "", "col": 0, "row": 9, "readOnly": false, "renderer": "html" }, { "className": "", "col": 1, "row": 0, "readOnly": false, "renderer": "html" }, { "className": "", "col": 1, "row": 1, "readOnly": false, "renderer": "html" }, { "className": "", "col": 1, "row": 2, "readOnly": false, "renderer": "html" }, { "className": "", "col": 1, "row": 3, "readOnly": false, "renderer": "html" }, { "className": "", "col": 1, "row": 4, "readOnly": false, "renderer": "html" }, { "className": "", "col": 1, "row": 5, "readOnly": false, "renderer": "html" }, { "className": "", "col": 1, "row": 6, "readOnly": false, "renderer": "html" }, { "className": "", "col": 1, "row": 7, "readOnly": false, "renderer": "html" }, { "className": "", "col": 1, "row": 8, "readOnly": false, "renderer": "html" }, { "className": "", "col": 1, "row": 9, "readOnly": false, "renderer": "html" }, { "className": "", "col": 2, "row": 0, "readOnly": false, "renderer": "html" }, { "className": "", "col": 2, "row": 1, "readOnly": false, "renderer": "html" }, { "className": "", "col": 2, "row": 2, "readOnly": false, "renderer": "html" }, { "className": "", "col": 2, "row": 3, "readOnly": false, "renderer": "html" }, { "className": "", "col": 2, "row": 4, "readOnly": false, "renderer": "html" }, { "className": "", "col": 2, "row": 5, "readOnly": false, "renderer": "html" }, { "className": "", "col": 2, "row": 6, "readOnly": false, "renderer": "html" }, { "className": "", "col": 2, "row": 7, "readOnly": false, "renderer": "html" }, { "className": "", "col": 2, "row": 8, "readOnly": false, "renderer": "html" }, { "className": "", "col": 2, "row": 9, "readOnly": false, "renderer": "html" }, { "className": "", "col": 3, "row": 0, "readOnly": false, "renderer": "html" }, { "className": "", "col": 3, "row": 1, "readOnly": false, "renderer": "html" }, { "className": "", "col": 3, "row": 2, "readOnly": false, "renderer": "html" }, { "className": "", "col": 3, "row": 3, "readOnly": false, "renderer": "html" }, { "className": "", "col": 3, "row": 4, "readOnly": false, "renderer": "html" }, { "className": "", "col": 3, "row": 5, "readOnly": false, "renderer": "html" }, { "className": "", "col": 3, "row": 6, "readOnly": false, "renderer": "html" }, { "className": "", "col": 3, "row": 7, "readOnly": false, "renderer": "html" }, { "className": "", "col": 3, "row": 8, "readOnly": false, "renderer": "html" }, { "className": "", "col": 3, "row": 9, "readOnly": false, "renderer": "html" }, { "className": "", "col": 4, "row": 0, "readOnly": false, "renderer": "html" }, { "className": "", "col": 4, "row": 1, "readOnly": false, "renderer": "html" }, { "className": "", "col": 4, "row": 2, "readOnly": false, "renderer": "html" }, { "className": "", "col": 4, "row": 3, "readOnly": false, "renderer": "html" }, { "className": "", "col": 4, "row": 4, "readOnly": false, "renderer": "html" }, { "className": "", "col": 4, "row": 5, "readOnly": false, "renderer": "html" }, { "className": "", "col": 4, "row": 6, "readOnly": false, "renderer": "html" }, { "className": "", "col": 4, "row": 7, "readOnly": false, "renderer": "html" }, { "className": "", "col": 4, "row": 8, "readOnly": false, "renderer": "html" }, { "className": "", "col": 4, "row": 9, "readOnly": false, "renderer": "html" }, { "className": "", "col": 5, "row": 0, "readOnly": false, "renderer": "html" }, { "className": "", "col": 5, "row": 1, "readOnly": false, "renderer": "html" }, { "className": "", "col": 5, "row": 2, "readOnly": false, "renderer": "html" }, { "className": "", "col": 5, "row": 3, "readOnly": false, "renderer": "html" }, { "className": "", "col": 5, "row": 4, "readOnly": false, "renderer": "html" }, { "className": "", "col": 5, "row": 5, "readOnly": false, "renderer": "html" }, { "className": "", "col": 5, "row": 6, "readOnly": false, "renderer": "html" }, { "className": "", "col": 5, "row": 7, "readOnly": false, "renderer": "html" }, { "className": "", "col": 5, "row": 8, "readOnly": false, "renderer": "html" }, { "className": "", "col": 5, "row": 9, "readOnly": false, "renderer": "html" }, { "className": "", "col": 6, "row": 0, "readOnly": false, "renderer": "html" }, { "className": "", "col": 6, "row": 1, "readOnly": false, "renderer": "html" }, { "className": "", "col": 6, "row": 2, "readOnly": false, "renderer": "html" }, { "className": "", "col": 6, "row": 3, "readOnly": false, "renderer": "html" }, { "className": "", "col": 6, "row": 4, "readOnly": false, "renderer": "html" }, { "className": "", "col": 6, "row": 5, "readOnly": false, "renderer": "html" }, { "className": "", "col": 6, "row": 6, "readOnly": false, "renderer": "html" }, { "className": "", "col": 6, "row": 7, "readOnly": false, "renderer": "html" }, { "className": "", "col": 6, "row": 8, "readOnly": false, "renderer": "html" }, { "className": "", "col": 6, "row": 9, "readOnly": false, "renderer": "html" }, { "className": "", "col": 7, "row": 0, "readOnly": false, "renderer": "html" }, { "className": "", "col": 7, "row": 1, "readOnly": false, "renderer": "html" }, { "className": "", "col": 7, "row": 2, "readOnly": false, "renderer": "html" }, { "className": "", "col": 7, "row": 3, "readOnly": false, "renderer": "html" }, { "className": "", "col": 7, "row": 4, "readOnly": false, "renderer": "html" }, { "className": "", "col": 7, "row": 5, "readOnly": false, "renderer": "html" }, { "className": "", "col": 7, "row": 6, "readOnly": false, "renderer": "html" }, { "className": "", "col": 7, "row": 7, "readOnly": false, "renderer": "html" }, { "className": "", "col": 7, "row": 8, "readOnly": false, "renderer": "html" }, { "className": "", "col": 7, "row": 9, "readOnly": false, "renderer": "html" }, { "className": "", "col": 8, "row": 0, "readOnly": false, "renderer": "html" }, { "className": "", "col": 8, "row": 1, "readOnly": false, "renderer": "html" }, { "className": "", "col": 8, "row": 2, "readOnly": false, "renderer": "html" }, { "className": "", "col": 8, "row": 3, "readOnly": false, "renderer": "html" }, { "className": "", "col": 8, "row": 4, "readOnly": false, "renderer": "html" }, { "className": "", "col": 8, "row": 5, "readOnly": false, "renderer": "html" }, { "className": "", "col": 8, "row": 6, "readOnly": false, "renderer": "html" }, { "className": "", "col": 8, "row": 7, "readOnly": false, "renderer": "html" }, { "className": "", "col": 8, "row": 8, "readOnly": false, "renderer": "html" }, { "className": "", "col": 8, "row": 9, "readOnly": false, "renderer": "html" }, { "className": "", "col": 9, "row": 0, "readOnly": false, "renderer": "html" }, { "className": "", "col": 9, "row": 1, "readOnly": false, "renderer": "html" }, { "className": "", "col": 9, "row": 2, "readOnly": false, "renderer": "html" }, { "className": "", "col": 9, "row": 3, "readOnly": false, "renderer": "html" }, { "className": "", "col": 9, "row": 4, "readOnly": false, "renderer": "html" }, { "className": "", "col": 9, "row": 5, "readOnly": false, "renderer": "html" }, { "className": "", "col": 9, "row": 6, "readOnly": false, "renderer": "html" }, { "className": "", "col": 9, "row": 7, "readOnly": false, "renderer": "html" }, { "className": "", "col": 9, "row": 8, "readOnly": false, "renderer": "html" }, { "className": "", "col": 9, "row": 9, "readOnly": false, "renderer": "html" }, { "className": "", "col": 10, "row": 0, "readOnly": false, "renderer": "html" }, { "className": "", "col": 10, "row": 1, "readOnly": false, "renderer": "html" }, { "className": "", "col": 10, "row": 2, "readOnly": false, "renderer": "html" }, { "className": "", "col": 10, "row": 3, "readOnly": false, "renderer": "html" }, { "className": "", "col": 10, "row": 4, "readOnly": false, "renderer": "html" }, { "className": "", "col": 10, "row": 5, "readOnly": false, "renderer": "html" }, { "className": "", "col": 10, "row": 6, "readOnly": false, "renderer": "html" }, { "className": "", "col": 10, "row": 7, "readOnly": false, "renderer": "html" }, { "className": "", "col": 10, "row": 8, "readOnly": false, "renderer": "html" }, { "className": "", "col": 10, "row": 9, "readOnly": false, "renderer": "html" }]
        }
    }
    //表格的配置参数
    var config = $.extend({
        colWidths: [100, 100, 100, 100, 100, 100, 100],
        rowHeights: [],
        data: [],
        mergeCells: [],
        cellMetaArray: []
    }, options);
    if (hot != undefined) {
        hot.destroy();
    }
    var container = document.getElementById('example1');
    hot = new Handsontable(container, {
        data: config.data,
        //行前面的序号，编辑时要，显示时不要(写死)
        rowHeaders: true,
        //minSpareRows: 1,//初始化行
        //是否显示列头部(写死)
        colHeaders: true,
        //colHeaders: ['编码', '名称', '性别', '出生日期', '年龄', '工资(元)', '个人主页', '员工'],

        //列排序(写死)
        //columnSorting: false, sortIndicator: false,
        //autoWrapCol: true, autoWrapRow: true,
        manualColumnResize: true, autoWrapRow: true,
        manualRowResize: true,//stretchH: 'all',
        //outsideClickDeselects: false,removeRowPlugin: true,
        //菜单(写死)
        contextMenu: true,
        //合并单元格(写死)
        mergeCells: config.mergeCells,
        //批注(写死)
        comments: false,
        //autoColumnSize:true,
        //列高度ajax获取
        colWidths: config.colWidths,
        //行高
        rowHeights: config.rowHeights,
        //每个单元格特殊配置(ajax)
        //cell: [{ row: 0, col: 4, renderer: 'html' }],
        cell: config.cellMetaArray,
        minSpareCols: 0,
        //列信息（ajax）
        //columns: [
        //  { data: 'number' }, { data: 'name' }, { data: 'sex', editor: 'checkbox' },
        //  { data: 'birthday', type: 'date', dateFormat: 'YYYY-MM-DD' }, { data: 'age', type: 'numeric', format: '0' },
        //  { data: 'money', type: 'numeric', format: '$ 0,0.00' }, { data: 'userpage', renderer: 'html' },

        //],
        //单元格值被改变后调用，ajax刷新数据用
        afterChange: function (changes, source) {
            if (changes != null) {
                for (var i = 0; i < changes.length; i++) {
                    var row = changes[i][0];
                    var col = changes[i][1];
                    hot.setCellMeta(row, col, "renderer", "html");
                }
            }
        },
        //设置单元格后被调用
        afterSetCellMeta: function (row, col, key, value) {
        },
        //添加列后被调用
        afterCreateCol: function (index, amount) {
            var currentRowCount = hot.countRows();;
            var currentColCount = hot.countCols();;
            for (var i = 0; i < currentRowCount; i++) {
                for (var j = 0; j < currentColCount; j++) {
                    hot.setCellMeta(i, j, "renderer", "html");
                }
            }
        },
        //创建了行高后调用
        afterCreateRow: function (index, amount) {
            var currentRowCount = hot.countVisibleRows();
            var currentColCount = hot.countVisibleCols();
            for (var i = 0; i < currentRowCount; i++) {
                for (var j = 0; j < currentColCount; j++) {
                    hot.setCellMeta(i, j, "renderer", "html");
                }
            }
            setTimeout(function () {
                $("#example1").width(($(".ht_master .htCore").width() + 20) + 'px');
                $("#example1").height(($(".ht_master .htCore").height() + 20) + 'px');
                $(".ht_master .wtHolder").height(($(".ht_master .htCore").height() + 20) + 'px');
                $(".ht_master .wtHolder").width(($(".ht_master .htCore").width() + 20) + 'px');
            }, 200);

        },
        afterRender: function () {
            $("td").each(function () {
                if ($(this).html() == "null") {
                    $(this).html("");
                }
            });
            setTimeout(function () {
                $("#example1").width(($(".ht_master .htCore").width() + 20) + 'px');
                $("#example1").height(($(".ht_master .htCore").height() + 20) + 'px');
                $(".ht_master .wtHolder").height(($(".ht_master .htCore").height() + 20) + 'px');
                $(".ht_master .wtHolder").width(($(".ht_master .htCore").width() + 20) + 'px');
            }, 200);
        },
        afterSelectionEnd: function (row1, col1, row2, col2) {
            var value = hot.getValue();
            if (value == null)
                hot.setDataAtCell(row1, col1, '');
            hot.setCellMeta(row1, col1, "renderer", "html");
            setTimeout(function () {
                currentSelectRow = row1;
                currentSelectCol = col1;
                parent.handsontablPageInit.showControlProperty($(value).attr("prop"));
            }, 200);


        }
    });
    $("td").each(function () {
        if ($(this).html() == "null") {
            $(this).html("");
        }
    });
}
//保存控件名称
function save() {
    //获取当前列表列数
    var currentColCount = hot.countCols();
    var colWidths = new Array();
    var rowHeights = new Array();
    for (var i = 0; i < currentColCount; i++) {
        colWidths.push(hot.getColWidth(i));
    }
    //获取当前行数
    var currentRowCount = hot.countRows();
    for (var i = 0; i < currentRowCount; i++) {
        rowHeights.push(hot.getRowHeight(i));
    }
    //获取CellMeta的数据
    var cellMetaArray = new Array();
    for (var i = 0; i < currentColCount; i++) {
        for (var j = 0; j < currentRowCount; j++) {
            //非物理列保存控件
            var controlValue = hot.getDataAtCell(j, i);
            try {
                if ($(controlValue).hasClass("editarea")) {
                    var prop = $(controlValue).attr("prop");
                    var base = new Base64();
                    var prop = JSON.parse(base.decode(prop));
                    if (prop.name == '') {
                        prop.name = "control_" + new Date().getTime().toString() + i.toString() + j.toString();
                        var html = '<div class="editarea"  prop="' + base.encode(JSON.stringify(prop)) + '">' + $(controlValue).html() + '</div>';
                        hot.setDataAtCell(j, i, html);
                    }
                }
                if ($(controlValue).hasClass("handsontable-input")) {
                    var prop = $(controlValue).attr("prop");
                    var base = new Base64();
                    var prop = JSON.parse(base.decode(prop));
                    if (prop.name == '') {
                        prop.name = "control_" + new Date().getTime().toString() + i.toString() + j.toString();
                        var html = '<input class="handsontable-input text unphysical" type="text" prop="' + base.encode(JSON.stringify(prop)) + '" />';
                        hot.setDataAtCell(j, i, html);
                    }
                }
            } catch (e) { }


            var setting = hot.getCellMeta(j, i);
            if (setting != undefined) {
                cellMetaArray.push({
                    className: (setting.className == undefined ? '' : setting.className),
                    col: setting.col,
                    row: setting.row,
                    readOnly: (setting.readOnly == undefined ? false : setting.readOnly),
                    renderer: 'html'
                });
            }
        }
    }
    //合并的单元格的数据
    var mergedCellArray = new Array();
    for (var i = 0; i < hot.mergeCells.mergedCellInfoCollection.length; i++) {
        if (hot.mergeCells.mergedCellInfoCollection[i].row <= currentRowCount && hot.mergeCells.mergedCellInfoCollection[i].col <= currentColCount) {
            mergedCellArray.push(hot.mergeCells.mergedCellInfoCollection[i]);
        }
    }


    //当前配置
    var options = {
        colWidths: colWidths,
        rowHeights: rowHeights,
        data: hot.getData(),
        //mergeCells: hot.mergeCells.mergedCellInfoCollection,
        mergeCells: mergedCellArray,
        cellMetaArray: cellMetaArray
    };
    return JSON.stringify(options);
}
//更改控件类型
function changeControlType(controlProperty) {
    var property = $.extend({
        type: '',
        datasource: '',
        changeDatasource: '',
        displayValue: '',
        hiddenValue: '',
        name: '',
        isRequired: "0",
        isReadOnly: "0",
        defaultValue: '',
        likeSearch: '0',
        matchNum: '',
        childListphysicalTableName: '',
        childListSql: '',
        childListRowSql: '',
        //样式属性
        controlCss: '',
        //图片属性
        picSrc: '',
        picAllowUpload: "0"

    }, controlProperty);
    var currentControl = "";
    if (property.type != '') {
        var base = new Base64();
        //更改控件类型
        if (property.type == '1') {
            currentControl = '<input class="handsontable-input text" type="text" prop="' + base.encode(JSON.stringify(property)) + '" />';
        }
        if (property.type == '2') {
            currentControl = '<input class="handsontable-datepicker datepicker" type="text"  prop="' + base.encode(JSON.stringify(property)) + '" />';
        }
        if (property.type == '4') {
            currentControl = '<div class="checkbox" prop="' + base.encode(JSON.stringify(property)) + '"><input class="handsontable-checkbox" type="checkbox"  /></div>';
        }
        if (property.type == '5') {
            currentControl = '<div class="radio" prop="' + base.encode(JSON.stringify(property)) + '"><input class="handsontable-radio" type="radio"  /></div>';
        }
        if (property.type == '7') {
            currentControl = '<select class="select2 handsontable-select2" prop="' + base.encode(JSON.stringify(property)) + '"></select>';
        }
        if (property.type == '9') {
            currentControl = '<textarea class="handsontable-textarea text" type="text" prop="' + base.encode(JSON.stringify(property)) + '" ></textarea>';
        }
        if (property.type == '10') {
            var uploadDom = "";
            if (property.picAllowUpload == "1") {
                uploadDom += "<button type='button' class='btn btn-info btn-file'>上传图片<input type='file' id='" + property.name + "_upload' name='" + property.name + "_upload' /></button>";
            }
            currentControl = '<div prop="' + base.encode(JSON.stringify(property)) + '"><img class="img" src="' + property.picSrc + '" style="' + property.controlCss + '"  prop="' + base.encode(JSON.stringify(property)) + '"  /><input type="hidden"  /></div>' + uploadDom;
        }
        if (property.type == '11') {
            currentControl = '<div prop="' + base.encode(JSON.stringify(property)) + '" ><a class="uploader" prop="' + base.encode(JSON.stringify(property)) + '"></a><input type="hidden"  /></div>' + "<button type='button' class='btn btn-info btn-file'>上传文件<input type='file' id='" + property.name + "_upload' name='" + property.name + "_upload' /></button>";
        }
        if (property.type == '12') {
            currentControl = '<iframe src="/HandsontablejsHtml/Design_List" style="height:100%;width:100%;border:none;height:100px" />  ';
        }
        if (property.type == '13') {
            currentControl = '<div class="editarea"  prop="' + base.encode(JSON.stringify(property)) + '"><p style="' + property.controlCss + '">' + property.defaultValue + '</p></div>';
        }
        if (property.type == '14') {
            currentControl = '<input class="handsontable-input text" type="hidden" prop="' + base.encode(JSON.stringify(property)) + '" />';
        }


        hot.setDataAtCell(currentSelectRow, currentSelectCol, currentControl);
    }
}
//初始化控件名称
function initGlobalName() {
    //获取当前列表列数
    var currentColCount = hot.countCols();
    //获取当前行数
    var currentRowCount = hot.countRows();

    var controlNameList = [];
    var colWidths = new Array();
    var rowHeights = new Array();
    for (var i = 0; i < currentColCount; i++) {
        colWidths.push(hot.getColWidth(i));
    }
    //获取当前行数
    var currentRowCount = hot.countRows();
    for (var i = 0; i < currentRowCount; i++) {
        rowHeights.push(hot.getRowHeight(i));
    }
    //获取CellMeta的数据
    execInitGlobalName(0, 0, currentRowCount, currentColCount, controlNameList);
}

function execInitGlobalName(j, i, currentRowCount, currentColCount, controlNameList) {
    setTimeout(function () {
        layer.msg("初始化完成" + Math.ceil((j * currentColCount+i+1)*100 / ((currentColCount + 1) * (currentRowCount + 1))) + "%", {
            time: 999999
        });
        //非物理列保存控件
        var controlValue = hot.getDataAtCell(j, i);
        try {
            if ($(controlValue).hasClass("editarea")) {
                var prop = $(controlValue).attr("prop");
                var base = new Base64();
                var prop = JSON.parse(base.decode(prop));
                if (prop.name == '') {
                    prop.name = "control_" + new Date().getTime().toString() + i.toString() + j.toString();
                    var html = '<div class="editarea"  prop="' + base.encode(JSON.stringify(prop)) + '">' + $(controlValue).html() + '</div>';
                    hot.setDataAtCell(j, i, html);
                }
                else {
                    for (var k = 0; k < controlNameList.length; k++) {
                        if (controlNameList[k] == prop.name) {
                            prop.name = "control_" + new Date().getTime().toString() + i.toString() + j.toString();
                            var html = '<div class="editarea"  prop="' + base.encode(JSON.stringify(prop)) + '">' + $(controlValue).html() + '</div>';
                            hot.setDataAtCell(j, i, html);
                        }
                    }
                }
                controlNameList.push(prop.name);
            }
            if ($(controlValue).hasClass("handsontable-input")) {
                var prop = $(controlValue).attr("prop");
                var base = new Base64();
                var prop = JSON.parse(base.decode(prop));
                if (prop.name == '') {
                    prop.name = "control_" + new Date().getTime().toString() + i.toString() + j.toString();
                    var html = '<input class="handsontable-input text unphysical" type="text" prop="' + base.encode(JSON.stringify(prop)) + '" />';
                    hot.setDataAtCell(j, i, html);
                }
                else {
                    for (var k = 0; k < controlNameList.length; k++) {
                        if (controlNameList[k] == prop.name) {
                            prop.name = "control_" + new Date().getTime().toString() + i.toString() + j.toString();
                            var html = '<input class="handsontable-input text unphysical" type="text" prop="' + base.encode(JSON.stringify(prop)) + '" />';
                            hot.setDataAtCell(j, i, html);
                        }
                    }
                }
                controlNameList.push(prop.name);
            }
        } catch (e) { }
        debugger;
        if (i >= currentColCount) {
            i = 0;
            j = j+1;
        }
        else {
            i= i+1;
        }
        if (j < currentRowCount) {
            execInitGlobalName(j, i, currentRowCount, currentColCount, controlNameList);
        }
        else {
            layer.msg('初始化控件完成');
        }
    }, 0);
}

