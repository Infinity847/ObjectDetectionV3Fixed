var img = [];
var imgat = localStorage.getItem("photo");
var stats = "";
var objects = [];
var v;
function setup() {
    canvas = createCanvas(screen.width / 2, screen.height / 2);
    canvas.center();
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}
function modelLoaded() {
    console.log("Cocossd is loaded.");
    stats = true;
    objectDetector.detect(img[imgat], gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        objects = results;
        console.log("Detected ", objects.length);
    }
}
function preload() {
    img = [loadImage('Bedroom.jpg'), loadImage('Bottles.jpg'), loadImage('Desk.jpg'), loadImage('StuffedAnimal.jpg'), loadImage('TV&AC.jpg'), loadImage('TestObjects.png')];
}
function draw() {

    console.log("Draw");
    image(img[imgat], 0, 0, screen.width / 2, screen.height / 2);

    var w = img[imgat].width;
    var h = img[imgat].height;

    for (var i = 0; i < objects.length; i++) {
        console.log(objects[i].confidence, objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);

        var xx = objects[i].x / w * screen.width / 2;
        var yy = objects[i].y / h * screen.height / 2;
        var ww = objects[i].width / w * screen.width / 2;
        var hh = objects[i].height / h * screen.height / 2;

        text(objects[i].label + " " + percent + "%", xx, yy);
        noFill();
        stroke("#FF0000");
        rect(xx, yy, ww, hh);
    }

}
function changeimg() {
    v = document.getElementById("Images").value;
    console.log(v);
    if (v == "Bedroom") {
        imgat = 0;
    } else if (v == "Bottles") {
        imgat = 1;
    } else if (v == "Desk") {
        imgat = 2;
    } else if (v == "StuffedAnimal") {
        imgat = 3;
    } else if (v == "TV&AC") {
        imgat = 4;
    } else if (v == "TestObjects") {
        imgat = 5;
    }
    objectDetector.detect(img[imgat], gotResult);
}
