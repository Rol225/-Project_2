var Data            // Данные из бд
let searchText = ''      // Текст для поиска
let idconst
let flagStatus          // Флаги сортировки


// Функция показа всех плейлистов
function AllPlaylistsPrint(device, data){

  document.getElementById('view_title').value = null
  document.getElementById('view_status').innerHTML = null
  document.getElementById('view_description').value = null

  document.getElementById('search_section').style.display='flex'
  document.getElementById('section_all_playlists').style.display='block'
  document.getElementById('section_playlist_view').style.display="none"

  let deviceText
  if(device == 'SMSDevice'){deviceText='СМС'}
  if(device == 'EmailDevice'){deviceText='E-mail'}
  if(device == 'SpeakersDevice'){deviceText='Динамики'}
  if(device == 'ScoreboardDevice'){deviceText='Табло'}
  document.getElementById('search_section').innerHTML = '<div class="search_module"><input type="text" name="" value="'+searchText+'" class="search_input" placeholder="Найти..." onkeyup="Search(\'playlistSMS\', \'playlistSearch\')" id="playlistSearch"><svg onclick="SortPlaylistView()" class="icon_search" id="icon_search_playlist" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path  d="M6 11C6 10.4477 6.44772 10 7 10H41C41.5523 10 42 10.4477 42 11C42 11.5523 41.5523 12 41 12H7C6.44772 12 6 11.5523 6 11Z"/><path d="M6 24C6 23.4477 6.44772 23 7 23H41C41.5523 23 42 23.4477 42 24C42 24.5523 41.5523 25 41 25H7C6.44772 25 6 24.5523 6 24Z"/><path d="M6 37C6 36.4477 6.44772 36 7 36H41C41.5523 36 42 36.4477 42 37C42 37.5523 41.5523 38 41 38H7C6.44772 38 6 37.5523 6 37Z"/></svg><div class="rtrey"></div></div><div class="search_device">'+deviceText+'</div>'

  if(flagStatus==undefined){
    FlagStatusChek('playlistSMS', 'playlistSearch') // Проверка сортировки
  }

  PlaylistItemPrint(data)
}
// Функция печати плейлиста
function PlaylistItemPrint(data){
  try{
    data.Sort('name', 'increasing')
    data = data._playlists
    document.getElementById('list_playlist').innerHTML = '<div class="playlist playlist-add" onclick="PlaylistAdd()"><button type="button" name="button" id="" class="playlist_add">+</button></div>';
    for (let i in data){
      let color;
      let verification
      let name
      let description
      let status      // Для сортировки

      // Проверка верефикации плейлиста
      try{
        if(data[i].status == 0){
          color = '<div class="playlist playlist-red"'
          verification = 'Не допущено'
          status = 'status_No'
        }
        else if(data[i].status == 1){
          color = '<div class="playlist playlist-green"'
          verification = 'Допущено'
          status = 'status_Ok'
        }
        else if(data[i].status == 2){
          color = '<div class="playlist playlist-yellow"'
          verification = 'Не проверенно'
          status = 'status_Unknow'
        }
        else{
          color = '<div class="playlist"'
          verification = 'null'
          status = 'null'
        }
      }catch(e){
        verification = 'undefined'
        status = 'undefined'
      }

      // Проверка id плейлиста
      try{
        if(data[i].id.lenght != 0){
          color += 'onclick="PlaylistView('+data[i].id+', 1)"'
        }
      }catch(e){
        //alert('Ошибка '+ e.name + ':' + e.message + '\n\n' + 'Отсутствует поле объекта! Отсутствует "playlist.id"')
      }

      // Проверка name плейлиста
      try{
        if(data[i].name.lenght != 0){
          name = data[i].name;
        }
        else{
          name = 'null'
        }
      }catch(e){
        name = 'undefined'
      }

      // Проверка description плейлиста
      try{
        if(data[i].description.length != 0){
          description = data[i].description;
        }
        else{
          description = 'null'
        }
      }catch(e){
        description = 'undefined'
      }

      if(flagStatus == 'status_All'){
        document.getElementById('list_playlist').innerHTML += color+'><div class="playlist_title">'+name+'</div><div class="playlist_verification">'+verification+'</div><div class="playlist_description"><span class="playlist_description_static">Описание: </span><span class="playlist_description_text">'+description+'</span></div></div>';
      }
      else if(flagStatus == status){
        document.getElementById('list_playlist').innerHTML += color+'><div class="playlist_title">'+name+'</div><div class="playlist_verification">'+verification+'</div><div class="playlist_description"><span class="playlist_description_static">Описание: </span><span class="playlist_description_text">'+description+'</span></div></div>';
      }
    }
  }catch(e){
    alert('Ошибка '+ e.name + ':' + e.message + '\n\n' + 'Ошибка в поле playlist')
  }
}
// Функция добавления плейлиста
function PlaylistAdd(){
  document.getElementById('status_playlist_send').style.visibility=null
  NewPlaylist = new Playlist(undefined, undefined, undefined, 2, [])
  searchText = ''
  NewPlaylist.status = 2

  document.getElementById('search_section').style.display='none'
  document.getElementById('section_all_playlists').style.display='none'
  document.getElementById('section_playlist_view').style.display="block"

  document.getElementById('view_status').innerHTML = 'Не проверенно/На этапе создания'

  document.getElementById('save_send').innerHTML='<button type="button" class="save_send_btn" name="button" onclick="PlaylistSend(3)">Сохранить плейлист</button>'
  document.getElementById('status_playlist_send').style.visibility=null

  PrintContent(null, DataContent)
}
// Функция показа плейлиста
function PlaylistView(id, mod){
  document.getElementById('status_playlist_send').style.visibility=null
  if(id != 'undefined'){
    searchText = ''
    idconst = id
    if(mod == 1){
      Devices = []
      for(let i in PlaylistDataSMS._playlists){
        if(id ==  PlaylistDataSMS._playlists[i].id){
          NewPlaylist = PlaylistDataSMS._playlists[i]
        }
      }
      if(NewPlaylist._status == 0){
        verification = 'Не допущено'
      }
      else if(NewPlaylist._status == 1){
        verification = 'Допущено'
      }
      else if(NewPlaylist._status == 2){
        verification = 'Не проверенно'
      }

      document.getElementById('search_section').style.display='none'
      document.getElementById('section_all_playlists').style.display='none'
      document.getElementById('section_playlist_view').style.display="block"

      document.getElementById('view_title').value = NewPlaylist._name
      document.getElementById('view_status').innerHTML = verification
      document.getElementById('view_description').value = NewPlaylist._description
    }

    document.getElementById('all_content').style.display='block'
    document.getElementById('all_device').style.display='none'
    document.getElementById('save_send').innerHTML='<button type="button" class="save_send_btn" name="button" onclick="PlaylistSend(1)">Сохранить изменения</button>'
    document.getElementById('save_send').innerHTML+='<button type="button" class="save_send_btn" name="button" onclick="DeviceForPlaylist()">Назначить исполнителя</button>'
    document.getElementById('status_playlist_send').style.visibility=null

    PrintContent(id)
  }
}
// Функция печати контента
function PrintContent(id){
  document.getElementById('playlist_content_container').innerHTML = '';
  document.getElementById('db_content_container').innerHTML = '';
  for(let i in NewPlaylist._content){
    for(let j in DataContent._contents){
      if(NewPlaylist._content[i].id == DataContent._contents[j]._id){
        document.getElementById('playlist_content_container').innerHTML += '<div class="playlist_content_item"><div class="playlist_content_item_title">'+DataContent._contents[j]._name+'</div><div class="playlist_content_item_description">'+DataContent._contents[j]._content+'</div><button type="button" name="button" class="playlist_content_item_dell_btn" onclick="DellContent('+id+','+i+')">→</button></div>'
      }
    }
  }
  for(let i in DataContent._contents){
    document.getElementById('db_content_container').innerHTML += '<div class="db_content_item"><div class="db_content_item_title">'+DataContent._contents[i]._name+'</div><div class="db_content_item_description">'+DataContent._contents[i]._content+'</div><button type="button" name="button" class="db_content_item_add_btn" onclick="AddContent('+id+','+DataContent._contents[i]._id+')">←</button></div>'
  }
}
// Функция удаления контента
function DellContent(idPlaylist, idContent){
  NewPlaylist._content = NewPlaylist.DellContent(idContent)
  PrintContent(idPlaylist)
}
// Добаление контента в плейлист
function AddContent(idPlaylist, idContent){
  document.getElementById('status_playlist_send').style.visibility=null
  NewPlaylist.AddContent(idContent)
  PrintContent(idPlaylist)
}
// Функция назначения устройств
function DeviceForPlaylist(){
  try{
    document.getElementById('all_content').style.display='none'
    document.getElementById('all_device').style.display='block'

    document.getElementById('save_send').innerHTML='<button type="button" class="save_send_btn" name="button" onclick="PlaylistSend(2)">Отправить</button>'
    document.getElementById('save_send').innerHTML+='<button type="button" class="save_send_btn" name="button" onclick="PlaylistView('+idconst+', 2)">Редактирование контента</button>';

    document.getElementById('status_playlist_send').style.visibility=null

    PrintDevice(DataDevice._devices)
  }catch(e){
    alert('Ошибка '+ e.name + ':' + e.message + '\n\n' + ' Ошибка поля объекта device!')
  }
}
// печать устроиств
function PrintDevice(data){
  try{
    document.getElementById('playlist_device_container').innerHTML='';
    document.getElementById('db_device_container').innerHTML='';
    for(let i in Devices){
      for(let j in data){
        if(Devices[i].id == data[j]._id){
          document.getElementById('playlist_device_container').innerHTML += '<div class="playlist_device_item"><div class="playlist_device_item_title">'+data[j].name+'</div><div class="playlist_device_item_description">'+data[j].description+'</div><button type="button" name="button" class="playlist_device_item_dell_btn" onclick="DellDevice('+i+')">→</button><input type="time" name="" value="'+Devices[i].time_start+'" class="device_time" readonly></div>'
        }
      }
    }
    for(let i in data){
      let name
      let description
      let id
      // Проверка id устройства
      try{
        if(data[i].id.lenght != 0){
          id = data[i].id
        }
      }catch(e){
        //alert('Ошибка '+ e.name + ':' + e.message + '\n\n' + 'Отсутствует поле объекта! Отсутствует "playlist.id"')
      }

      // Проверка name устройства
      try{
        if(data[i].name.lenght != 0){
          name = data[i].name;
        }
        else{
          name = 'null'
        }
      }catch(e){
        name = 'undefined'
      }

      // Проверка description устройства
      try{
        if(data[i].description.length != 0){
          description = data[i].description;
        }
        else{
          description = 'null'
        }
      }catch(e){
        description = 'undefined'
      }

      document.getElementById('db_device_container').innerHTML += '<div class="db_device_item"><div class="db_device_item_title">'+name+'</div><div class="db_device_item_description">'+description+'</div><button type="button" name="button" class="db_device_item_add_btn" onclick="AddDevice('+id+')">←</button><input type="time" name="" value="" class="device_time" id="time_'+id+'" required></div>'
    }
  } catch(e){
    alert('Ошибка '+ e.name + ':' + e.message + '\n\n' + ' Ошибка поля объекта device!')
  }
}
// Удаление устроиств
function DellDevice(idContent){
  let data = Devices

  let newContent = []
  for(let i in data){
    if(i != idContent){
      newContent.push(data[i])
    }
  }
  Devices = newContent
  DeviceForPlaylist()
}
// Добавление устроиств
function AddDevice(idDevice){
  let test =0
  if(document.getElementById('time_'+idDevice)){
    if(!document.getElementById('time_'+idDevice).validity.valueMissing){
      test++;
    }
  }
  if(test == 1){
    let newObj = {}
    for(let i in DataDevice._devices){
      if(DataDevice._devices[i].id == idDevice){
        newObj.id = DataDevice._devices[i].id
      }
    }
    newObj.time_start = document.getElementById('time_'+idDevice).value
    Devices.push(newObj)

    DeviceForPlaylist()
  }

}
if(document.getElementById('status_playlist_send')){
  document.getElementById('view_title').addEventListener('keyup', function(){
    document.getElementById('status_playlist_send').style.visibility=null
  })
  document.getElementById('view_description').addEventListener('keyup', function(){
  document.getElementById('status_playlist_send').style.visibility=null
  })
}
// Функция поиска
function Search(searchObjArray, searchId){
  searchText = document.getElementById(searchId).value
  if(searchObjArray == 'playlistSMS'){
    if(searchText.length != 0){
      let newData = PlaylistDataSMS.Search(searchText)
      if(newData != null){
        PlaylistItemPrint(newData)
      }
      else{
        PlaylistItemPrint(PlaylistDataSMS)
      }
    }
    else{
      PlaylistItemPrint(PlaylistDataSMS)
    }
  }
}
// Функция показа сортировки
function SortPlaylistView(){
  if(document.getElementById('search_flag').className == 'search_flag active'){
    document.getElementById('search_flag').style.display = null
    document.getElementById('search_flag').className = 'search_flag'
  }
  else{
    document.getElementById('search_flag').style.display = 'block'
    document.getElementById('search_flag').className += ' active'
  }
}
// Проверка флагов сортировки на сайте
function FlagStatusChek(searchObjArray, searchId){
  try {
    let masFlag = document.getElementsByClassName('flag_status')
    for(let i in masFlag){
      if(masFlag[i].type == "radio" && masFlag[i].checked){
        flagStatus = masFlag[i].value
        Search(searchObjArray, searchId)
      }
    }
  } catch (e) {
      alert('Ошибка '+ e.name + ':' + e.message + '\n\n' + 'Ошибка при сортировке')
  }
}
