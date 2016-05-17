/**
 * Created by Benjamin on 16/5/13.
 */

"use strict";

var output = document.getElementsByClassName("output")[0];

var divList = [];
var timer;
var milSeconds = 500;
var isTarget = false;

function bindButtons() {
    var wrap = document.getElementsByClassName("inputs")[0];
    wrap.addEventListener("click", buttonOnClick, false);
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
function initDisplay() {
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
    initDisplay();
    preOder(output, getSearchContent());
    oderDisplay();
}
function buttonOnClick(event) {
    var id = event.target.getAttribute("id");
    switch (id) {
        case "#pre-oder":
            preOderOnClick();
            break;
    }
}

(()=> {
    bindButtons();
})();

