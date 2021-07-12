const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let isVideo = false;
let model = null;
var posx = 0;

const modelParams = {
  flipHorizontal: true, // flip e.g for video
  maxNumBoxes: 3, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.6, // confidence threshold for predictions.
};

function startVideo() {
  handTrack.startVideo(video).then(function (status) {
    console.log("video started", status);
    if (status) {
      isVideo = true;
      runDetection();
    } else {
    }
  });
}

function runDetection() {
  model.detect(video).then((predictions) => {
    //   console.log("Predictions: ", predictions);
    model.renderPredictions(predictions, canvas, context, video);

    for (const obj of predictions) {
      if (obj.label !== "face") {
        console.log(obj.bbox);

        posx = obj.bbox[0];
      }
    }

    if (isVideo) {
      requestAnimationFrame(runDetection);
    }
  });
}

// Load the model.
handTrack.load(modelParams).then((lmodel) => {
  model = lmodel;
  startVideo();
});

var xBall = Math.floor(Math.random() * 300) + 50;
var yBall = 50;
var xSpeed = (2, 7);
var ySpeed = (-7, -2);
var score = 0;

function setup() {
  var myCanvas = createCanvas(450, 400);
  myCanvas.parent("cont");
}

function draw() {
  background("#457b9d");

  fill("#ffffff");
  rect(posx, 375, 90, 15);

  move();
  display();
  bounce();
  paddle();

  fill("#ffffff");
  textSize(24);
  text("Score: " + score, 200, 25);
}
function move() {
  xBall += xSpeed;
  yBall += ySpeed;
}

function bounce() {
  if (xBall < 10 || xBall > 400 - 10) {
    xSpeed *= -1;
  }
  if (yBall < 10 || yBall > 400 - 10) {
    ySpeed *= -1;
  }
}

function display() {
  fill("#ffffff");
  ellipse(xBall, yBall, 20, 20);
}
function paddle() {
  if (xBall > posx && xBall < posx + 90 && yBall + 10 >= 375) {
    xSpeed *= -1;
    ySpeed *= -1;
    score++;
  }
}
