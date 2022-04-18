//fonts
let neucha;

// gui params
var CareLevel = 3;

// gui
let gui;
let div;

//game variables
let gamestate;
let score;
let currentMsg;
let msgs = [];
let mi;
let chatbot;
let y;

//buttons
let startBtn;
let backBtn;
let restartBtn;
let sendBtn;

//input form
let inp;

//COLORS
//dark blue         #424D69    66, 77, 105
//blue              #66769D    102, 118, 157
//light blue        #A6B2D3    166, 178, 211
//light light blue  #d5dcf0    213, 220, 240
//white             #FFFFFF    255, 255, 255
//green             #bfcfb2    191, 207, 178

function setup() {
  createCanvas(windowWidth, windowHeight);

  //set up gui
  gui = createGui(undefined, "CARE LEVEL", "QuickSettings");
  sliderRange(1, 5);
  gui.addGlobals("CareLevel");
  gui.setPosition(width * 0.075, height * 0.17);
  gui.resize(width * 0.85, height * 0.15);
  gui.hide();

  //buttons
  startBtn = createButton("START");
  startBtn.center();
  startBtn.mousePressed(startGame);
  startBtn.hide();

  restartBtn = createButton("RETRY");
  restartBtn.position(width * 0.8, height * 0.1);
  restartBtn.mousePressed(reset);
  restartBtn.hide();

  backBtn = createButton("BACK");
  backBtn.position(width * 0.05, height * 0.075);
  backBtn.mousePressed(reset);
  backBtn.hide();

  sendBtn = createButton("SEND");
  sendBtn.position(width * 0.875, height * 0.85);
  sendBtn.size(width * 0.1, height * 0.05);
  sendBtn.mousePressed(getMsg);
  sendBtn.hide();

  //input
  inp = createInput();
  inp.position(width * 0.15, height * 0.825);
  inp.size(width * 0.7, height * 0.075);
  inp.hide();

  //game vars
  score = 0;
  mi = 0;
  chatbot = "dumb robot";
  y = 0.33;
  gamestate = "home";
}

function preload() {
  neucha = loadFont("assets/Neucha-Regular.ttf");
}

function draw() {
  //game state
  switch (gamestate) {
    case "home":
      homeScreen();
      break;
    case "chat":
      chatScreen();
      break;
    case "end":
      endScreen();
      break;
  }

  //checks if game is over
  if (score > 20) {
    gamestate = "end";
  }

  //displays msgs
  //showMsgs();
}

function homeScreen() {
  restartBtn.hide();
  backBtn.hide();
  sendBtn.hide();
  gui.hide();
  inp.hide();
  startBtn.show();
  background(66, 77, 105);

  //text setup
  textFont(neucha);
  textSize(height * 0.15);
  textAlign(CENTER, CENTER);
  fill(191, 207, 178);
  text("home screen", width * 0.5, height * 0.1);
}

function chatScreen() {
  inp.show();
  sendBtn.show();
  startBtn.hide();
  backBtn.show();
  background(66, 77, 105);

  //text setup
  textFont(neucha);
  textSize(height * 0.1);
  textAlign(CENTER, CENTER);
  fill(191, 207, 178);
  text("chat screen :)", width * 0.5, height * 0.1);
  gui.show();
  textSize(height * 0.05);
  text("score : " + score, width * 0.9, height * 0.1);
  showMsgs();
}

function endScreen() {
  backBtn.hide();
  restartBtn.show();
  sendBtn.hide();
  inp.hide();
  gui.hide();
  background(66, 77, 105);

  //text setup
  textFont(neucha);
  textSize(height * 0.05);
  fill(191, 207, 178);
  text("end screen", width * 0.5, height * 0.1);
  text("score : " + score, width * 0.5, height * 0.7);
}

function keyPressed() {
  if (gamestate === "chat") {
    if (keyCode == ENTER || keyCode == RETURN) {
      getMsg();
    }
  }
}

function getTime() {
  return hour() + ":" + minute() + ":" + second();
}

function respond(msg) {
  let response = "damn that's crazy";
  return new Msg(getTime(), response, chatbot);
}

function startGame() {
  gamestate = "chat";
}

function reset() {
  gamestate = "home";
  score = 0;
  msgs = [];
  mi = 0;
  y = 0.33;
}

function getMsg() {
  msg = inp.value();
  let current = new Msg(getTime(), msg, "user");
  msgs[mi] = current;
  console.log(msgs[mi].time + " > " + msgs[mi].sender + " : " + msgs[mi].msg);
  mi++;
  score++;
  inp.value("");

  //bot response
  msgs[mi] = respond(msg);
  mi++;

  // console.log(`mi = ${mi}`);
  // console.log(msgs);
}

function showMsgs() {
  let y = 0.33;
  for (let i = 0; i < mi; i++) {
    //msgs[i].setY(y);
    msgs[i].display(y);
    y += 0.05;
    console.log("showMsgs: y = " + msgs[i].y);
    if (y >= 0.78) {
      scrollMsgs();
      y = 0.75;
    }
  }
}

function scrollMsgs() {
  for (let i = 0; i < mi; i++) {
    msgs[i].redraw(y - 0.2);
    console.log("scrolling: y = " + msgs[i].y);
  }
}

class Msg {
  constructor(time, msg, sender) {
    this.time = time;
    this.msg = msg;
    this.sender = sender;
  }

  setY(y) {
    this.y = y;
  }

  redraw() {
    textFont(neucha);
    rectMode(CORNER);

    if (this.sender === "user") {
      //msg label
      fill(213, 220, 240);
      textAlign(RIGHT);
      textSize(height * 0.018);
      text(this.time + " | " + this.sender, width * 0.83, height * this.y);

      //msg box
      noStroke();
      fill(191, 207, 178);
      rect(
        width * 0.55,
        height * (this.y + 0.015),
        width * 0.3,
        height * 0.05,
        10
      );

      //msg
      fill(66, 77, 105);
      textAlign(RIGHT);
      textSize(height * 0.025);
      text(this.msg, width * 0.83, height * (this.y + 0.04));
    } else {
      //msg label
      fill(213, 220, 240);
      textAlign(LEFT);
      textSize(height * 0.018);
      text(this.time + " | " + this.sender, width * 0.15, height * this.y);

      //msg box
      noStroke();
      fill(213, 220, 240);
      rect(
        width * 0.15,
        height * (this.y + 0.015),
        width * 0.3,
        height * 0.05,
        10
      );

      //msg
      fill(102, 118, 157);
      textAlign(LEFT);
      textSize(height * 0.025);
      text(this.msg, width * 0.17, height * (this.y + 0.04));
    }
  }

  display(y) {
    textFont(neucha);
    rectMode(CORNER);

    if (this.sender === "user") {
      //msg label
      fill(213, 220, 240);
      textAlign(RIGHT);
      textSize(height * 0.018);
      text(this.time + " | " + this.sender, width * 0.83, height * y);

      //msg box
      noStroke();
      fill(191, 207, 178);
      rect(width * 0.55, height * (y + 0.015), width * 0.3, height * 0.05, 10);

      //msg
      fill(66, 77, 105);
      textAlign(RIGHT);
      textSize(height * 0.025);
      text(this.msg, width * 0.83, height * (y + 0.04));
    } else {
      //msg label
      fill(213, 220, 240);
      textAlign(LEFT);
      textSize(height * 0.018);
      text(this.time + " | " + this.sender, width * 0.15, height * y);

      //msg box
      noStroke();
      fill(213, 220, 240);
      rect(width * 0.15, height * (y + 0.015), width * 0.3, height * 0.05, 10);

      //msg
      fill(102, 118, 157);
      textAlign(LEFT);
      textSize(height * 0.025);
      text(this.msg, width * 0.17, height * (y + 0.04));
    }
  }
}
