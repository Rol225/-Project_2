var Data
let dataUrl = new DataURL()
/*Получение контента*/
function ContentURL(option){
  if(option == 1){url = dataUrl._ScoreboardContentGet; device='ScoreboardDevice'}
  else if(option == 2){url = dataUrl._SpeakersContentGet; device='SpeakersDevice'}
  else if(option == 3){url = dataUrl._SMSContentGet; device='SMSDevice'}
  else if(option == 4){url = dataUrl._EmailContentGet; device='EmailDevice'}
  Request('GET', url)
  .then(data => SetData(device, data))
  .catch(err => console.log('Ошибка получения данных из метода Content, файла "content-server-app.js: "'+err))
}
/*---Получение контента---*/
// Установка даных
function SetData(device, data){
  if(device=='SMSDevice'){
    Data = new ArrayContentSMS()
    let content
    for(let i in data){
      content = new ContentSMS(data[i].id, data[i].name, undefined, data[i].status, data[i].content)
      Data.contents.push(content)
    }
  }
  AllContentPrint(device, Data)
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

// Отправка данных
function SendContent(device, id=null){
    let url
    if(device == "SMSDevice"){
      document.getElementById('contentSMS_send_status').value=null
      url = dataUrl._SMSContentPost
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
        newContentSMS =  new ContentSMS(id, document.getElementById('contentSMS_name').value, undefined, 2, document.getElementById('contentSMS_content').value)
        //console.log(newContentSMS)
        Request('POST', url, newContentSMS)
        .catch(err => console.log('Ошибка отправки данных из метода SendContent, файла "content-server-app.js: "'+err))
        document.getElementById('contentSMS_send_status').value='Успешно'
      }
    }
}
