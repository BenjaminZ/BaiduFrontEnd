/**
 * Created by Benjamin on 14/04/2016.
 */

"use strict";
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
};

function getChartData() {
    return chartData[pageState.nowSelectCity][pageState.nowGraTime];
}
function getBlockHeight(current, max) {
    return (current * 100 / max).toString() + "%";
}
function getBlockBackgroundColor() {
    return "#" + (Math.round(Math.random() * 0xffffff)).toString(16);
}
/**
 * 渲染图表
 */
function renderChart() {
    var container = $(".aqi-chart-wrap");
    container.html("");
    var dataObj = getChartData();
    //get the max value
    var dataArray = Object.keys(dataObj).map(function (key) {
        return dataObj[key];
    });
    var max = dataArray.sort(function (e1, e2) {
        return parseInt(e2) - parseInt(e1);
    })[0];
    // console.log();
    //
    for (var key in dataObj) {
        if (!dataObj.hasOwnProperty(key)) {
            return;
        }
        var block = document.createElement("b");
        block.style.flex = "1";
        block.style.height = getBlockHeight(dataObj[key], max);
        block.style.maxWidth = "200px";
        block.style.backgroundColor = getBlockBackgroundColor();
        block.setAttribute("title", key);
        container.append(block);
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(node) {
    // 确定是否选项发生了变化 
    if (node.getAttribute("value") != pageState.nowGraTime) {
        // 设置对应数据
        pageState.nowGraTime = node.getAttribute("value");
        // 调用图表渲染函数
        renderChart();
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(jNode) {
    // 确定是否选项发生了变化
    if (jNode.find(":selected").text() != pageState.nowSelectCity) {
        // 设置对应数据
        pageState.nowSelectCity = jNode.find(":selected").text();
        // 调用图表渲染函数
        renderChart();
    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radio = $("#form-gra-time");
    radio.click(function (event) {
        if (event.target.nodeName === "INPUT") {
            graTimeChange(event.target);
        }
    })
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var select = $("#city-select");
    for (var e in aqiSourceData) {
        if (aqiSourceData.hasOwnProperty(e)) {
            var newOption = document.createElement("option");
            newOption.appendChild(document.createTextNode(e));
            select.append(newOption);
        }
    }
    pageState.nowSelectCity = select.find(":first-child")[0].text;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    select.change(function () {
        citySelectChange(select);
    });
}

function setDayData(data, cityName) {
    data["day"] = aqiSourceData[cityName];
}
function setWeekData(data, cityName) {
    var weekData = {};
    var rawData = aqiSourceData[cityName];
    var sum = 0;
    var i = 0;
    var oldD = "";
    var oldData = 0;
    var length = Object.keys(rawData).length;
    for (var d in rawData) {
        sum += rawData[d];
        i++;
        if (i % 7 === 1 && oldD != null && oldData != 0) {
            weekData[oldD] = Math.round(oldData / 7);
            sum = 0
        } else if (i === length) {
            weekData[d] = Math.round(sum / 7);
        }
        oldD = d;
        oldData = sum;
    }
    data["week"] = weekData;
}
function setMonthData(data, cityName) {
    var monthData = {};
    var rawData = aqiSourceData[cityName];
    var length = Object.keys(rawData).length;
    var sum = 0;
    var date = [];
    var oldD = "";
    var oldData = 0;
    var i = 0;
    var dayCounter = 0;
    for (var d in rawData) {
        if (!rawData.hasOwnProperty(d)) {
            break;
        }
        sum += rawData[d];
        i++;
        dayCounter++;
        date = d.split("-");
        if (date[2] === "01" && oldD != null && oldData != 0) {
            monthData[oldD] = Math.round(oldData / dayCounter);
            sum = 0;
            dayCounter = 0;
        } else if (i === length) {
            monthData[d] = Math.round(sum / dayCounter);
        }
        oldD = d;
        oldData = sum;
    }
    data["month"] = monthData;
}
function setData(cityName, data) {
    setDayData(data, cityName);
    setWeekData(data, cityName);
    setMonthData(data, cityName);
}
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    for (var e in aqiSourceData) {
        // 将原始的源数据处理成图表需要的数据格式
        var data = {};
        setData(e, data);
        // 处理好的数据存到 chartData 中
        chartData[e] = data;
    }
}

function showAqiData() {
    console.log(Object.keys(aqiSourceData[0]).length);
}
function showChartData() {
    console.log(chartData);
}
/**
 * 初始化函数
 */
$(function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    // showAqiData();
    // showChartData();
});
