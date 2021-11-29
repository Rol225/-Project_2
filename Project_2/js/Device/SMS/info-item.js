/*Правая левая кнопка дисплей->СМС*/
function Left_button_queue(){
  document.getElementById('view_content').style.display='block'
  document.getElementById('send_message').style.display='none'
  document.getElementById('Left_button').style.background='#7F9860'
  document.getElementById('Left_button').style.border='#7F9860'
  document.getElementById('Right_button').style.background='#8A8A8A'
  document.getElementById('Right_button').style.border='#8A8A8A'
}
function Right_button_write(){
  document.getElementById('view_content').style.display='none'
  document.getElementById('send_message').style.display='grid'
  document.getElementById('Left_button').style.background='#8A8A8A'
  document.getElementById('Left_button').style.border='#8A8A8A'
  document.getElementById('Right_button').style.background='#7F9860'
  document.getElementById('Right_button').style.border='#7F9860'
}
/*--Правая левая кнопка дисплей->СМС--*/

/*Устройства/каналы*/
function PrintDevice(device){
  if(device=='SMSDevice'){data = DeviceDataSMS}
  else if(device=='EmailDevice'){data = DeviceDataEmail}
  else if(device=='SpeakersDevice'){data = DeviceDataSpeakers}
  else if(device=='ScoreboardDevice'){data = DeviceDataScoreboard}

  document.getElementById('ListContent').innerHTML = '';
  for (let i in data){
    document.getElementById('ListContent').innerHTML += '<div class="list_item item--devices" onclick="Device_info('+i+',\''+device+'\')"><div class="item_status_light item_status_light--device" style="background:'+data[i].status+'"></div><div class="item_descriptions item_descriptions--device"><div class="item_descriptions_text item_descriptions_text--device">Имя: <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">'+data[i].name+'</span></div><div class="item_descriptions_text item_descriptions_text--device">Статус: <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">'+data[i].statusText+'</span></div><div class="item_descriptions_text item_descriptions_text--device">Описание: <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">'+data[i].description+'</span></div></div></div>'
  }
}
/*------Устройства/каналы--------*/
