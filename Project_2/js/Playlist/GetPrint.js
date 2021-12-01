var Data
let NewPlaylist = {
  status,
  item: [],
  name: "",
  description: ""
}

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
      color = '<div class="playlist playlist-red" onclick="PlaylistView('+data.playlist[i].id+')">'
      verification = 'Не допущено'
    }
    else if(data.playlist[i].status == 1){
      color = '<div class="playlist playlist-green" onclick="PlaylistView('+data.playlist[i].id+')">'
      verification = 'Допущено'
    }
    else if(data.playlist[i].status == 2){
      color = '<div class="playlist playlist-yellow" onclick="PlaylistView('+data.playlist[i].id+')">'
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

  for(let i in NewPlaylist.item){
    for(let j in data){
      if(NewPlaylist.item[i].id == data[j].id){
        document.getElementById('playlist_content_container').innerHTML += '<div class="playlist_content_item"><div class="playlist_content_item_title">'+data[j].name+'</div><div class="playlist_content_item_description">'+data[j].content+'</div><button type="button" name="button" class="playlist_content_item_dell_btn" onclick="DellContent('+null+','+data[j].id+')">→</button></div>'
      }
    }
  }

  for(let i in data){
    document.getElementById('db_content_container').innerHTML += '<div class="db_content_item"><div class="db_content_item_title">'+data[i].name+'</div><div class="db_content_item_description">'+data[i].content+'</div><button type="button" name="button" class="db_content_item_add_btn" onclick="AddContent('+null+','+data[i].id+')">←</button></div>'
  }
}

function PlaylistView(id){
  data = Data
  id--
  NewPlaylist = Data.playlist[id]

  if(data.playlist[id].status == 0){
    verification = 'Не допущено'
  }
  else if(data.playlist[id].status == 1){
    verification = 'Допущено'
  }
  else if(data.playlist[id].status == 2){
    verification = 'Не проверенно'
  }

  document.getElementById('search_section').style.display='none'
  document.getElementById('section_all_playlists').style.display='none'
  document.getElementById('section_playlist_view').style.display="block"

  document.getElementById('view_title').value = data.playlist[id].name
  document.getElementById('view_status').innerHTML = verification
  document.getElementById('view_description').value = data.playlist[id].description

  document.getElementById('playlist_content_container').innerHTML = '';
  document.getElementById('db_content_container').innerHTML = '';

  for(let i in NewPlaylist.item){
    for(let j in data.content){
      if(NewPlaylist.item[i].id == data.content[j].id){
        document.getElementById('playlist_content_container').innerHTML += '<div class="playlist_content_item"><div class="playlist_content_item_title">'+data.content[j].name+'</div><div class="playlist_content_item_description">'+data.content[j].content+'</div><button type="button" name="button" class="playlist_content_item_dell_btn" onclick="DellContent('+id+','+data.content[j].id+')">→</button></div>'
      }
    }
  }
  for(let i in data.content){
    document.getElementById('db_content_container').innerHTML += '<div class="db_content_item"><div class="db_content_item_title">'+data.content[i].name+'</div><div class="db_content_item_description">'+data.content[i].content+'</div><button type="button" name="button" class="db_content_item_add_btn" onclick="AddContent('+id+','+data.content[i].id+')">←</button></div>'
  }
}

function DellContent(idPlaylist, idContent){
  let data
  if(idPlaylist==null){data = NewPlaylist.item}
  else{data = Data.playlist[idPlaylist].item}

  let newContent = [{}]
  let j = 0
  for(let i in data){
    if(data[i].id != idContent){
      newContent[j]=data[i]
      j++
    }
  }
  if(idPlaylist==null){
    NewPlaylist.item = newContent
    PlaylistAdd()
  }
  else{
    Data.playlist[idPlaylist].item = newContent
    idPlaylist++;
    PlaylistView(idPlaylist)
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
    Data.playlist[idPlaylist].item.push(newObj)
    idPlaylist++;
    PlaylistView(idPlaylist)
  }
}

function AddDeviceForPlaylist(){
  
}
