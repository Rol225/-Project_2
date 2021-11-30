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

/*Занесение данных из базы*/
function Data(data, device){
  if(device == 'SMSDevice'){
    PlaylistDataSMS = data
  }
  else if(device == 'EmailDevice'){
    PlaylistDataEmail = data
  }
  else if(device == 'SpeakersDevice'){
    PlaylistDataSpeakers = data
  }
  else if(device == 'ScoreboardDevice'){
    PlaylistDataScoreboard = data
  }
  AllPlaylistsPrint(device, data)
}
/*---Занесение данных из базы---*/

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
