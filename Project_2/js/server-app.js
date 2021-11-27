var DeviceDataSMS;

/*СМС*/
function RequestSMS(option){
  if(option == 'GET'){
    Request(option, 'http://192.168.253.9:8080/Json/SMS_1.json')
    .then(data => PrintDevice(data, 'SMSTable'))
    .catch(err => console.log(err))
  }
  else if(option == 'POST'){
    Request(option, 'http://localhost:8080/Json/SMS_1.json')
    .then(data => PrintDevice(data, 'SMSTable'))
    .catch(err => console.log(err))
  }
}
/*---СМС---*/
function Devices(option){
  if(option == 1){url = 'http://192.168.253.9:8080/Json/ScoreboardDevice.json'}
  else if(option == 2){url = 'http://192.168.253.9:8080/Json/SpeakersDevice.json'}
  else if(option == 3){url = 'http://192.168.253.9:8080/Json/SMSDevice.json'}
  else if(option == 4){url = 'http://192.168.253.9:8080/Json/EmailDevice.json'}
  Request('GET', url)
  .then(data => PrintDevice(data, 'SMSDevice'))
  .catch(err => console.log(err))
  //RequestSMS('GET')
}
/// Получение - Отправка данных
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

  /*Устройства/каналы*/
  function PrintDevice(data, option){
    if(option == 'SMSDevice'){
        DeviceDataSMS = data
        document.getElementById('ListContent').innerHTML = '';
        for (let i in data){
          document.getElementById('ListContent').innerHTML += '<div class="list_item item--devices" onclick="Device_info('+i+')"><div class="item_status_light item_status_light--device" style="background:'+data[i].status+'"></div><div class="item_descriptions item_descriptions--device"><div class="item_descriptions_text item_descriptions_text--device">Имя: <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">'+data[i].name+'</span></div><div class="item_descriptions_text item_descriptions_text--device">Статус: <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">'+data[i].statusText+'</span></div><div class="item_descriptions_text item_descriptions_text--device">Описание: <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">'+data[i].description+'</span></div></div></div>'
        }
    }
  }
  /*------Устройства/каналы--------*/
