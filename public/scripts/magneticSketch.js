// var canvasWidth = 1000;
// var canvasHeight = 500;
//
// function setup() {
//   // creates our canvas and interactive inputs
//   myCanvas = createCanvas(canvasWidth, canvasHeight);
//   myCanvas.parent('magneticSketch');
// }
//
// function draw(){
//   fill(255, 15);
//   // rect(0, 0, canvasWidth, canvasHeight);
// }
var wordList;
var boxes = [];
var amaticRegular, latoRegular, ostrichSansHeavy, ralewayMedium, robotoRegular, steelworksVintage;


function preload() {
  wordList = loadStrings('../text/basicWordList.txt');

  amaticRegular = loadFont('../fonts/AmaticSC-Regular.ttf');
  latoRegular = loadFont('../fonts/Lato-Regular.ttf');
  ostrichSansHeavy = loadFont('../fonts/OstrichSans-Heavy.otf');
  ralewayMedium = loadFont('../fonts/Raleway-Medium.ttf');
  robotoRegular = loadFont('../fonts/Roboto-Regular.ttf');
  steelworksVintage = loadFont('../fonts/Steelworks Vintage Demo.ttf');

}



function setup() {
    // createCanvas(displayWidth,displayHeight);
    createCanvas(1000, 600);
    for (var i = 0; i < 40; i++) {
        boxes.push(generateWordAndBox());
        console.log(boxes[i]);
    }
    angleMode(DEGREES)
}

function draw() {
    // background(0, 200, 200);
    background(0);
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }
}




function mousePressed() {
    for (var i = 0; i < boxes.length; i++) {
        //checking to see if the mouse is over the box and turning it white if it is
        if (boxes[i].boxover == true) {
            boxes[i].locked = true;
            print("mouse is pressed")
        } else {

            boxes[i].locked = false;
            print("mouse isn't pressed")
        }
        boxes[i].xoffset = mouseX - boxes[i].xpos;
        boxes[i].yoffset = mouseY - boxes[i].ypos
        print(boxes[i].locked);
    }
    return false;
}

function mouseDragged() {
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].locked) {
            boxes[i].xpos = mouseX - boxes[i].xoffset;
            boxes[i].ypos = mouseY - boxes[i].yoffset;
        }
    }
}

function mouseReleased() {
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].locked = false;
    }
}


function generateWordAndBox() {
  var indexOfRandomWord = floor(random(wordList.length))
  var randomWord = wordList[indexOfRandomWord];
  var randomFont;
  var fontChoices = [1,2,3,4,5,6];
  switch (random(fontChoices)) {
    case 1:
      randomFont = amaticRegular;
      break;
    case 2:
      randomFont = latoRegular;
      break;
    case 3:
      randomFont = ralewayMedium;
      break;
    case 4:
      randomFont = robotoRegular;
      break;
    case 5:
      randomFont = ostrichSansHeavy;
      break;
    case 6:
      randomFont = steelworksVintage;
      break;
    default:
      randomFont = ostrichSansHeavy;
  }
  return buildBox(randomWord, randomFont);
}

function buildBox(word, font){
  console.log(word, font);
  return new Box(word, font, random(14,30), random(-8,8));
}

function Box(word, font, tempFontSize, rotation) {
    // this.c = tempColor
    // this.fontSize = textSize(tempFontSize);
    this.tempFontSize = tempFontSize;
    this.xpos = random(width);
    this.ypos = random(height);
    this.boxsize = 25;
    this.boxover = false;
    this.locked = false;
    this.xoffset = 0;
    this.yoffset = 0;
    this.font = font;
    this.text = word;
    // this.boxWidth = word.split('').length * (this.tempFontSize/2) + 10;
    // console.log(this.boxWidth);
    this.rotation = rotation;
    textSize(this.tempFontSize);
    this.boxWidth = textWidth(this.text);
    rectMode(RADIUS);

    this.show = function() {
      // rotate(rotation);
      textSize(this.tempFontSize);
      textAlign(LEFT);
      textFont(this.font);
      // var boxWidth = textWidth(this.text)
      // this.boxWidth = textWidth(this.text);

        if (mouseX > this.xpos - (this.boxWidth/2 + 10) && mouseX < this.xpos + (this.boxWidth/2 + 10) &&
            mouseY > this.ypos - (this.tempFontSize*.66) && mouseY < this.ypos + (this.tempFontSize*.66)) {
            this.boxover = true;
            fill(130);

            if (mouseIsPressed && this.boxover == true) {
                stroke(200, 79, 100);
                strokeWeight(5);
            } else {
                noStroke();
            }

        } else {
            this.boxover = false;
            noStroke();
            // fill(this.c);
            fill(255);
        }

        rect(this.xpos, this.ypos, (this.boxWidth/2) + 5, this.tempFontSize*.66, 5);
        fill(0);
        text(this.text, this.xpos - this.boxWidth/2.1, this.ypos + (this.tempFontSize*.3));
        // resetMatrix();
    };
}
