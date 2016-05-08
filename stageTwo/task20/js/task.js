/**
 * Created by Benjamin on 27/04/2016.
 */

"use strict";

/**
 * Data of numbers.
 * @type {Array} array of index to numbers.
 */
var data = [];

function getInputs(input) {
    var pattern = new RegExp(/[0-9a-zA-Z\u4e00-\u9fa5]+/, "g");
    var inputs = input.match(pattern);
    return inputs;
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
function updatePop(target, num) {
    if (isNaN(num)) {
        return;
    }
    alert(num);
    var output = $("#output");
    if ($(target).hasClass("left")) {
        output.find(":first-child").remove();
    } else {
        output.find(":last-child").remove();
    }
}
function getNumBlock(num) {
    var block = document.createElement("b");
    block.style.backgroundColor = "#ff0000";
    block.style.marginLeft = "5px";
    block.style.padding = "5px";
    block.style.color = "white";
    block.textContent = num;
    return block;
}

function updatePush(target, inputs) {
    // TODO update function
    var num = $("#number").val().trim();
    var block = getNumBlock(num);
    var output = $("#output");
    if ($(target).hasClass("left")) {
        output.prepend(block);
    } else {
        output.append(block);
    }
}

/**
 * Call other function based on which button is clicked.
 */
function buttonOnClick() {
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
                // TODO
                updatePush(target, inputs);
                inputArea.val("");
            } else if ($(target).hasClass("pop")) {
                var str = popStr(target);
                updatePop(target, str);
            }
        }
    });
}
$(()=> {
    buttonOnClick();
});
