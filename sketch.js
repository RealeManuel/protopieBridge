let rZ= 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  createEasyCam();
  document.oncontextmenu = ()=>false;
  angleMode(DEGREES)
}

function draw() {
  background(0);
  lights();
  drawBox(100, 0, 0, 0, 0, 0, rZ)

}

function drawBox(size, posX, posY, posZ, rotX, rotY, rotZ){
  rotateX(rotX)
  rotateY(rotY)
  rotateZ(rotZ)
  translate(posX, posY, posZ)
  box(size);
}

function receiveValues(id, value){
  rZ+=Number(value);
  console.log(rZ)
}

