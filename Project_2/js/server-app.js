var DeviceDataSMS;
var DeviceDataEmail;
var DeviceDataSpeakers;
var DeviceDataScoreboard;

/*Ввод и получение каналов*/
function Devices(option){
  if(option == 1){url = 'http://192.168.253.9:8080/Json/ScoreboardDevice.json?nocahe='+(new Date()).getTime(); device='ScoreboardDevice'}
  else if(option == 2){url = 'http://192.168.253.9:8080/Json/SpeakersDevice.json?nocahe='+(new Date()).getTime(); device='SpeakersDevice'}
  else if(option == 3){url = 'http://192.168.253.9:8080/Json/SMSDevice.json?nocahe='+(new Date()).getTime(); device='SMSDevice'}
  else if(option == 4){url = 'http://192.168.253.9:8080/Json/EmailDevice.json?nocahe='+(new Date()).getTime(); device='EmailDevice'}
  Request('GET', url)
  .then(data => Data(data, device))
  .catch(err => console.log(err))
}
/*---Вывод и получение каналов---*/

/*Занесение данных из базы*/
function Data(data, device){
  if(device == 'SMSDevice'){
    DeviceDataSMS = data
    PrintDevice(device)
  }
  else if(device == 'EmailDevice'){
    DeviceDataEmail = data
    PrintDevice(device)
  }
  else if(device == 'SpeakersDevice'){
    DeviceDataSpeakers = data
    PrintDevice(device)
  }
  else if(device == 'ScoreboardDevice'){
    DeviceDataScoreboard = data
    PrintDevice(device)
  }
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

/*Отправка сообщения*/
function SendMassege(device){
  let body;
  let date = new Date();
  if(device == 'SMSDevice'){
    url = 'http://192.168.253.9:8080/Json/SmsMessage.json'
    body = {
        idDevice: IdElement,
        name: document.getElementById('sendName').value,
        date:{
            year: date.getUTCFullYear(),
            month: date.getUTCMonth()+1,
            day: date.getUTCDate(),
            time: document.getElementById('sendTime').value,
            timeOut: document.getElementById('sendTimeEnd').value,
            triger: document.getElementById('sendTriger').value
        },
        group: document.getElementById('sendGroup').value,
        recipient: document.getElementById('sendTelephon').value,
        content: document.getElementById('sendText').value,
        status: 2
    };
    Request('POST', url, body)
    document.getElementById('sendName').value=null;
    document.getElementById('sendTimeEnd').value=null;
    document.getElementById('sendTriger').value=null;
    document.getElementById('sendGroup').value=null;
    document.getElementById('sendTelephon').value=null;
    document.getElementById('sendText').value=null;
  }
}
/*---Отправка сообщения---*/
