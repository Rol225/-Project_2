var Data
let idconst
let NewPlaylist = {
  status,
  item: [],
  name: "",
  description: ""
}
var Devices = [{}]


function AllPlaylistsPrint(device, data){
  Data = data
  NewPlaylist = {
    status,
    item: [],
    name: "",
    description: ""
  }
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
  document.getElementById('search_section').innerHTML = '<div class="search_module"><input type="text" name="" value="" class="search_input" placeholder="Найти..."><div class="rtrey"></div></div><div class="search_device">'+deviceText+'</div>'


  document.getElementById('list_playlist').innerHTML = '<div class="playlist playlist-add" onclick="PlaylistAdd()"><button type="button" name="button" id="" class="playlist_add">+</button></div>';
  for (let i in data.playlist){
    let color;
    let verification
    if(data.playlist[i].status == 0){
      color = '<div class="playlist playlist-red" onclick="PlaylistView('+data.playlist[i].id+', 1)">'
      verification = 'Не допущено'
    }
    else if(data.playlist[i].status == 1){
      color = '<div class="playlist playlist-green" onclick="PlaylistView('+data.playlist[i].id+', 1)">'
      verification = 'Допущено'
    }
    else if(data.playlist[i].status == 2){
      color = '<div class="playlist playlist-yellow" onclick="PlaylistView('+data.playlist[i].id+', 1)">'
      verification = 'Не проверенно'
    }
    document.getElementById('list_playlist').innerHTML += color+'<div class="playlist_title">'+data.playlist[i].name+'</div><div class="playlist_verification">'+verification+'</div><div class="playlist_description"><span class="playlist_description_static">Описание: </span><span class="playlist_description_text">'+data.playlist[i].description+'</span></div></div>';
  }

}

function PlaylistAdd(){
  data = Data.content

  NewPlaylist.status = 2

  document.getElementById('search_section').style.display='none'
  document.getElementById('section_all_playlists').style.display='none'
  document.getElementById('section_playlist_view').style.display="block"

  document.getElementById('view_status').innerHTML = 'Не проверенно/На этапе создания'
  document.getElementById('playlist_content_container').innerHTML = '';
  document.getElementById('db_content_container').innerHTML = '';

  PrintContent(null, data)
}

function PlaylistView(id, mod){
  data = Data.content
  idconst = id
  if(mod == 1){
    Devices = []
    for(let i in Data.playlist){
      if(id ==  Data.playlist[i].id){
        NewPlaylist = Data.playlist[i]
      }
    }
    if(NewPlaylist.status == 0){
      verification = 'Не допущено'
    }
    else if(NewPlaylist.status == 1){
      verification = 'Допущено'
    }
    else if(NewPlaylist.status == 2){
      verification = 'Не проверенно'
    }

    document.getElementById('search_section').style.display='none'
    document.getElementById('section_all_playlists').style.display='none'
    document.getElementById('section_playlist_view').style.display="block"

    document.getElementById('view_title').value = NewPlaylist.name
    document.getElementById('view_status').innerHTML = verification
    document.getElementById('view_description').value = NewPlaylist.description
  }

  document.getElementById('all_content').style.display='block'
  document.getElementById('all_device').style.display='none'
  document.getElementById('save_send').innerHTML='<button type="button" class="save_send_btn" name="button" onclick="PlaylistSend(1)">Сохранить изменения</button>'
  document.getElementById('save_send').innerHTML+='<button type="button" class="save_send_btn" name="button" onclick="DeviceForPlaylist()">Назначить исполнителя</button>'
  document.getElementById('playlist_content_container').innerHTML = '';
  document.getElementById('db_content_container').innerHTML = '';


  PrintContent(id, data)
}

function PrintContent(id, data){
  for(let i in NewPlaylist.item){
    for(let j in data){
      if(NewPlaylist.item[i].id == data[j].id){
        document.getElementById('playlist_content_container').innerHTML += '<div class="playlist_content_item"><div class="playlist_content_item_title">'+data[j].name+'</div><div class="playlist_content_item_description">'+data[j].content+'</div><button type="button" name="button" class="playlist_content_item_dell_btn" onclick="DellContent('+id+','+i+')">→</button></div>'
      }
    }
  }
  for(let i in data){
    document.getElementById('db_content_container').innerHTML += '<div class="db_content_item"><div class="db_content_item_title">'+data[i].name+'</div><div class="db_content_item_description">'+data[i].content+'</div><button type="button" name="button" class="db_content_item_add_btn" onclick="AddContent('+id+','+data[i].id+')">←</button></div>'
  }
}

function DellContent(idPlaylist, idContent){
  let data = NewPlaylist.item

  let newContent = [{}]
  let j = 0
  for(let i in data){
    if(i != idContent){
      newContent[j]=data[i]
      j++
    }
  }
  if(idPlaylist==null){
    NewPlaylist.item = newContent
    PlaylistAdd()
  }
  else{
    NewPlaylist.item = newContent
    PlaylistView(idPlaylist, 2)
  }
}

function AddContent(idPlaylist, idContent){

  let newObj = {}
  for(let i in Data.content){
    if(Data.content[i].id == idContent){
      newObj.id = Data.content[i].id
    }
  }
  if(idPlaylist == null){
    NewPlaylist.item.push(newObj)
    PlaylistAdd()
  }
  else{
    NewPlaylist.item.push(newObj)
    PlaylistView(idPlaylist, 2)
  }
}

function DeviceForPlaylist(){
  data = Data.device

  document.getElementById('all_content').style.display='none'
  document.getElementById('all_device').style.display='block'

  document.getElementById('save_send').innerHTML='<button type="button" class="save_send_btn" name="button" onclick="PlaylistSend(2)">Отправить</button>'
  document.getElementById('save_send').innerHTML+='<button type="button" class="save_send_btn" name="button" onclick="PlaylistView('+idconst+', 2)">Редактирование контента</button>';

  document.getElementById('playlist_device_container').innerHTML='';
  document.getElementById('db_device_container').innerHTML='';

  PrintDevice(data)
}

function PrintDevice(data){
  for(let i in Devices){
    for(let j in data){
      if(Devices[i].id == data[j].id){
        document.getElementById('playlist_device_container').innerHTML += '<div class="playlist_device_item"><div class="playlist_device_item_title">'+data[j].name+'</div><div class="playlist_device_item_description">'+data[j].description+'</div><button type="button" name="button" class="playlist_device_item_dell_btn" onclick="DellDevice('+i+')">→</button><input type="time" name="" value="'+Devices[i].time_start+'" class="device_time" readonly></div>'
      }
    }
  }
  for(let i in data){
    document.getElementById('db_device_container').innerHTML += '<div class="db_device_item"><div class="db_device_item_title">'+data[i].name+'</div><div class="db_device_item_description">'+data[i].description+'</div><button type="button" name="button" class="db_device_item_add_btn" onclick="AddDevice('+data[i].id+')">←</button><input type="time" name="" value="" class="device_time" id="time_'+data[i].id+'"></div>'
  }
}

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

function AddDevice(idContent){
  let newObj = {}
  for(let i in Data.device){
    if(Data.device[i].id == idContent){
      newObj.id = Data.device[i].id
    }
  }
  newObj.time_start = document.getElementById('time_'+idContent).value
  Devices.push(newObj)

  DeviceForPlaylist()
}
