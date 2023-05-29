window.onload = function(){
  const date = new Date();
  alert("Fun fact! Stiai ca data de azi este: " 
      + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " ?");
  
  var formu = document.querySelector('#formular');
   
  var previous_data = JSON.parse(localStorage.getItem('date')); 
  if(previous_data){
    document.body.style.setProperty('background-color', previous_data[previous_data.length - 1]['guess']);
  }

  document.body.addEventListener("click", event => {
    let index = parseInt(Math.random() * patterns.length);
    Object.keys(patterns[index]).forEach(function (prop) {
      document.body.style.setProperty(prop, patterns[index][prop]);
    }); 
 });

    document.querySelector('#rain').onclick = function(e){ 
      e.stopPropagation();      
      window.location.href = "index.html";
    }
    document.querySelector('#bubbles').onclick = function(e){ 
      e.stopPropagation();
      window.location.href = "bubbles.html";
    }
    document.querySelector('#opinion').onclick = function(e){
      e.target.style.visibility = "hidden";
      formu.style.visibility = "visible";
      document.body.style.setProperty('overflow-y', "auto");  
      e.stopPropagation();
    }

    formu.onclick = function(e){
      e.stopPropagation();
    }

    const value = document.querySelector("#rating_value");
    const input = document.querySelector("#rating");
    value.textContent = input.value;
    input.addEventListener("input", (event) => {
      value.textContent = event.target.value;
    })

   formu.addEventListener("submit", (e) => {
     var alldata = JSON.parse(localStorage.getItem('date'));
     if(!alldata){
      alldata = [];
     }

     var curentdata = {'nickname': document.getElementById('nickname').value , 
  'favorite_color': document.getElementById('favcolor').value, 'guess': document.getElementById('guess').value, 
     'rating': document.getElementById('rating').value, 'comments': document.getElementById('comments').value, 
                      'liked':{'idea': "no", 'colors': "no", 'aesthetic': "no", 'popping': "no"}}

    Object.keys(curentdata['liked']).forEach(function (key) {
      if(document.getElementById(key).checked)
        curentdata['liked'][key] = "yes";
    });

    alldata.push(curentdata);
    localStorage.setItem('date', JSON.stringify(alldata));
  });
}