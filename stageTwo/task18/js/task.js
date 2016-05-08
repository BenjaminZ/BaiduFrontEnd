/**
 * Created by Benjamin on 27/04/2016.
 */

"use strict";

/**
 * Data of numbers.
 * @type {Array} array of index to numbers.
 */
var data = [];

/**
 * Input text.
 * @param text
 * @returns {boolean} true if text is numbers. False otherwise.
 */
function isValidNum(text) {
    return /^\d+$/.test(text);
}

/**
 * Push number into data.
 * @param target the event target.
 */
function pushNum(target) {
    var num = $("#number").val().trim();
    if ($(target).hasClass("left")) {
        data.unshift(num);
    } else {
        data.push(num);
    }
}

function popNum(target) {
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

function updatePush(target) {
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
                var num = $("#number").val().trim();
                if (!isValidNum(num)) {
                    return;
                }
                pushNum(target);
                updatePush(target);
                $("#number").val("");
            } else if ($(target).hasClass("pop")) {
                var num = popNum(target);
                updatePop(target, num);
            }
        }
    });
}
$(()=> {
    buttonOnClick();
});
