/**
 * Created by Benjamin on 16/5/22.
 */

"use strict";

var output = document.getElementById("output");
var input = document.getElementById("input");
var root;
var defaultInitialGap = 10;
var defaultPlusFolderGap = "10px";
var defaultIconNameGap = "5px";
var gapStep;
var selectedItem;

function getNumOfLayers(parent) {
    var count = 0;
    return numOfLayers(parent, count) - 1;
}
function numOfLayers(parent, count) {
    count++;
    if (parent.getAttribute("id") !== "output") {
        count = numOfLayers(parent.parentNode, count);
    }
    return count;
}
function getGap(parent) {
    if (!parent) {
        return;
    } else if (parent.getAttribute("id") === "output") {
        return defaultInitialGap.toString() + "px";
    }
    var numOfLayers = getNumOfLayers(parent);
    return (numOfLayers * gapStep + defaultInitialGap).toString() + "px";
}

function bindEvents() {
    input.addEventListener("click", buttonOnClick, false);
    output.addEventListener("click", selectOnClick, false);
}

function isItem(node) {
    if (!node) {
        return;
    }
    return node.classList.contains("folder") || node.classList.contains("file");
}
function newMinusIcon(parent) {
    var minusIcon = document.createElement("span");
    minusIcon.setAttribute("class", "glyphicon glyphicon-minus");
    minusIcon.style.marginLeft = getGap(parent);
    return minusIcon;
}
function openFolder(node) {
    if (!node) {
        return;
    }
    // console.log("open " + node.lastChild.innerText);
    var children = node.children;
    for (var i in children) {
        if (children.hasOwnProperty(i) && isItem(children[i])) {
            children[i].style.display = "block";
        }
    }
    plusToMinus(node);
}
function deselect() {
    if (!selectedItem) {
        return;
    }
    selectedItem.style.backgroundColor = "white";
    selectedItem.style.color = "black";
    selectedItem = null;
}
function plusToMinus(node) {
    if (!node) {
        return
    }
    var head = node.firstChild;
    head.removeChild(head.firstChild);
    head.insertBefore(newMinusIcon(node.parentNode), head.firstChild);
}
function minusToPlus(node) {
    if (!node) {
        return
    }
    var head = node.firstChild;
    head.removeChild(head.firstChild);
    head.insertBefore(newPlusIcon(node.parentNode), head.firstChild);
}
function closeFolder(node) {
    if (!node) {
        return;
    }
    // console.log("close " + node.lastChild.innerText);
    var children = node.children;
    for (var i in children) {
        if (children.hasOwnProperty(i)) {
            if (children[i].classList.contains("folder")) {
                closeFolder(children[i]);
                minusToPlus(children[i]);
                children[i].style.display = "none";
            } else if (children[i].classList.contains("file")) {
                children[i].style.display = "none";
            }
        }
    }
    minusToPlus(node);
}
function selectOnClick(event) {
    if (event.target.getAttribute("id") === "output") {
        return;
    }
    var classList = event.target.classList;
    if (classList.contains("glyphicon-plus")) {
        openFolder(event.target.parentNode.parentNode);
    } else if (classList.contains("glyphicon-minus")) {
        closeFolder(event.target.parentNode.parentNode);
    } else {
        deselect();
        if (classList.contains("head")) {
            select(event.target);
        } else {
            select(event.target.parentNode);
        }
    }
}

function select(head) {
    // console.log("select " + node.lastChild.innerText);
    selectedItem = head;
    head.style.backgroundColor = "blue";
    head.style.color = "white";
}

function newFileIcon(parent) {
    var fileIcon = document.createElement("span");
    fileIcon.setAttribute("class", "glyphicon glyphicon-file");
    fileIcon.style.marginLeft = getGap(parent);
    return fileIcon;
}
function newFileHead(name, parent) {
    var head = document.createElement("div");
    head.setAttribute("class", "head");
    head.appendChild(newFileIcon(parent));
    head.appendChild(newItemName(name));
    return head;
}
function createFile(name, parent) {
    if (!name || !parent) {
        return;
    }
    var file = document.createElement("div");
    file.setAttribute("class", "file");
    file.appendChild(newFileHead(name, parent));
    file.style.backgroundColor = "white";
    return file;
}
function addFile(name, parent) {
    openFolder(parent);
    var newFile = createFile(name, parent);
    parent.appendChild(newFile);
    deselect();
    select(newFile.firstChild);
    return newFile;
}
function addFileButtonOnClick() {
    // console.log("add file");
    var name=document.getElementById("inputText").value;
    if (!selectedItem || !name || !selectedItem.parentNode.classList.contains("folder")) {
        return;
    }
    var target = selectedItem.parentNode;
    addFile(name, target);
}
function searchItem(name, self) {
    if (self.querySelector(".name").innerText===name) {
        select(self.firstChild);
        return;
    }
    var children=self.children;
    for (var i in children) {
        if (children.hasOwnProperty(i) && isItem(children[i])) {
            searchItem(name, children[i]);
        }
        if (selectedItem) {
            break;
        }
    }
}
function searchButtonOnClick() {
    // TODO
    // console.log("search");
    var name = document.getElementById("inputText").value;
    if (!name) {
        return;
    }
    var target = selectedItem || root.firstChild;
    deselect();
    searchItem(name, target.parentNode);
}
function deleteItem(item) {
    if (!item || item.parentNode.getAttribute("id") === "output") {
        return;
    }
    item.parentNode.removeChild(item);
}
function deleteButtonOnClick() {
    // console.log("delete");
    if (!selectedItem) {
        return;
    }
    deleteItem(selectedItem.parentNode);
    deselect();
}
function addFolder(name, parent) {
    openFolder(parent);
    var newFolder = createFolder(name, parent);
    parent.appendChild(newFolder);
    deselect();
    select(newFolder.firstChild);
    return newFolder;
}
function addFolderButtonOnClick() {
    // console.log("add folder");
    var name = document.getElementById("inputText").value;
    if (!selectedItem || !name || !selectedItem.parentNode.classList.contains("folder")) {
        return;
    }
    var target = selectedItem.parentNode;
    addFolder(name, target);
}
function buttonOnClick(event) {
    if (!event.target) {
        return;
    }
    var id = event.target.getAttribute("id");
    switch (id) {
        case "addFileButton":
            addFileButtonOnClick();
            break;
        case "addFolderButton":
            addFolderButtonOnClick();
            break;
        case "searchButton":
            searchButtonOnClick();
            break;
        case "deleteButton":
            deleteButtonOnClick();
            break;
    }
}

function newPlusIcon(parent) {
    var plusIcon = document.createElement("span");
    plusIcon.setAttribute("class", "glyphicon glyphicon-plus");
    plusIcon.style.marginLeft = getGap(parent);
    return plusIcon;
}
function newFolderIcon() {
    var folderIcon = document.createElement("span");
    folderIcon.setAttribute("class", "glyphicon glyphicon-folder-close");
    folderIcon.style.marginLeft = defaultPlusFolderGap;
    return folderIcon;
}
function newItemName(name) {
    if (!name) {
        return;
    }
    var folderName = document.createElement("span");
    folderName.setAttribute("class", "name");
    folderName.innerText = name;
    folderName.style.marginLeft = defaultIconNameGap;
    folderName.style.marginRight = defaultInitialGap.toString() + "px";
    return folderName;
}
function newFolderHead(name, parent) {
    var head = document.createElement("div");
    head.setAttribute("class", "head");
    head.appendChild(newPlusIcon(parent));
    head.appendChild(newFolderIcon());
    head.appendChild(newItemName(name));
    return head;
}
function createFolder(name, parent) {
    if (!name || !parent) {
        return;
    }
    var folder = document.createElement("div");
    folder.setAttribute("class", "folder");
    folder.appendChild(newFolderHead(name, parent));
    folder.style.backgroundColor = "white";
    return folder;
}

function addRoot() {
    root = createFolder("root", output);
    output.appendChild(root);
    setGapStep();
}
function displayExamples() {
    var auFood = addFolder("australia_food", root);
    var auGood = addFolder("good", auFood);
    var chocolate = addFile("chocolate", auGood);
    var auBad = addFolder("bad", auFood);
    var plumbPudding = addFile("plumb_pudding", auBad);
    var dimSim = addFile("dim_sim", auFood);
    var tasty = addFolder("tasty", auGood);
    var chocCake = addFile("chocolate_cake", tasty);
    var cnFood = addFolder("chinese_food", root);
    var cnGood = addFolder("good", cnFood);
    var allGood = addFile("all_good", cnGood);
    var cnBad = addFolder("bad", cnFood);
    deselect();
}
function setGapStep() {
    var head = document.getElementById("output").firstChild.firstChild;
    gapStep = head.firstChild.offsetLeft + head.firstChild.offsetWidth;
}
(function init() {
    bindEvents();
    addRoot();
    displayExamples();

    // test code
    // var root = output.firstChild;
    // var good = createFolder("good", root);
    // root.appendChild(good);
    // var bad = createFolder("bad", root);
    // root.appendChild(bad);
    // var chocolate = createFolder("chocolate", good);
    // good.appendChild(chocolate);
    // good.style.display = "none";
    // bad.style.display = "none";
    // chocolate.style.display = "none";
})();
