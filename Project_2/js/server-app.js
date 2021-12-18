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
function SendMassege(device, option){
  let url
  let test=0;
  let body
  let date = new Date();
  if(device == 'SMSDevice'){
    url = 'http://192.168.253.9:8080/Json/SmsMessage.json'
    // Проверка на заполненность текста сообщения
    if(document.getElementById('sendText').validity.valueMissing){
      document.getElementById('sendText').style.background = '#e1817c6e'
      document.getElementById('sendText').placeholder = 'Введите текст!!!'
    }else{test++}
    // Проверка на заполненность имя сообщения
    if(document.getElementById('sendName').validity.valueMissing){
      document.getElementById('sendName').style.background = '#e1817c6e'
      document.getElementById('sendName').placeholder = 'Введите имя!!!'
    }else{test++}
    // Сохранение сообщения в базе как контент
    if(test == 2 && option == 'save'){
      body = {
        name: document.getElementById('sendName').value,
        content: document.getElementById('sendText').value
      }
      Request('POST', url, body)
    }
    // Отправка сообщения как публикацию
    else if(test == 2 && option == 'send'){
      // Проверка на заполненность группы, телефона сообщения
      if((document.getElementById('sendGroup').validity.valueMissing && document.getElementById('sendTelephon').validity.valueMissing) || document.getElementById('sendTelephon').value.length != 11){
        if(document.getElementById('sendGroup').validity.valueMissing){
          document.getElementById('sendGroup').style.background = '#e1817c6e'
        }
        if(document.getElementById('sendTelephon').validity.valueMissing || document.getElementById('sendTelephon').value.length != 11){
          document.getElementById('sendTelephon').style.background = '#e1817c6e'
        }
      }else{test++}
      // Проверка на заполненность времени отправки, ограничение времени отправки и тригера сообщения
      if(document.getElementById('sendTime').validity.valueMissing && document.getElementById('sendTimeEnd').validity.valueMissing && document.getElementById('sendTriger').validity.valueMissing){
        if(document.getElementById('sendTime').validity.valueMissing){
          document.getElementById('sendTime').style.background = '#e1817c6e'
        }
        if(document.getElementById('sendTimeEnd').validity.valueMissing){
          document.getElementById('sendTimeEnd').style.background = '#e1817c6e'
        }
        if(document.getElementById('sendTriger').validity.valueMissing){
          document.getElementById('sendTriger').style.background = '#e1817c6e'
        }
      }else{test++}
      if(test == 4){
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
        }
        Request('POST', url, body)
      }
    }
  }
}
/*---Отправка сообщения---*/

/*Валидация сообщений СМС*/
if(document.getElementById('sendTelephon')){
  /*Валидация номера телефона*/
  document.getElementById('sendTelephon').addEventListener('keyup', function(){
      this.value = this.value.replace(/[^\d]/g, '').substr(0,11);
  })
  /*Обработка активности полей при вводе*/
  document.getElementById('sendTelephon').addEventListener('keyup', function(){
    if(!document.getElementById('sendTelephon').validity.valueMissing){
      document.getElementById('sendGroup').readOnly = true
      document.getElementById('sendGroup').style.background = '#f5f5f5a3'
    }
    else{
      document.getElementById('sendGroup').style.background = null
      document.getElementById('sendGroup').readOnly = false
    }
  })
  document.getElementById('sendGroup').addEventListener('keyup', function(){
    if(!document.getElementById('sendGroup').validity.valueMissing){
      document.getElementById('sendTelephon').readOnly = true
      document.getElementById('sendTelephon').style.background = '#f5f5f5a3'
    }
    else{
      document.getElementById('sendTelephon').style.background = null
      document.getElementById('sendTelephon').readOnly = false
    }
  })
  document.getElementById('sendTime').addEventListener('keyup', SendTime())
  function SendTime(){
    if(!document.getElementById('sendTime').validity.valueMissing){
      document.getElementById('sendTriger').readOnly = true
      document.getElementById('sendTriger').style.background = '#f5f5f5a3'
    }
    else{
      document.getElementById('sendTriger').style.background = null
      document.getElementById('sendTriger').readOnly = false
    }
  }
  document.getElementById('sendTriger').addEventListener('keyup', function(){
    if(!document.getElementById('sendTriger').validity.valueMissing){
      document.getElementById('sendTime').readOnly = true
      document.getElementById('sendTime').style.background = '#f5f5f5a3'
    }
    else{
      document.getElementById('sendTime').style.background = null
      document.getElementById('sendTime').readOnly = false
    }
  })
}
