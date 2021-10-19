import "../style.scss";

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
  .then((req)=>console.log('sw register',req))
  .catch(err=>console.log('sw error',err))
}

const direction = {
  current:0,
  idle:0,
  right:1,
  left:2,
  up:3,
  down:4
}
const animationId =  requestAnimationFrame(main);
let isGameOver = false
document.addEventListener("keydown", function(evt){
  switch(evt.keyCode){
      case 37:
          //move left
          if(direction.current != direction.left && direction.current != direction.right) direction.current = direction.left;
          break;
      case 38:
          //move up
          if(direction.current != direction.up && direction.current != direction.down) direction.current = direction.up;
          break;
      case 39:
          //move right
          if(direction.current != direction.right && direction.current != direction.left) direction.current = direction.right;
          break;
      case 40:
          //move down
          if(direction.current != direction.down && direction.current != direction.up) direction.current = direction.down;
          break;
  }

});
document.addEventListener('mousedown',function(e){
    let upArrow = document.getElementById('up')
    let downArrow = document.getElementById('down')
    let rightArrow = document.getElementById('right')
    let leftArrow = document.getElementById('left')
    let tryAgainButton = document.getElementById('try-again')
    switch(e.target){
      case leftArrow:
          //move left
          if(direction.current != direction.left && direction.current != direction.right) {
             direction.current = direction.left;
             leftArrow.style.color = 'white'
             rightArrow.style.color = 'black'
             downArrow.style.color = 'black'
             upArrow.style.color = 'black'

          }
          break;
      case upArrow:
          //move up
          if(direction.current != direction.up && direction.current != direction.down) {
            leftArrow.style.color = 'black'
            rightArrow.style.color = 'black'
            downArrow.style.color = 'black'
            upArrow.style.color = 'white'
            direction.current = direction.up;
          }
          break;
      case rightArrow:
          //move right
          if(direction.current != direction.right && direction.current != direction.left) {
            leftArrow.style.color = 'black'
            rightArrow.style.color = 'white'
            downArrow.style.color = 'black'
            upArrow.style.color = 'black'
            direction.current = direction.right;
          }
          break;
      case downArrow:
          //move down
          if(direction.current != direction.down && direction.current != direction.up) {
            leftArrow.style.color = 'black'
            rightArrow.style.color = 'black'
            downArrow.style.color = 'white'
            upArrow.style.color = 'black'
            direction.current = direction.down;
          }
          break;
      case tryAgainButton:
          refreshGame()
  }
})
const csv = document.getElementById('snake')
const ctx = csv.getContext("2d")
let frames = 0
const food = {
  x : csv.width/10,
  y : csv.height/10,
  r : 4,

  draw : function(){
      ctx.beginPath();
      ctx.fillStyle = "rgb(186 196 1)";
      ctx.arc(this.x, this.y, this.r, 0 , 2*Math.PI);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
  } ,
  createFood:function(){
    let y = Math.random() * csv.height;
    let x = Math.random() * csv.width;
    while(snake.position.map(el=>el.x).includes(x) && snake.position.map(el=>el.y).includes(y) ){
      y = Math.random() * csv.height;
      x = Math.random() * csv.width;
    }
    this.x= x
    this.y = y
  } 
}
const snake= {
  size:12,
  position:[{
    x:csv.width/2,
    y:csv.height/2
  }],
  velocity:20,
  draw:function(){
    for(let i = 0 ;i<this.position.length;i++){
      let p = this.position[i]
      ctx.beginPath()
      ctx.fillStyle = 'rgb(111 95 1)'
      ctx.rect(p.x,p.y,this.size,this.size+5)
      ctx.fill()
      ctx.closePath()
    }
  },
  handleDirection(){
    if(direction.current == direction.right )   this.position[0].x +=this.velocity
    if(direction.current == direction.left )   this.position[0].x -=this.velocity
    if(direction.current == direction.up )   this.position[0].y -=this.velocity
    if(direction.current == direction.down )   this.position[0].y +=this.velocity
  },
  handleGettingOutSide(){
    if(this.position[0].x < 0 ) this.position[0].x = csv.width - 10;
    if(this.position[0].x > csv.width ) this.position[0].x = 10;
    if(this.position[0].y < 0 ) this.position[0].y = csv.height - 10;
    if(this.position[0].y > csv.height ) this.position[0].y = 10;
  },
  update:function(){
    if(frames%8 == 0){
          for(let i = this.position.length-1 ;i>0; i--){
            if(this.position[0].x == this.position[i].x && this.position[0].y == this.position[i].y && this.position.length > 2) {
              cancelAnimationFrame(animationId)
              showRetyModal()
              break
            }
            this.position[i].x = this.position[i-1].x
            this.position[i].y = this.position[i-1].y
          } 
          this.handleDirection()
          this.handleGettingOutSide()

         
         if(getDistance(food.x,food.y,this.position[0].x, this.position[0].y) <= 4*food.r){
          food.createFood()
          this.position.push({
            x : this.position[this.position.length -1].x,
            y : this.position[this.position.length -1].y                   
          });
        }
    }
 
  }
}
function getDistance(pointX1, pointY1, pointX2, pointY2) {
  let distanceX = pointX2 - pointX1;
  let distanceY = pointY2 - pointY1;

 return Math.sqrt(Math.pow(distanceX,2) + Math.pow(distanceY,2));
}
function showRetyModal(){
  cancelAnimationFrame(animationId);
  isGameOver = true
  new  Promise(resolve => setTimeout(resolve, 1000)).then(()=>document.getElementById('rety-modal').style.visibility ='visible')
  

  return

}
function refreshGame() {
  isGameOver = false
  snake.position = [{
    x:csv.width/2,
    y:csv.height/2
  }]
  document.getElementById('rety-modal').style.visibility ='hidden'
   animationId =  requestAnimationFrame(main);

}
function main() {
  if(isGameOver) return
  ctx.clearRect(0, 0, csv.width, csv.height);
  snake.update();
  snake.draw();
  food.draw();
  frames ++;
  requestAnimationFrame(main);

}
