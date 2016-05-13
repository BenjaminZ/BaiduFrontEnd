/**
 * Created by Benjamin on 16/5/13.
 */

"use strict";

var output = document.getElementsByClassName("output")[0];


function bindButtons() {
    var wrap = document.getElementsByClassName("buttons")[0];
    wrap.addEventListener("click", buttonOnClick, false);
}

function preOder() {
    alert("pre-oder");
}

function buttonOnClick(event) {
    var id = event.target.getAttribute("id");
    switch (id) {
        case "#pre-oder":
            preOder();
            break;
    }
}

function displayTree() {

}

(()=> {
    bindButtons();
    displayTree();
})();

