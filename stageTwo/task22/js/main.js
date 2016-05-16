/**
 * Created by Benjamin on 16/5/13.
 */

"use strict";

var output = document.getElementsByClassName("output")[0];

var divList = [];
var timer;
var milSeconds = 500;
var numOfLayers = 5;

function bindButtons() {
    var wrap = document.getElementsByClassName("buttons")[0];
    wrap.addEventListener("click", buttonOnClick, false);
}

function preOder(self) {
    var s = self;
    if (!s) {
        return;
    }
    divList.push(s);
    preOder(s.firstChild);
    preOder(s.lastChild);
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
            clearInterval(timer);
        } else {
            divList[i].style.backgroundColor = "blue";
        }
    }, milSeconds);
}
function initDisplay() {
    clearInterval(timer);
    divList.map((e)=> {
        e.style.backgroundColor = "white";
    });
    divList = [];
}
function preOderOnClick() {
    initDisplay();
    preOder(output.children[0]);
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

function displayTree(parent, layers) {
    var n = layers;
    var p = parent || output;
    var self = document.createElement("div");
    self.style.margin = "5px 3px";
    self.style.border = "solid thin";
    self.style.display = "inline-block";
    self.style.backgroundColor = "white";
    if (n > 1) {
        p.appendChild(self);
        displayTree(self, n - 1);
        displayTree(self, n - 1);
    } else {
        self.style.height = "16px";
        self.style.width = "9px";
        p.appendChild(self);
    }
}

(()=> {
    bindButtons();
    displayTree(null, numOfLayers);
})();

