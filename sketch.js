//fonts
let neucha;

// gui params
var careLvl = 3;

// gui
var visible = true;
var gui, gui2;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Calculate big radius
  bigRadius = height / 3.0;

  // Create Layout GUI
  gui = createGui(undefined, "CARE LEVEL", "QuickSettings");
  sliderRange(1, 5);
  gui.addGlobals("careLvl");
  gui.setPosition(width * 0.3, height * 0.05);
  gui.resize(width * 0.7, height * 0.1);

  // Don't loop automatically
  noLoop();
}

function draw() {}
