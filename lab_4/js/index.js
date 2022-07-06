const $area = document.querySelector('.area');
const $add_box = document.querySelector('.add_box');

let box_hold = false;
const BoxesAreaWidth = $area.offsetWidth;
const BoxesAreaHeight = $area.offsetHeight;
let $selectedNote = null;
let selectedNoteNumber = null;
let boxes = [];
let noteWidth = 0;
let noteHeight = 0;
let startCoords = {
    x: 0,
    y: 0
}
let distance = {
    x: 0,
    y: 0
}

if (!!getLS('info')) {
    boxes = getLS('info');
    boxGenerator(boxes);
}
function setLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function getLS(key) {
    return JSON.parse(localStorage.getItem(key));
}

$area.addEventListener('input', function (e) {
    if (e.target.classList.contains('box_title')) {
        $selectedTitle = e.target;
        boxes[selectedNoteNumber].title = $selectedTitle.value;
    }
    if (e.target.classList.contains('box_text')) {
        $selectedText = e.target;
        boxes[selectedNoteNumber].text = $selectedText.value;
    }
    setLS('info', boxes);
});


function boxGenerator(info) {
    let temp = '';
    for (let i = 0; i < info.length; i++) {
        temp += '<div class="box" style="left: ' + info[i].x + 'px; top: ' + info[i].y + 'px;" data-index="' + i + '"><textarea class="box_title" placeholder="Note">' + info[i].title + '</textarea> <hr> <textarea class="box_text" placeholder="Text...">' + info[i].text + '</textarea></div>'
    }
    $area.innerHTML = temp;
    noteWidth = document.querySelector('.box').offsetWidth;
    noteHeight = document.querySelector('.box').offsetHeight;
}
$add_box.addEventListener('click', function () {
    boxes.push({
        x: 0,
        y: 0,
        title: "",
        text: ""
    });
    boxGenerator(boxes);
});
function notePos(x, y) {
    $selectedNote.style.left = x + 'px';
    $selectedNote.style.top = y + 'px';
}

$area.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('box')) {
        box_hold = true;
        $selectedNote = e.target;
        selectedNoteNumber = e.target.getAttribute('data-index');
        startCoords.x = e.pageX;
        startCoords.y = e.pageY;
    }
});
$area.addEventListener('mouseup', function (e) {
    box_hold = false;
    boxes[selectedNoteNumber].x = distance.x;
    boxes[selectedNoteNumber].y = distance.y;
    setLS('info', boxes);
});


$area.addEventListener('mousemove', function (e) {
    if (box_hold) {
        distance.x = boxes[selectedNoteNumber].x + (e.pageX - startCoords.x);
        distance.y = boxes[selectedNoteNumber].y + (e.pageY - startCoords.y);

        if (distance.x <= 0) distance.x = 0;
        if (distance.x >= (BoxesAreaWidth - noteWidth)) distance.x = BoxesAreaWidth - noteWidth;

        if (distance.y <= 0) distance.y = 0;
        if (distance.y >= (BoxesAreaHeight - noteHeight))  distance.y = BoxesAreaHeight - noteHeight;

        notePos(distance.x, distance.y);
    }
});