/**
 * Created by Benjamin on 16/5/13.
 */

"use strict";

var output = document.getElementsByClassName("output")[0];

var divList = [];
var timer;
var milSeconds = 500;
var isTarget = false;
var selectedList = [];

function unSelect() {
    selectedList.map((e)=> {
        e.style.backgroundColor = "white";
    });
    selectedList = [];
}
function select(target) {
    selectedList.push(target);
    target.style.backgroundColor = "green";
}
function outputOnClick(event) {
    stopSearching();
    unSelect();
    var target = event.target;
    if (target.nodeName === "SPAN") {
        target = target.parentElement;
    }
    select(target);
}
function bindOnClicks() {
    var inputs = document.getElementsByClassName("inputs")[0];
    inputs.addEventListener("click", buttonOnClick, false);
    output.addEventListener("click", outputOnClick, false);
}

function preOder(self, target) {
    var s = self;
    if (!s) {
        return;
    }
    divList.push(s);
    var children = self.children;
    for (var i in children) {
        if (isTarget) {
            break;
        } else if (children[i].nodeName === "SPAN" && children[i].innerText.toLowerCase() === target.toLowerCase()) {
            isTarget = true;
            selectedList.push(children[i].parentElement);
        } else if (children[i].nodeName === "DIV") {
            preOder(children[i], target);
        }
    }
}

function oderDisplay() {
    if (divList.length === 0) {
        return;
    }
    var i = 0;
    divList[i].style.backgroundColor = "blue";
    timer = setInterval(()=> {
        divList[i].style.backgroundColor = "white";
        i++;
        if (i >= divList.length) {
            if (isTarget) {
                divList[i - 1].style.backgroundColor = "green";
            }
            clearInterval(timer);
        } else {
            divList[i].style.backgroundColor = "blue";
        }
    }, milSeconds);
}
function stopSearching() {
    clearInterval(timer);
    isTarget = false;
    divList.map((e)=> {
        e.style.backgroundColor = "white";
    });
    divList = [];
}
function getSearchContent() {
    return document.getElementById("searchText").value.trim();
}
function preOderOnClick() {
    unSelect();
    preOder(output, getSearchContent());
    oderDisplay();
}
function deleteOnClick() {
    var selected = selectedList.pop();
    if (!selected) {
        return;
    }
    selected.parentElement.removeChild(selected);
}
function getNewElement() {
    var input = document.getElementById("addText").value.trim();
    var element = document.createElement("div");
    var content = document.createElement("span");
    content.innerText = input;
    element.appendChild(content);
    return element;
}
function addOnClick() {
    var newElement = getNewElement();
    if (!newElement) {
        return;
    }
    var selected = selectedList[selectedList.length - 1];
    if (!selected) {
        return;
    }
    selected.appendChild(newElement);
    unSelect();
    select(newElement);
}
function buttonOnClick(event) {
    stopSearching();
    var id = event.target.getAttribute("id");
    switch (id) {
        case "pre-oder":
            preOderOnClick();
            break;
        case "delete":
            deleteOnClick();
            break;
        case "add":
            addOnClick();
            break;
    }
}

(()=> {
    bindOnClicks();
})();

