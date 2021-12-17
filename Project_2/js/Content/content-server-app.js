var Data

/*Получение контента*/
function Content(option){
  if(option == 1){url = 'http://192.168.253.9:8080/Json/ContentDeviceScoreboard.json?nocahe='+(new Date()).getTime(); device='ScoreboardDevice'}
  else if(option == 2){url = 'http://192.168.253.9:8080/Json/ContentDeviceSpeakers.json?nocahe='+(new Date()).getTime(); device='SpeakersDevice'}
  else if(option == 3){url = 'http://192.168.253.9:8080/Json/ContentDeviceSms.json?nocahe='+(new Date()).getTime(); device='SMSDevice'}
  else if(option == 4){url = 'http://192.168.253.9:8080/Json/ContentDeviceEmail.json?nocahe='+(new Date()).getTime(); device='EmailDevice'}
  Request('GET', url)
  .then(data => AllContentPrint(device, data))
  .catch(err => console.log('Ошибка получения данных из метода Content, файла "content-server-app.js: "'+err))
}
/*---Получение контента---*/

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

function SendContent(device, id=null){
  let url
    if(device == "SMSDevice"){
      url = 'http://192.168.253.9:8080/Json/ContentDeviceSms.json?nocahe='+(new Date()).getTime()
      let newContentSMS
      let test=0
      if(document.getElementById('contentSMS_name').validity.valueMissing){
        document.getElementById('contentSMS_name').style.background = '#e1817c6e'
        document.getElementById('contentSMS_name').value = 'Введите значение!!!'
      }
      else{test++}
      if(document.getElementById('contentSMS_content').validity.valueMissing){
        document.getElementById('contentSMS_content').style.background = '#e1817c6e'
        document.getElementById('contentSMS_content').value = 'Введите значение!!!'
      }
      else{test++}
      if(test == 2){
        // Было отредактировано
        if(id != null){
            newContentSMS = {
              id: id,
              name: document.getElementById('contentSMS_name').value,
              content: document.getElementById('contentSMS_content').value
            }
        }
        // Было создано
        else{
            newContentSMS = {
              name: document.getElementById('contentSMS_name').value,
              content: document.getElementById('contentSMS_content').value
            }
        }
        Request('POST', url, newContentSMS)
        .catch(err => console.log('Ошибка отправки данных из метода SendContent, файла "content-server-app.js: "'+err))
      }
    }
}
