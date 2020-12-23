let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let paddleHeight = 10;
let paddleWidth = 130;
let paddleX = (canvas.width-paddleWidth)/2;
let ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height-100-ballRadius-paddleHeight/2;
let dx = 0.5;
let dy = -0.5;
let ax = 0.002;
let ay = -0.002;
let rightPressed = false;
let leftPressed = false;
let downreflection = false;
let enterPressed = false;
let score = 0;
let ascore = 0;
let flag = 0;

const keyDownHandler = (e) => {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    } else if (e.keyCode == 13) {
      enterPressed = true;
    }
};
const keyUpHandler = (e) => {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    } else if (e.keyCode == 13){
      enterPressed = false;
    }
};
const drawingtitle = () => {
  ctx.font = "50px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("ぼーるをおとさないで！", (canvas.width-50*11)/2, 250);
};
const drawstart = () => {
  ctx.font = "35px Arial";
  ctx.fillStyle = "#f00";
  ctx.fillText("Enterキーでプレイ開始", (canvas.width-35*11)/2, 390);
};
const drawabout = () => {
  ctx.font = "20px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText("ルールは下にあります", (canvas.width-20*10)/2, 460);
}
const ball = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};
const paddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight-100, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
};
const scoredrawing = () =>{
  ctx.font = "25px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText("スコア: "+score, 20, 40);
};
const gameoverdrawing = () => {
  ctx.beginPath();//パスを作る
  ctx.rect(0, 0, canvas.width, canvas.height);//四角形の描画コード
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fill();//色で充填
  ctx.closePath();//パスの終了
};
const gameovelettering = () => {
  ctx.font = "100px Arial";
  ctx.fillStyle = "#f00";
  ctx.fillText("GAMEOVER", (canvas.width-50*12)/2, 250);
};
const gameoverscore = () => {
  ctx.font = "35px Arial";
  ctx.fillStyle = "#f00";
  ctx.fillText("あなたのスコアは "+score+" です", (canvas.width-35*13.5)/2, 330);
};
const gameoverlettering2 = () => {
  ctx.font = "35px Arial";
  ctx.fillStyle = "#f00";
  ctx.fillText("Enterキーでもう一回プレイ",(canvas.width-35*13)/2, 390);
};
const retrystart = () => {
    if(enterPressed && flag === 2){
      document.location.reload();
      clearInterval(interval1);
    } else if (enterPressed && flag === 0) {
      flag = 1;
    }
};

const move = () => {
  if(flag === 1){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball();
    paddle();
    scoredrawing();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
      dx = -dx;
      ax = -ax;
     }
    if(y + dy < ballRadius) {
      dy = -dy;
      ay = -ay;
     }
    if(y + dy > canvas.height-paddleHeight/2-100 && y + dy < canvas.height+paddleHeight/2-100 && x + dx >= paddleX && x + dx <= paddleX+paddleWidth){
       downreflection = true
     } else {
        downreflection = false;
      }
    if (downreflection) {
      dy = -dy;
      ay = -ay;
    }

    if (y + dy >= canvas.height+ballRadius) {
      clearInterval(interval2);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      move2();
      flag = 2;
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {  paddleX += 7;  }
    else if(leftPressed && paddleX > 0) { paddleX -= 7;  }

    x += dx;
    y += dy;
    dx += ax;
    dy += ay;
  }

  retrystart();
};
const scorerunning = () => {
  if(flag === 1){
    score += 100*ascore;
    ascore += 0.01;
  };
};
const move2 = () => {
  gameoverdrawing();
  gameovelettering();
  gameoverscore();
  gameoverlettering2();
};
const start = () => {
  drawingtitle();
  drawstart();
  drawabout();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

start();
const interval1 = setInterval(move,10)
const interval2 = setInterval(scorerunning,100)

const con = ()=>{console.log((canvas.width-35*12.5)/2);};
setInterval(con, 200);
