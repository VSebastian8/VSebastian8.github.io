window.onload = function(){
  let rain_container = document.getElementById("rain-container");
  let raindrops = generate_rain(40);
  
  for(let i = 0; i < raindrops.length; i++)
    rain_container.appendChild(raindrops[i]);

  let spots = document.getElementsByClassName('spot');
  spots[0].classList.add('selected-spot');
  var curent_pallete_ind = 0;
  var last_pallete_ind = 0;

  document.body.onkeydown = function(event){
    switch(event.key){
      case "ArrowLeft":
        curent_pallete_ind--;
        break;
      case "ArrowRight":
        curent_pallete_ind++;
        break;
      default:
        break;    
    }
    if(curent_pallete_ind > 4)
      curent_pallete_ind = 0;
    if(curent_pallete_ind < 0)
      curent_pallete_ind = 4;
    
    if(curent_pallete_ind != last_pallete_ind){
      let new_color = getComputedStyle(spots[curent_pallete_ind]).getPropertyValue("background-color");
      spots[curent_pallete_ind].classList.add('selected-spot');
      spots[last_pallete_ind].classList.remove('selected-spot');
      last_pallete_ind = curent_pallete_ind;
    
      setTimeout(function(){
        document.getElementsByClassName('menu')[0].style.setProperty("border-color", new_color);
        document.getElementsByClassName('menu')[0].getElementsByTagName('a')[0].style.setProperty("color", new_color);
        boxes =  Array.prototype.slice.call(document.getElementsByClassName('box'), 0 );
        boxes.forEach(function (box) {
          box.style.setProperty("border-color", new_color);
          box.getElementsByTagName('a')[0].style.setProperty("color", new_color);
        });    
      }, 300);
    
      
    }  
  }
}

function generate_rain(nr){
  const nr_drops = nr;
  let raindrops = [];
  
  let rn_sizes = ["smol", "moderate", "moderate", "chunky"];
  let rn_colors = ["c1", "c2", "c3"];
  let rn_falls = ["f1", "f1", "f2"];

  for(let i = 0; i < nr_drops; i++){
    let rd = document.createElement("div");
    rd.classList.add("raindrop", rn_sizes.random(), rn_colors.random(), rn_falls.random());
    raindrops.push(rd);
  }

  return raindrops;
}

Array.prototype.random = function () {
  return this[ Math.floor(( Math.random() * this.length)) ];
}