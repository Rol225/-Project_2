var PlaylistDataSMS;
var PlaylistDataEmail;
var PlaylistDataSpeakers;
var PlaylistDataScoreboard;
var DataContent
var DataDevice
let dataUrl = new DataURL()
var Devices
var NewPlaylist

/*Ввод и получение плейлистов*/
function PlaylistURL(option){
  let url
  if(option == 1){url = dataUrl._ScoreboardPlaylistGet; device='ScoreboardDevice'}
  else if(option == 2){url = dataUrl._SpeakersPlaylistGet; device='SpeakersDevice'}
  else if(option == 3){url = dataUrl._SMSPlaylistGet; device='SMSDevice'}
  else if(option == 4){url = dataUrl._EmailPlaylistGet; device='EmailDevice'}
  Request('GET', url)
  .then(data => DataSet(device, data))
  .catch(err => console.log(err))
}
/*---Ввод и получение плейлистов---*/
// Установка данных
function DataSet(device, data){
  Devices = []
  NewPlaylist = undefined
  if(device=='SMSDevice'){
    PlaylistDataSMS = new ArrayPlaylist()
    let playlist
    for(let i in data.playlist){
      playlist = new Playlist(data.playlist[i].id, data.playlist[i].name, data.playlist[i].description, data.playlist[i].status, data.playlist[i].content)
      PlaylistDataSMS._playlists.push(playlist)
    }
    DataContent = new ArrayContentSMS()
    let content
    for(let i in data.content){
      content = new ContentSMS(data.content[i].id, data.content[i].name, undefined, data.content[i].status, data.content[i].content)
      DataContent._contents.push(content)
    }
    DataDevice = new ArrayDevices()
    let device
    for(let i in data.device){
      device = new Device(data.device[i].id, data.device[i].name, data.device[i].description, undefined, undefined)
      DataDevice._devices.push(device)
    }
  }

  AllPlaylistsPrint(device, PlaylistDataSMS)
}
/*Получение - Отправка данных*/
function Request(method, url, body = null){
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.responseType = 'json';
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = () => {
        if(xhr.status >= 400) {
          reject(xhr.response);
        }
        else {
          resolve(xhr.response);
        }
      }
      xhr.onerror = () => {
        reject(xhr.response);
      }

      xhr.send(JSON.stringify(body));
    });
  }
/*---Получение - Отправка данных---*/

// Отправка плейлиста
function PlaylistSend(option){
  let test = 0
  NewPlaylist.name = document.getElementById('view_title').value
  NewPlaylist.description = document.getElementById('view_description').value

  test += Validation('text', NewPlaylist.name)
  test += Validation('text', NewPlaylist.description)
  test += Validation('array', NewPlaylist.content)

  if(option == 1 || option == 3){
    if(test==3){
      document.getElementById('status_playlist_send').style.visibility='visible'
      if(option == 3){NewPlaylist.id = null}
      //console.log(NewPlaylist)
      Request('POST', dataUrl._SMSPlaylistPost, NewPlaylist)
          .catch(err => console.log('Error send plylist:\n'+err.name + '\n'+  err.message))
    }
    else{
      console.log('Ошибка не заполненно поле')
    }
  }
  else if(option == 2){
    test += Validation('array', Devices)
    if(test==4){
      let NewPlaylistMod_2={
        name: NewPlaylist.name,
        description: NewPlaylist.description,
        content: NewPlaylist.content,
        devices: Devices
      }
      //console.log(NewPlaylistMod_2)
      document.getElementById('status_playlist_send').style.visibility='visible'
      Request('POST', dataUrl._SMSPlaylistPost, NewPlaylistMod_2)
          .catch(err => console.log('Error send plylist:\n'+err.name + '\n'+  err.message))
    }
    else{
      console.log('Ошибка не заполненно поле')
    }
  }

}

function Validation(input, field){
  let test = 1
  if(input == 'text'){
    field = field.replace(/\s+/g, '');
    if(field == ''){test=0}
  }
  else if(input == 'array'){
    if(field.length <= 0){test=0}
  }
  return test
}
