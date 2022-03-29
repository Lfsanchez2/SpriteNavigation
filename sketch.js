/***********************************************************************************
  Sprite Navigation

  Simple use of the p5.play library
------------------------------------------------------------------------------------
	To use:
	Add this line to the index.html

  <script src="p5.timer.js"></script>
***********************************************************************************/

// This is a 'sprite' which we can move
var ghost, player;
var speed = 10;

// The is a static sprite
var star, star2, star3, star4;
var starImg;

function preload() {
  starImg = loadImage('assets/fullStar.png');
}
// Setup code goes here
function setup() {
  debug = true;
  createCanvas(windowWidth, windowHeight);

  // create a sprite with dimensions
  star = createSprite(random(50, width/2), random(100, height/2));
  star.addImage('star', starImg);
  star2 = createSprite(random(200, width-50), random(100, height - 100));
  star2.addImage('star', starImg);
  star3 = createSprite(random(150, width/2), random(50, height-50));
  star3.addImage('star', starImg);
  star4 = createSprite(random(50, width-50), random(height/2, height-100));
  star4.addImage('star', starImg);
  ghost = createSprite(400, 150);
  player = createSprite(900, 400);

  // This is a *numbered* sequence of PNG files
  // We add animation to different sprites
  ghost.addAnimation('floating', 'assets/ghost_standing0001.png', 'assets/ghost_standing0007.png');
  player.addAnimation('running', 'assets/run1.png', 'assets/run2.png');
  player.addAnimation('standing', 'assets/standing.png');

  ghost.setDefaultCollider();
  ghost.setCollider('rectangle',0,0,70,130)
  player.setCollider('rectangle', 0,0,25,60);
  player.score = 0;
  
  frameRate(30);
 }

var start = false;
var end = false;
// Draw code goes here
function draw() {
  // could draw a PNG file here
  background('#2d324a');

  // trap keyboard arrow keys
  if(start && !end) {
    textAlign(LEFT);
    textSize(25);
    fill('white');
    text('Stars Collected: ' + player.score, 50, 100);
    checkMovement();
  }
  else if (!end){
    textSize(20);
    fill('white');
    textAlign(CENTER);
    text('Collect the stars and avoid the ghost! Press space to begin.', width/2, height - 60);
    player.changeAnimation('standing');
  }
  else {
    textSize(30);
    fill('white');
    textAlign(CENTER);
    text('You Collected All The Stars!', width/2, height - 60);
    noLoop();
  }

  // drawSprites is a function in p5.play, draws all the sprites
  drawSprites();

  // callback function
  //ghost.overlap(star, ghostCollision);
}

// This will reset position
function keyPressed() {
  if( key === ' ') {
    start = true;
  }
  if (key === 82) {
    reset();
  }
}

function checkMovement() {
  // Check x movement
  if(keyIsDown(68) || keyIsDown(65) || keyIsDown(83) || keyIsDown(87)) {
    player.changeAnimation('running');
  } else {
    player.changeAnimation('standing');
  }

  if(keyIsDown(68)) {
    player.velocity.x = speed;
  }
  else if(keyIsDown(65)) {
    player.velocity.x = -speed;
  }
  else {
    player.velocity.x = 0;
  }

  // Check y movement
  if(keyIsDown(83)) {
    player.velocity.y = speed;
  }
  else if(keyIsDown(87)) {
    player.velocity.y = -speed;
  }
  else {
    player.velocity.y = 0;
  }

  if(ghost.position.x === player.position.x) {
    ghost.velocity.x = 0;
  }

  if(ghost.position.y === player.position.y) {
    ghost.velocity.y = 0;
  }

  if(!ghost.collide(player)) {
    
    if(ghost.position.x > player.position.x) {
      ghost.velocity.x = -5;
    }
    else if(ghost.position.x < player.position.x) {
      ghost.velocity.x = 5;
    }
  
    
    if(ghost.position.y > player.position.y) {
      ghost.velocity.y = -5;
    }
    else if(ghost.position.y < player.position.y) {
      ghost.velocity.y = 5;
    }
  }

  else  {
    ghost.velocity.x = 0;
    ghost.velocity.y = 0;
    noLoop();
    textSize(30);
    fill('white');
    textAlign(CENTER);
    text('You Got Caught! Refresh to Restart.', width/2, height - 60);
  }

  

star.displace(player, explosion);
star2.displace(player, explosion);
star3.displace(player, explosion);
star4.displace(player, explosion);

function explosion(spriteA, spriteB) {
  spriteA.remove();
  spriteB.score++;
  if(spriteB.score === 4) {
    end = true;
  }
}


}

// SpriteA is the sprite in question, spriteA will be ghost in this case
// SpriteB is the one that it collided with
function ghostCollision(spriteA, spriteB) {
  ghost.position.x = 100;
  ghost.position.y = 100;

  //spriteB.remove();
}