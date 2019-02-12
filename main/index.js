let canvas = document.querySelector('#canvas'),
  cW = canvas.width,
  cH = canvas.height,
  ctx = canvas.getContext('2d');
  playing = false;

function drawSingleBar(x, y1) {
  // 创建渐变
  let grd = ctx.createLinearGradient(x, 250, x, y1);
  grd.addColorStop(0, 'green');
  grd.addColorStop(0.5, 'yellow');
  grd.addColorStop(1, 'red');
  ctx.beginPath();

  ctx.moveTo(x, 250);
  ctx.lineTo(x, y1);
  ctx.strokeStyle = grd;
  ctx.lineWidth = 10;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x - 5, y1 - 5);
  ctx.lineTo(x + 5, y1 - 5);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.stroke();
}


//drawSingleBar();
//
let audioContext = AudioContext || webkitAudioContext;

let context = new audioContext;

let audio = new Audio('/static/33.mp3');

// 创建节点
let source = context.createMediaElementSource(audio);

let analyser = context.createAnalyser();

source.connect(analyser);

analyser.connect(context.destination);

let output = new Uint8Array(360);

function play() {
  audio.play();
  playing = true;
  gogogo();
}

function pause() {
  audio.pause();
  playing = false;
}

function drawArc() {
  ctx.beginPath();
  ctx.arc(1300, 500, 200, 0, 2 * Math.PI);
  ctx.strokeStyle = "white";
  ctx.stroke();

  for (let i = 0; i < 360; i++) {
    let beginX = 1300 + 200 * Math.cos(Math.PI / 180 * i);
    let beginY = 500 + 200 * Math.sin(Math.PI / 180 * i)
    ctx.beginPath();
    ctx.moveTo(beginX, beginY);
    ctx.lineTo(beginX + (output[i] / 3 + 5) * Math.cos(Math.PI / 180 * i), beginY + (output[i] / 3 + 5) * Math.sin(Math.PI / 180 * i));
    ctx.strokeStyle = 'orange';
    ctx.stroke();

  }
}

//drawArc();




function gogogo () {
  if (!playing) {
    return;
  }
  analyser.getByteFrequencyData(output);

  ctx.clearRect(0, 0, cW, cH);

  for(let i = 0; i < 100; i++) {
    let x = i * 15,
      y1 = 250 - output[i * 3] / 2 - 10;
    drawSingleBar(x, y1);
  }
    drawArc();

  /*ctx.beginPath();
  ctx.moveTo(0, 250 - output[0]);
  for (let i = 1; i < 100; i++) {
    ctx.lineTo(i * 15, 250 - output[i]);
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 3;
    ctx.stroke();
  }*/

  requestAnimationFrame(gogogo);
}









