const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea'),
  car = document.createElement('div'),
  maxRandom = 8;
car.classList.add('car');

const music = new Audio('./nevi.mp3') ;


start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);


const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
}

const setting = {
  start: false,
  score: 0,
  speed: 10,
  traffic: 3
}

function getQuantityElements(heightElement) {
  return document.documentElement.clientHeight / heightElement + 1;
}

function getRandomEnemy(max) {
  return Math.floor((Math.random() * max) + 1)
}



function startGame() {
  start.classList.add('hide');
  gameArea.innerHTML = '';
  gameArea.classList.remove('hide');
  car.style.left = gameArea.offsetWidth / 2 + car.offsetWidth / 2 + 'px';
  car.style.top = '';
  car.style.bottom = '20px';
  music.play();
  for (let i = 0; i < getQuantityElements(100); i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i * 100) + 'px';
    line.y = i * 100;
    gameArea.appendChild(line);
    line.style.left = gameArea.offsetWidth / 2 - line.offsetWidth / 2 + 'px';
  }
  for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.background =
      `transparent 
          url("./image/enemy${getRandomEnemy(maxRandom)}.png") 
          center /cover no-repeat`;
    enemy.y = -100 * setting.traffic * (i + 1);
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    enemy.style.top = enemy.y + 'px';
    gameArea.appendChild(enemy);

  }
  setting.score = 0;
  setting.start = true;
  gameArea.appendChild(car);
   car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2 + 'px';
  car.style.top = '';
  car.style.bottom = '20px';
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame);
}

function playGame() {
  if (setting.start) {
    setting.score += setting.speed /10;
    score.textContent = 'SCORE ' + setting.score;
    moveRoad();
    moveEnemy();
    if (keys.ArrowLeft && setting.x > 0) {
      setting.x -= setting.speed ;
    }
    if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
      setting.x += setting.speed ;
    }
    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed ;
    }
    if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
      setting.y += setting.speed ;
    }
    car.style.left = setting.x + 'px';
    car.style.top = setting.y + 'px';
    requestAnimationFrame(playGame);
  }
}

function startRun(event) {
  if (keys.hasOwnProperty(event.key)) {
    event.preventDefault();
    keys[event.key] = true;
  }


}

function stopRun(event) {
  if (keys.hasOwnProperty(event.key)) {
    keys[event.key] = false;
  }
};

function moveRoad() {
  let lines = document.querySelectorAll('.line');
  lines.forEach((item) => {
    item.y += setting.speed;
    item.style.top = item.y + 'px';
    if (item.y >= document.documentElement.clientHeight) {
      item.y = -100;
    }
  })

}

function moveEnemy() {
  let enemys = document.querySelectorAll('.enemy');
  enemys.forEach((item) => {
    let carRect = car.getBoundingClientRect();
    let enemyRect = item.getBoundingClientRect();
    if(carRect.top<= enemyRect.bottom && carRect.right>= enemyRect.left && carRect.left <= enemyRect.right && carRect.bottom >= enemyRect.top){
    setting.start = false;
    music.pause();
    start.classList.remove('hide');
    start.style.top = score.offsetHeight + 'px';
    
    }
    item.y += setting.speed / 2;
    item.style.top = item.y + 'px';
    if (item.y >= document.documentElement.clientHeight) {
      item.y = -100 * setting.traffic;
      item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    }
  })

}