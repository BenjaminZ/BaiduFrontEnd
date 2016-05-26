/**
 * Created by Benjamin on 16/5/24.
 */

"use strict";

var tagInput = document.getElementById("tagInput");
var hobbiesInput = document.getElementById("hobbiesInput");
var tagOutput = document.getElementById("tagOutput");
var hobbyOutput = document.getElementById("hobbyOutput");
var delInfo = "delete: ";
var sampleTagNames = ["HTML5", "CSS", "JavaScript"];
var sampleHobbyNames = ["Guitar", "LOL", "Programming", "Si-Fi"];
var tagNumLimit = 10;

(function init() {
    bindEvents();
    addSamples();
})();

/**
 * create a tag with content
 * @param content tag content
 */
function createTag(content) {
    var tag = document.createElement("div");
    tag.setAttribute("class", "tag");
    tag.innerText = content;
    return tag;
}
/**
 * add tag to output
 * @param input content of input text
 */
function addTag(input) {
    if (!input) {
        return;
    }
    var tag = createTag(input);
    tagOutput.appendChild(tag);
}

/**
 * character is blank, comma or enter
 * @param c last character of tag input text
 * @returns {boolean}
 */
function isEnd(c) {
    return c === " " || c === ",";
}

/**
 * detect input change
 */
function tagInputOninput() {
    // end with blank, comma or enter
    if (!isEnd(tagInput.value.slice(-1))) {
        return;
    }
    // get input content
    var tag = tagInput.value.slice(0, tagInput.value.length - 1);
    tagInput.value = "";
    addTag(tag);
    if (tagOutput.children.length > tagNumLimit) {
        removeTag(tagOutput.querySelector(".tag"));
    }
}

/**
 * remove tag from its parent node
 * @param tag to remove
 */
function removeTag(tag) {
    tag.parentNode.removeChild(tag);
}

/**
 * click on tag
 * @param event click event
 */
function tagOnClick(event) {
    removeTag(event.target);
}

/**
 * Split strings into Chinese/English sub strings
 * @param inputText string to split
 * @returns {Array|String} array of sub strings
 */
function getHobbies(inputText) {
    var reg = /[^\u4E00-\u9FA5\w]+/;
    return inputText.split(reg);
}
/**
 * create a hobby div
 * @param content a string to create with
 * @returns {Element} a hobby div
 */
function createHobby(content) {
    var hobby = document.createElement("div");
    hobby.setAttribute("class", "hobby");
    hobby.innerText = content;
    return hobby;
}

/**
 * add a hobby has input in it to output
 * @param input a string to add a hobby
 */
function addHobby(input) {
    if (!input) {
        return;
    }
    var hobby = createHobby(input);
    hobbyOutput.appendChild(hobby);
}
/**
 * remove a hobby from hobby output
 * @param hobby div to remove
 */
function removeHobby(hobby) {
    hobbyOutput.removeChild(hobby);
}
/**
 * add hobbies to output when confirm button click
 */
function confirmButtonOnclick() {
    // get hobbies from input without duplication
    var hobbies = new Set(getHobbies(hobbiesInput.value));
    hobbies.forEach((name)=> {
        addHobby(name);
        if (hobbyOutput.children.length > 10) {
            removeHobby(hobbyOutput.querySelector(".hobby"));
        }
    });
}

/**
 * change tag content when mouse move in
 * @param tag to change
 */
function markTag(tag) {
    tag.innerText = delInfo + tag.innerText;
}
/**
 * mouse enter tag
 * @param event of mouse enter
 */
function tagOnmouseover(event) {
    if (!event.target.classList.contains("tag")) {
        return;
    }
    var tag = event.target;
    markTag(tag);
}

/**
 * change tag content when mouse move out
 * @param tag to change
 */
function unmarkTag(tag) {
    tag.innerText = tag.innerText.slice(delInfo.length, tag.innerText.length);
}
/**
 * mouse leave tag
 * @param event of mouse leave
 */
function tagOnmouseout(event) {
    if (!event.target.classList.contains("tag")) {
        return;
    }
    var tag = event.target;
    unmarkTag(tag);
}

/**
 * add tag when enter key pressed
 * @param event enter key press event
 */
function tagOnEnterKeyPress(event) {
    // based on browser
    var key = event.which || event.keyCode;
    // 13 is the code for enter
    if (key === 13) {
        var tag = tagInput.value.slice(0, tagInput.value.length);
        tagInput.value = "";
        addTag(tag);
        if (tagOutput.children.length > tagNumLimit) {
            removeTag(tagOutput.querySelector(".tag"));
        }
    }
}
/**
 * bind events
 */
function bindEvents() {
    // tag input text change event
    tagInput.addEventListener("input", tagInputOninput);
    // handles enter key press
    tagInput.addEventListener("keypress", tagOnEnterKeyPress);
    // tag hover event
    tagOutput.addEventListener("mouseover", tagOnmouseover);
    tagOutput.addEventListener("mouseout", tagOnmouseout);
    // tag click event
    tagOutput.addEventListener("click", tagOnClick);

    // hobby events
    document.getElementById("hobbiesConfirmButton").addEventListener("click", confirmButtonOnclick);
}

/**
 * add sample tags
 */
function addSampleTags() {
    sampleTagNames.forEach((name)=> {
        addTag(name);
    })
}
function addSampleHobbies() {
    sampleHobbyNames.forEach((name)=> {
        addHobby(name);
    });
}
/**
 * add samples when start
 */
function addSamples() {
    // TODO
    addSampleTags();
    addSampleHobbies();
}