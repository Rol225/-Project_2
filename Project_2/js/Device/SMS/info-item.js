var Reload

/*Правая левая кнопка дисплей->СМС*/
function Left_button_queue(device){
  document.getElementById('view_content').style.display='block'
  document.getElementById('send_message').style.display='none'
  document.getElementById('Left_button').style.background='#7F9860'
  document.getElementById('Left_button').style.border='#7F9860'
  document.getElementById('Right_button').style.background='#8A8A8A'
  document.getElementById('Right_button').style.border='#8A8A8A'
  if(device == 'SMSDevice'){Devices(3)}
  else if(device == 'EmailDevice'){Devices(4)}

}
function Right_button_write(){
  document.getElementById('view_content').style.display='none'
  document.getElementById('send_message').style.display='grid'
  document.getElementById('Left_button').style.background='#8A8A8A'
  document.getElementById('Left_button').style.border='#8A8A8A'
  document.getElementById('Right_button').style.background='#7F9860'
  document.getElementById('Right_button').style.border='#7F9860'
  if(device == 'SMSDevice'){Devices(3)}
  else if(device == 'EmailDevice'){Devices(4)}
}
/*--Правая левая кнопка дисплей->СМС--*/

/*Устройства/каналы*/
function PrintDevice(device){
  if(device=='SMSDevice'){data = DeviceDataSMS}
  else if(device=='EmailDevice'){data = DeviceDataEmail}
  else if(device=='SpeakersDevice'){data = DeviceDataSpeakers}
  else if(device=='ScoreboardDevice'){data = DeviceDataScoreboard}

  if(Reload == 1){
     Device_info(IdElement, device)
  }

  document.getElementById('ListContent').innerHTML = '';
  for (let i in data){
    let color
    let statusText
    if(data[i].status == 0){color='style="background: #CC5252;"'; statusText='не в сети'}
    else if(data[i].status == 1){color='style="background: #4FB93E;"'; statusText='в сети/подключён'}
    else if(data[i].status == 2){color='style="background: #EBC747;"'; statusText='в сети'}
    document.getElementById('ListContent').innerHTML += '<div class="list_item item--devices" onclick="Device_info('+i+',\''+device+'\')"><div class="item_status_light item_status_light--device" '+color+'"></div><div class="item_descriptions item_descriptions--device"><div class="item_descriptions_text item_descriptions_text--device">Имя: <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">'+data[i].name+'</span></div><div class="item_descriptions_text item_descriptions_text--device">Статус: <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">'+statusText+'</span></div><div class="item_descriptions_text item_descriptions_text--device">Описание: <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">'+data[i].description+'</span></div></div></div>'
  }
}
/*------Устройства/каналы--------*/
/*Отчистка текста*/
function ClearText(){
  document.getElementById('sendText').value = null
}
function SendSMSBg(){
  document.getElementById('sendTelephon').style.background = null;
  document.getElementById('sendGroup').style.background = null;
  document.getElementById('sendTime').style.background = null;
  document.getElementById('sendTriger').style.background = null;
  document.getElementById('sendTimeEnd').style.background = null;
  document.getElementById('sendName').style.background = null;
  document.getElementById('sendText').style.background = null;
}
