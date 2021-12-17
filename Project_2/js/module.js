

/*Смена модулей*/
function DeviceModule(){
    document.getElementById('Main_hellow').style.display='none'
    document.getElementById('welcome').innerHTML = '<div class="hellow_text hellow_text_welcome" id="welcome">Добро пожаловать</div>'
    document.getElementById('module').innerHTML = '<iframe src="./module/devices.html" frameborder="0" seamless></iframe>';
}
function PlaylistModule(){
  document.getElementById('Main_hellow').style.display='none'
  document.getElementById('welcome').innerHTML = '<div class="hellow_text hellow_text_welcome" id="welcome">Добро пожаловать</div>'
  document.getElementById('module').innerHTML = '<iframe src="./module/playlist.html" frameborder="0" seamless></iframe>';
}
function ConfigurationModule(){
  document.getElementById('Main_hellow').style.display='none'
  document.getElementById('welcome').innerHTML = '<div class="hellow_text hellow_text_welcome" id="welcome">Добро пожаловать</div>'
  document.getElementById('module').innerHTML = '<iframe src="./module/configuration.html" frameborder="0" seamless></iframe>';
}
/*---Смена модулей---*/
/*Выпадающий список*/
function Roll(option){
  if(option==1){
    document.getElementById('roll').remove()
    document.getElementById('list').innerHTML += '<button class="roll" onclick="Roll(2)" id="roll"><hr class="roll_hr"><hr class="roll_hr"><hr class="roll_hr"></button>'
    document.getElementById('ListContent').style.display='none'
    document.getElementById('list').style.width='30px'
    document.getElementById('info_device').style.width='94%'
  }
  else if(option==2){
    document.getElementById('roll').remove()
    document.getElementById('list').innerHTML += '<button class="roll" onclick="Roll(1)" id="roll"><hr class="roll_hr"><hr class="roll_hr"><hr class="roll_hr"></button>'
    document.getElementById('ListContent').style.display='block'
    document.getElementById('list').style.width='100%'
    document.getElementById('info_device').style.width='74%'
  }
}
/*---Выпадающий список---*/
