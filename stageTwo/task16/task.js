/**
 * Created by Benjamin on 13/04/2016.
 */

"use strict";

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = new Map();

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData(city, air) {
    
    if (city != null && city.length > 0 && isCorrect(city, air)) {
        aqiData.set(city, air);
        addElement(city, air);
    } else {
        alert("城市名或空气指数有误\n" +
            "城市名应为中文或英文字符\n" +
            "空气指数应为数字");
    }
}

/**
 * 判断城市名称是否合法
 * @param city 城市名称.
 */
function isCityCorrect(city) {
    var re = /^[\u4E00-\u9FA5a-zA-Z]+$/;
    return re.test(city);
}

/**
 * 判断数据是否合法
 * @param air 空气质量数据.
 */
function isAirCorrect(air) {
    var re = /^\d+$/;
    return re.test(air);
}
/**
 * 判断用户输入是否合法
 * @param city 城市名称.
 * @param air 空气指数.
 */
function isCorrect(city, air) {
    return isCityCorrect(city) && isAirCorrect(air);
}

/**
 * 渲染aqi-table表格
 */
function addElement(city, air) {
    var resultTable = $("#aqi-table");
    if (city != null && air != null) {
        var tr = resultTable.find("#" + city);
        var td = "<td>" + city + "</td>" + "<td>" + air
            + "</td>" + "<td><button>删除</button></td>";
        if (tr.length > 0) {
            tr.html("");
            tr.html(td);
        } else {
            resultTable.append("<tr id=" + city + ">" + td + "</tr>");
        }
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    var city = $("#aqi-city-input").val().trim();
    var air = $("#aqi-value-input").val().trim();
    addAqiData(city, air);
}

/**
 * 从Map中删除对应node数据
 * @param node 要删除的node
 */
function rmAqiData(node) {
    if (aqiData.has(node.parentNode.parentNode.id)) {
        aqiData.delete(node.parentNode.parentNode.id);
        rmElement(node.parentNode.parentNode);
    }
}

/**
 * 从表中删除条目
 * @param node 要删除的条目.
 */
function rmElement(node) {
    if (node != null) {
        node.parentNode.removeChild(node);
    }
}
/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(node) {
    // do sth.
    rmAqiData(node);
}

$(function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    $("#add-btn").click(function () {
        return addBtnHandle();
    });
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    $("#aqi-table").click(function (event) {
        if (event.target.nodeName === "BUTTON") {
            delBtnHandle(event.target);
        }
    })

});
