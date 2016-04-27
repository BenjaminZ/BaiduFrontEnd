/**
 * Created by Benjamin on 27/04/2016.
 */

"use strict";

/**
 * Data of numbers.
 * @type {Array} array of index to numbers.
 */
var data = new Array();

/**
 * Input text.
 * @param text
 * @returns {boolean} true if text is numbers. False otherwise.
 */
function isNum(text) {
    return /^\d+$/.test(text);
}

/**
 * Push number into data.
 * @param target the event target.
 */
function pushNum(target) {
    var num = $("#number").text();
    // if input is not number
    if (!isNum(num)) {
        return;
    }
    // add number to left or right
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
    var output = $("#output");
    if ($(target).hasClass("left")) {
        output.remove(":first-child");
    } else {
        output.remove(":last-child");
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
                pushNum(target);
                updatePush(target);
            } else {
                updatePop(target, popNum(target));
            }
        }
    });
}
$(()=> {
    buttonOnClick();
});
