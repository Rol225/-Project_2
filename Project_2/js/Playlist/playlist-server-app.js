var PlaylistDataSMS;
var PlaylistDataEmail;
var PlaylistDataSpeakers;
var PlaylistDataScoreboard;

/*Ввод и получение плейлистов*/
function Playlist(option){
  if(option == 1){url = 'http://192.168.253.9:8080/Json/PlaylistDeviceScoreboard.json?nocahe='+(new Date()).getTime(); device='ScoreboardDevice'}
  else if(option == 2){url = 'http://192.168.253.9:8080/Json/PlaylistDeviceSpeakers.json?nocahe='+(new Date()).getTime(); device='SpeakersDevice'}
  else if(option == 3){url = 'http://192.168.253.9:8080/Json/PlaylistDeviceSms.json?nocahe='+(new Date()).getTime(); device='SMSDevice'}
  else if(option == 4){url = 'http://192.168.253.9:8080/Json/PlaylistDeviceEmail.json?nocahe='+(new Date()).getTime(); device='EmailDevice'}
  Request('GET', url)
  .then(data => AllPlaylistsPrint(device, data))
  .catch(err => console.log(err))
}
/*---Ввод и получение плейлистов---*/

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

function PlaylistSend(option){
  let test = 0
  NewPlaylist.name = document.getElementById('view_title').value
  NewPlaylist.description = document.getElementById('view_description').value

  test += Validation('text', NewPlaylist.name)
  test += Validation('text', NewPlaylist.description)
  test += Validation('array', NewPlaylist.item)

  if(option == 1){
    if(test==3){
      console.log(NewPlaylist)
      Request('POST', 'http://192.168.253.9:8080/Json/PlaylistDeviceSms.json', NewPlaylist)
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
        item: NewPlaylist.item,
        devices: Devices
      }
      console.log(NewPlaylist)
      Request('POST', 'http://192.168.253.9:8080/Json/PlaylistDeviceSms.json', NewPlaylistMod_2)
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
    if(field.length == 1){test=0}
  }
  return test
}
