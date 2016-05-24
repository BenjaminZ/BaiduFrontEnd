/**
 * Created by Benjamin on 27/04/2016.
 */

"use strict";

/**
 * Data of numbers.
 * @type {Array} array of index to numbers.
 */
var data = [];
var searchResult = [];
var defaultStr = "function clearHighLights() { searchResult.map((block)=> { block.style.backgroundColor = \"#ff0000\"; }); } function addHighLights() { searchResult.map((block)=> { block.style.backgroundColor = \"#7fff00\"; }) } function search_textButtonOnClick() { clearHighLights(); var searchStr = $(\"#search_text\").val().trim(); for (var i = 0; i < data.length; i++) { if (data[i].indexOf(searchStr) > -1) { searchResult.push($(\"#output\").children()[i]); } } addHighLights(); } $(()=> { inputButtonOnClick(); });";

function getInputs(input) {
    var pattern = new RegExp(/[0-9a-zA-Z\u4e00-\u9fa5]+/, "g");
    return input.match(pattern);
}
function putLeft(inputs) {
    for (var i = inputs.length - 1; i >= 0; i--) {
        data.unshift(inputs[i]);
    }
}

function putRight(inputs) {
    inputs.map((x)=>(data.push(x)));
}
/**
 * Push number into data.
 * @param target the event target.
 * @param inputs
 */
function pushStr(target, inputs) {
    if ($(target).hasClass("left")) {
        putLeft(inputs);
    } else if ($(target).hasClass("right")) {
        putRight(inputs);
    }
}

function popStr(target) {
    if (data.length === 0) {
        return NaN;
    }
    if ($(target).hasClass("left")) {
        return data.shift();
    } else {
        return data.pop();
    }
}
function updatePop(target, str) {
    alert(str);
    var output = $("#output");
    if ($(target).hasClass("left")) {
        output.find(":first-child").remove();
    } else {
        output.find(":last-child").remove();
    }
}
function getContentBlock(content) {
    var block = document.createElement("b");
    block.style.backgroundColor = "#ff0000";
    block.style.margin = "5px";
    block.style.padding = "5px";
    block.style.color = "white";
    block.textContent = content;
    block.style.display = "inline-block";
    return block;
}

function updateLeftPush(input, output) {
    var block = getContentBlock(input);
    output.prepend(block);
}
function updateRightPush(input, output) {
    var block = getContentBlock(input);
    output.append(block);
}
function updatePush(target, inputs) {
    var output = $("#output");
    if ($(target).hasClass("left")) {
        for (var i = inputs.length - 1; i >= 0; i--) {
            updateLeftPush(inputs[i], output);
        }
    } else {
        inputs.map((input)=> {
            updateRightPush(input, output);
        })
    }
}

function exampleButtonOnClick() {
    var inputs = getInputs(defaultStr);
    var output = $("#output");
    putRight(inputs);
    inputs.map((input)=>{
        updateRightPush(input, output);
    })
}
/**
 * Call other function based on which button is clicked.
 */
function inputButtonOnClick() {
    /**
     * Init function.
     */
    var inputs = $("#inputs");
    inputs.click((event) => {
        var target = event.target;
        // if click on buttons
        if (target.nodeName === "BUTTON") {
            // which operation
            if ($(target).hasClass("push")) {
                var inputArea = $("#input_text");
                var input = inputArea.val().trim();
                var inputs = getInputs(input);
                if (inputArea.val().length == 0) {
                    return;
                }
                pushStr(target, inputs);
                updatePush(target, inputs);
                inputArea.val("");
            } else if ($(target).hasClass("pop")) {
                var str = popStr(target);
                updatePop(target, str);
            } else if ($(target).hasClass("search_button")) {
                search_textButtonOnClick();
            } else if ($(target).hasClass("example_button")) {
                exampleButtonOnClick();
            } else if ($(target).hasClass("clear")) {
                $("#input_text").val("");
            }
        }
    });
}
function clearHighLights() {
    searchResult.map((block)=> {
        block.style.backgroundColor = "#ff0000";
    });
    searchResult = [];
}
function addHighLights() {
    searchResult.map((block)=> {
        block.style.backgroundColor = "#7fff00";
    })
}
function search_textButtonOnClick() {
    var searchBar = $("#search_text");
    clearHighLights();
    var searchStr = searchBar.val().trim();
    for (var i = 0; i < data.length; i++) {
        if (data[i].indexOf(searchStr) > -1) {
            searchResult.push($("#output").children()[i]);
        }
    }
    addHighLights();
}

$(()=> {
    inputButtonOnClick();
});
