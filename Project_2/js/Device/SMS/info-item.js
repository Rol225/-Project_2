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

// Печать верхних кнопок
function TopLeftRightBtnView(device){
  document.getElementById('info_device').style.display='block';
  if(device == 'SMSDevice'){
    document.getElementById('TopLeftRightBtn_CMC').style.display='flex';
    document.getElementById('TopLeftRightBtn_Email').style.display='none';
  }
  else if(device == 'EmailDevice'){
    document.getElementById('TopLeftRightBtn_CMC').style.display='none';
    document.getElementById('TopLeftRightBtn_Email').style.display='flex';
  }
  else if(device == 'SpeakersDevice'){

  }
  else if(device == 'ScoreboardDevice'){

  }
}
// Информация о канале/Устройстве
function Device_info(IdElementNew, device){
  IdElement = IdElementNew          // Id елемента
  let data = DataDevice._devices[IdElement]        // Инофрмация из бд
  TopLeftRightBtnView(device)       // Печать верхних кнопок

  // Предметы поиска
  if(flagStatus_content==undefined){
    document.getElementById('search_flag_content').innerHTML = `
    <div class="flag_status_container" onchange="FlagStatusChek('`+device+`', 'contentSearch', 'flag_status_content')">
      <div class="flag_status_container_title">Статус</div>
      <div><input class="flag_status flag_status_content" type="radio" name="flag_status" value="status_All" id="flag_status_content_All" checked><label class="inner-label" for="flag_status_content_All">Все</label></div>
      <div><input class="flag_status flag_status_content" type="radio" name="flag_status" value="status_Ok" id="flag_status_content_Ok"><label class="inner-label" for="flag_status_content_Ok">Допущено</label></div>
      <div><input class="flag_status flag_status_content" type="radio" name="flag_status" value="status_Unknow" id="flag_status_content_Unknow"><label class="inner-label" for="flag_status_content_Unknow">Не проверено</label></div>
      <div><input class="flag_status flag_status_content" type="radio" name="flag_status" value="status_No" id="flag_status_content_No"><label class="inner-label" for="flag_status_content_No">Не допущено</label></div>
    </div>
  </div>`
    FlagStatusChek('\''+device+'\'', 'DeviceSearch', 'flag_status_content') // Проверка сортировки
  }
  let color
  let statusText
  let name
  let description

  try{
    if(data._status == 0){color='style="background: #CC5252;"'; statusText='не в сети'}
    else if(data._status == 1){color='style="background: #4FB93E;"'; statusText='в сети/подключён'}
    else if(data._status == 2){color='style="background: #EBC747;"'; statusText='в сети'}
    else{statusText = 'undefined'}
  }catch(e){
    statusText = 'undefined'
  }
  try{
      if(data._name.lenght != 0){
        name = data._name
      }
      else{
        name = 'null'
      }
  } catch(e){
    name = 'undefined'
  }
  try{
    if(data._description.lenght != 0){
      description = data._description
    }
    else{
      description = 'null'
    }
  } catch(e){
    description = 'undefined'
  }
  // Описание устройства
  document.getElementById('view_list_item').innerHTML = `
  <div class="view_list_item_start_end_btn">
    <button type="button" class="view_list_item_end_btn">END</button>
    <button class="view_list_item_start_btn">START</button>
  </div>
  <div class="item_status_light item_view_status_light_device" `+color+`></div>
  <div class="item_descriptions item_descriptions_view">
    <div class="item_descriptions_text item_descriptions_text--device">Имя:
      <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">`+name+`</span>
    </div>
    <div class="item_descriptions_text item_descriptions_text--device">Статус:
      <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">`+statusText+`</span>
    </div>
    <div class="item_descriptions_text item_view_descriptions_text">Описание:
      <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">`+description+`</span>
    </div>
  </div>`
  DeviceView(IdElement, device)
}
// Функция поиска
function Search(searchObjArray, searchId){
  SearchDataPublications = new ArrayPublicationsSMS()
  let searchText = document.getElementById(searchId).value
  if(searchText.length != 0){
    SearchDataPublications.publications = DataDevice._devices[IdElement]._publications.Search(searchText)._publications
    if(SearchDataPublications != null){
      DataDevice.Sort('time', 'increasing')
      PrintOnWindow(SearchDataPublications._publications)
    }
    else {
      PrintOnWindow(DataDevice._devices[IdElement]._publications._publications)
    }
  }
  else{
    SearchDataPublications = undefined
    PrintOnWindow(DataDevice._devices[IdElement]._publications._publications)
  }
}

// Функция показа сортировки
function SortContentView(id){
  if(document.getElementById(id).className == 'search_flag active'){
    document.getElementById(id).style.display = null
    document.getElementById(id).className = 'search_flag'
  }
  else{
    document.getElementById(id).style.display = 'block'
    document.getElementById(id).className += ' active'
  }
}

// Проверка флагов сортировки на сайте
function FlagStatusChek(searchObjArray, searchId, area){
  try {
    let masFlag = document.getElementsByClassName('flag_status '+area)
    for(let i in masFlag){
      if(masFlag[i].type == "radio" && masFlag[i].checked){
        flagStatus_content = masFlag[i].value
        Search(searchObjArray, searchId)
      }
    }
  } catch (e) {
      alert('Ошибка '+ e.name + ':' + e.message + '\n\n' + 'Ошибка при сортировке')
  }
}
/*Отчистка текста*/
function ClearText(){
  document.getElementById('sendText').value = null
}
function SendSMSBg(){
  document.getElementById('recipient_value').style.background = null;
  document.getElementById('sendTime').style.background = null;
  document.getElementById('sendTimeEnd').style.background = null;
  document.getElementById('sendName').style.background = null;
  document.getElementById('sendText').style.background = null;
}
function SendSMSValue(){
  document.getElementById('status_sms').style.visibility=null
  document.getElementById('recipient_value').value = null;
  document.getElementById('sendTime').value = null;
  document.getElementById('sendTimeEnd').value = null;
  document.getElementById('sendName').value = null;
  document.getElementById('sendText').value = null;
}
