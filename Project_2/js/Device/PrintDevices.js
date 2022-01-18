let searchText = ''  // текст для поиска
//  Устройства/каналы
function PrintDevice(device, data){
  // Покраска выбранной кнопки устройства
  document.getElementById('list_nav_SMSDevice').style.background=null
  document.getElementById('list_nav_EmailDevice').style.background=null
  document.getElementById('list_nav_SpeakersDevice').style.background=null
  document.getElementById('list_nav_ScoreboardDevice').style.background=null
  document.getElementById('status_sms').style.visibility=null
  if(device=='SMSDevice'){document.getElementById('list_nav_SMSDevice').style.background='#6e6868'}
  else if(device=='EmailDevice'){document.getElementById('list_nav_EmailDevice').style.background='#6e6868'}
  else if(device=='SpeakersDevice'){document.getElementById('list_nav_SpeakersDevice').style.background='#6e6868'}
  else if(device=='ScoreboardDevice'){document.getElementById('list_nav_ScoreboardDevice').style.background='#6e6868'}
  // Печать инструментов поиска
  document.getElementById('search_section_device').innerHTML = `
  <div class="search_module">
    <input type="text" name="" value="`+searchText+`" class="search_input" placeholder="Найти..." onkeyup="SearchDevice('`+device+`', \'DeviceSearch\')" id="DeviceSearch">
    <svg onclick="SortDeviceView(\'search_flag_device\')" class="icon_search" id="icon_search_device" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path  d="M6 11C6 10.4477 6.44772 10 7 10H41C41.5523 10 42 10.4477 42 11C42 11.5523 41.5523 12 41 12H7C6.44772 12 6 11.5523 6 11Z"/>
      <path d="M6 24C6 23.4477 6.44772 23 7 23H41C41.5523 23 42 23.4477 42 24C42 24.5523 41.5523 25 41 25H7C6.44772 25 6 24.5523 6 24Z"/>
      <path d="M6 37C6 36.4477 6.44772 36 7 36H41C41.5523 36 42 36.4477 42 37C42 37.5523 41.5523 38 41 38H7C6.44772 38 6 37.5523 6 37Z"/>
    </svg>
    <div class="rtrey"></div>
  </div>`
  // Скрывать инструменты поиска
  if(document.getElementById('ListContent').style.display!='none'){
    document.getElementById('search_section_device').style.display='block'
  }
  // Первый запуск
  if(flagStatus_device==undefined){
    document.getElementById('search_flag_device').innerHTML = `
    <div class="flag_status_container" onchange="FlagStatusChekDevice('`+device+`', 'DeviceSearch', 'flag_status_device')" style="width:160px;">
      <div class="flag_status_container_title">Статус</div>
      <div><input class="flag_status flag_status_device" type="radio" name="flag_status_device" value="status_All" id="flag_status_device_All" checked><label class="inner-label" for="flag_status_device_All">Все</label></div>
      <div><input class="flag_status flag_status_device" type="radio" name="flag_status_device" value="status_Ok" id="flag_status_device_Ok"><label class="inner-label" for="flag_status_device_Ok">В сети/подключён</label></div>
      <div><input class="flag_status flag_status_device" type="radio" name="flag_status_device" value="status_Unknow" id="flag_status_device_Unknow"><label class="inner-label" for="flag_status_device_Unknow">В сети</label></div>
      <div><input class="flag_status flag_status_device" type="radio" name="flag_status_device" value="status_No" id="flag_status_device_No"><label class="inner-label" for="flag_status_device_No">Не в сети</label></div>
    </div>`
    FlagStatusChekDevice('\''+device+'\'', 'DeviceSearch', 'flag_status_device') // Проверка сортировки
  }

  if(Reload == 1){
     Device_info(IdElement, device)
  }
  PrintDeviceList(data)
}
// Функция печати списка устройств
function PrintDeviceList(data){
  // Печать списка устройств
  document.getElementById('ListContent').innerHTML = '';
  for (let i in data){
    let color
    let statusText
    let name
    let description
    let status

    try{
      if(data[i]._status == 0){color='style="background: #f7343440;"'; statusText='не в сети'; status='status_No'}
      else if(data[i]._status == 1){color='style="background: #23ff0059;"'; statusText='в сети/подключён'; status='status_Ok'}
      else if(data[i]._status == 2){color='style="background: #f3bf056b;"'; statusText='в сети'; status='status_Unknow'}
      else{statusText = 'undefined'}
    }catch(e){
      statusText = 'undefined'
    }

    try{
      if(data[i]._name.lenght != 0){
        name = data[i]._name
      }
      else{
        name = 'null'
      }
    } catch(e){
      name = 'undefined'
    }

    try{
      if(data[i]._description.lenght != 0){
        description = data[i]._description
      }
      else{
        description = 'null'
      }
    } catch(e){
      description = 'undefined'
    }

    if(flagStatus_device == 'status_All'){
      document.getElementById('ListContent').innerHTML += '<div class="list_item item--devices" onclick="Device_info('+i+',\''+device+'\')"><div class="item_status_light--device" '+color+'"></div><div class="item_descriptions item_descriptions--device"><div class="item_descriptions_text item_descriptions_text--device">Имя: <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">'+name+'</span></div><div class="item_descriptions_text item_descriptions_text--device">Статус: <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">'+statusText+'</span></div><div class="item_descriptions_text item_descriptions_text--device">Описание: <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">'+description+'</span></div></div></div>'
    }
    else if(flagStatus_device == status){
      document.getElementById('ListContent').innerHTML += '<div class="list_item item--devices" onclick="Device_info('+i+',\''+device+'\')"><div class="item_status_light--device" '+color+'"></div><div class="item_descriptions item_descriptions--device"><div class="item_descriptions_text item_descriptions_text--device">Имя: <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">'+name+'</span></div><div class="item_descriptions_text item_descriptions_text--device">Статус: <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">'+statusText+'</span></div><div class="item_descriptions_text item_descriptions_text--device">Описание: <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">'+description+'</span></div></div></div>'
    }

  }
}
// Функция поиска
function SearchDevice(searchObjArray, searchId){
  searchText = document.getElementById(searchId).value
  if(searchObjArray == 'SMSDevice'){
    if(searchText.length != 0){
      let newData = Data.Search(searchText)
      if(newData != null){
        PrintDeviceList(newData._devices)
      }
      else{
        PrintDeviceList(Data._devices)
      }
    }
    else{
      searchText = ''
      PrintDeviceList(Data._devices)
    }
  }
}
// Функция показа сортировки
function SortDeviceView(id){
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
function FlagStatusChekDevice(searchObjArray, searchId, area){
  try {
    let masFlag = document.getElementsByClassName('flag_status '+area)
    for(let i in masFlag){
      if(masFlag[i].type == "radio" && masFlag[i].checked){
        flagStatus_device = masFlag[i].value
        SearchDevice(searchObjArray, searchId)
      }
    }
  } catch (e) {
      alert('Ошибка '+ e.name + ':' + e.message + '\n\n' + 'Ошибка при сортировке')
  }
}
