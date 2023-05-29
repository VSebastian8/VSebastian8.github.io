var bubbles = []
var directions = []
var bubble_size = 10;
color_pallete = ["rgb(31,164,159)", "rgb(253,157,96)", "rgb(245,156,4)", "rgb(90,41,52)"]
var popped_bubbles;
var pop_sound
window.onload = function(){
  popped_bubbles = localStorage.getItem('curent-score');
    if (popped_bubbles) {
      update_score();
    }
    else {
      popped_bubbles = 0;
      update_score();
    }

  document.getElementById('perry').onclick = function(){
    document.body.style.setProperty('--text', "'Perry The '");
    document.body.classList.add("hat");
  }
  pop_sound = document.createElement('audio');
  pop_sound.src = "res/pop.mp3";

  summon_bubbles(25);
  move_bubbles();

  document.querySelector('#score').onclick = function(){
    let b = bubbles.length;
    summon_bubbles(10);
    if(b == 0)
      move_bubbles();
  };  
}
function summon_bubbles(number){
  var bubbles_nr = number;
  let cont = document.getElementById('bubble-container');
  let b = bubbles.length;

  for(let i = b; i < b + bubbles_nr; i++){
    bubbles[i] = document.createElement('img');
    bubbles[i].src = "res/bubble.png";
    bubbles[i].classList.add("bub");
    bubbles[i].classList.add("index" + i);
    bubbles[i].style.position = "absolute";
    bubbles[i].style.left = 50 - bubble_size/2 + "vw";
    bubbles[i].style.top = 50 - bubble_size/2 + "vh"; 
    
    directions[i] = {"x": 0, "y": 0, "amount": 0};
    directions[i].amount = Math.random() * 5;
    let random_angle = 360 * Math.random();
    let random_x = Math.cos(random_angle);
    let random_y = Math.sin(random_angle);
    directions[i].x = random_x;
    directions[i].y = random_y;
    
    bubbles[i].addEventListener("click", event => {

      pop_sound.play();
      cont.removeChild(event.target);
      popped_bubbles++;
      update_score();

      let ind = parseInt(event.target.classList[1].replace(/[^0-9]/g, ''));
      bubbles.splice(ind, 1);
      directions.splice(ind, 1);
      recalculate_bubbles_index();
    });
    cont.appendChild(bubbles[i]); 
  }
}

function move_bubbles(){
  bubble_move = setInterval(function(){
    if(bubbles.length > 0){
      var timer = 0;
      for(let i = 0; i < bubbles.length; i++){
        random_direction(i);
      }
      bubble_deccelerate = setInterval(function(){

        for(let i = 0; i < bubbles.length; i++){
          random_move(i);
          check_bounds(i);
        }
        timer++;
        if(timer > 18)
          clearInterval(bubble_deccelerate);
      }, 50);
    }
    else{
      clearInterval(bubble_deccelerate);
      clearInterval(bubble_move);
      alert("No More Bubbles");
      var answer = prompt("Would you like to leave a review? \n (suggestion - yes)");
      if(answer.toUpperCase() == "YES"){
        window.location.href = "opinion.html";
      }
    }
  }, 1000);
}

function random_direction(index){
  if(directions[index].amount < 0.05){
    let amount = Math.random() * 2;
    directions[index].amount = amount;

    let random_angle = 360 * Math.random();
    let random_x = Math.cos(random_angle);
    let random_y = Math.sin(random_angle);
    
    directions[index].x = random_x;
    directions[index].y = random_y;
  }
}

function random_move(index){

  bubbles[index].style.left = parseFloat(bubbles[index].style.left) +
                             directions[index].amount * directions[index].x + "vw";
  bubbles[index].style.top = parseFloat(bubbles[index].style.top) + 
                             directions[index].amount * directions[index].y + "vh";
  directions[index].amount *= 0.95;
}

function recalculate_bubbles_index(){
  for(let i = 0; i < bubbles.length; i++){
    bubbles[i].classList.remove(bubbles[i].classList[1])
    bubbles[i].classList.add("index" + i);
  }
}

function check_bounds(index){
  if(parseFloat(bubbles[index].style.left) + bubble_size < 0 || parseFloat(bubbles[index].style.left) > 100 || 
      parseFloat(bubbles[index].style.top) + bubble_size * 2 < 0 || parseFloat(bubbles[index].style.top) > 100){
      document.getElementById('bubble-container').removeChild(bubbles[index]);
      bubbles.splice(index, 1);
      directions.splice(index, 1);
      recalculate_bubbles_index();
      console.log("bubble " + index + " out of bounds")
  }
}

function update_score(){
  const score_diamond = document.querySelector('#score');
  score_diamond.getElementsByTagName('a')[0].innerHTML = popped_bubbles;
  localStorage.setItem('curent-score', popped_bubbles); 
}