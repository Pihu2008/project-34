//Create variables here
var dog, foodS, foodStock, dogImg, happyDogImg, database;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.5;
  foodStock = database.ref('food');
    foodStock.on("value",readStock);
}


function draw() {  
background(46, 139, 87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImg)
}

  drawSprites();
  //add styles here
  fill("white");
  textSize(40);
  text("Milk packets left: "+ foodS,50,30);

}

function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x = x-1;
  }
  database.ref('/').update({
    food : x
  })
}
