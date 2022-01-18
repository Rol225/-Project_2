var flagStatus_device          // Флаги сортировки
var flagStatus_content          // Флаги сортировки
let dataUrl = new DataURL()
var DataDevice
var SearchDataPublications
var IdElement            // Id устройства/канала
/*Ввод и получение каналов*/
function Devices(option){
  let url
  if(option == 1){url = dataUrl._ScoreboardDeviceGet; device='ScoreboardDevice'}
  else if(option == 2){url = dataUrl._SpeakersDeviceGet; device='SpeakersDevice'}
  else if(option == 3){url = dataUrl._SMSDeviceGet; device='SMSDevice'}
  else if(option == 4){url = dataUrl._EmailDeviceGet; device='EmailDevice'}
  Request('GET', url)
  .then(data => DataSet(device, data))
  .catch(err => console.log(err))
}
/*---Вывод и получение каналов---*/
function DataSet(device, data){
  if(device=='SMSDevice'){
    let arrayPublication
    let publication
    let device
    DataDevice = new ArrayDevices()
    for(let i in data){
      arrayPublication = new ArrayPublicationsSMS()
      for(let j in data[i].publication){
        let date = new DatePublication(data[i].publication[j].date.day, data[i].publication[j].date.month, data[i].publication[j].date.year, data[i].publication[j].date.time)
        publication = new PublicationSMS(data[i].publication[j].id, data[i].publication[j].name, undefined, data[i].publication[j].status, data[i].publication[j].content, date, undefined, data[i].publication[j].recipient)
        arrayPublication._publications.push(publication)
      }
      device = new Device(data[i].id, data[i].name, data[i].description, data[i].status, arrayPublication)
      DataDevice._devices.push(device)
    }
  }
  PrintDevice(device, DataDevice._devices)
}
/*Смена типа устройств*/
function СhangeDevices(device){
  flagStatus_content = undefined
  flagStatus_device = undefined
  tableStr = ''
  searchText = ''
  if(device == 'SMSDevice'){
    Devices(3)
  }
  else if(device == 'EmailDevice'){
    Devices(4)
  }
}
/*--------Смена типа устройств---------*/
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
    document.getElementById('status_sms').style.visibility=null
    document.getElementById('status_sms').style.color=null
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
      url = dataUrl._SMSContentPost
      body = {
        name: document.getElementById('sendName').value,
        content: document.getElementById('sendText').value
      }
      console.log(body)
      Request('POST', url, body)
          .catch(err => console.log('Error send content\n'+ err.name + '\n' + err.message))
      document.getElementById('status_sms').innerHTML = 'Успешно сохранено'
      document.getElementById('status_sms').style.color='#04ff3a'
      document.getElementById('status_sms').style.visibility='inherit'
    }
    else if(test != 2 && option == 'save'){
      document.getElementById('status_sms').innerHTML = 'Ошибка при заполнении'
      document.getElementById('status_sms').style.color='#ff0404'
      document.getElementById('status_sms').style.visibility='inherit'
    }
    // Отправка сообщения как публикацию
    else if(test == 2 && option == 'send'){
      url = dataUrl._SmsMessage
      // Проверка на заполненность группы, телефона сообщения
      if(document.getElementById('recipient_value').validity.valueMissing || document.getElementById('recipient_value').value == ''){
        document.getElementById('recipient_value').style.background = '#e1817c6e'
      }else{test++}
      // Проверка на заполненность времени отправки, ограничение времени отправки и тригера сообщения
      if(document.getElementById('sendTime').validity.valueMissing && document.getElementById('sendTimeEnd').validity.valueMissing){
        if(document.getElementById('sendTime').validity.valueMissing){
          document.getElementById('sendTime').style.background = '#e1817c6e'
        }
        if(document.getElementById('sendTimeEnd').validity.valueMissing){
          document.getElementById('sendTimeEnd').style.background = '#e1817c6e'
        }
      }else{test++}
      if(test == 4){
        body = {
            id: Number(IdElement),
            name: document.getElementById('sendName').value,
            date:{
                year: '2022',
                month: '01',
                day: '15',
                time: String(document.getElementById('sendTime').value),
                //timeOut: document.getElementById('sendTimeEnd').value,
            },
            recipient: document.getElementById('recipient_value').value,
            content: document.getElementById('sendText').value,
            status: 2
        }
        console.log(body)
        Request('POST', url, body)
            .catch(err => console.log('Error send content\n'+ err.name + '\n' + err.message))
        document.getElementById('status_sms').innerHTML = 'Успешно отправлено'
        document.getElementById('status_sms').style.color='#04ff3a'
        document.getElementById('status_sms').style.visibility='inherit'
      }
      else{
        document.getElementById('status_sms').innerHTML = 'Ошибка при заполнении'
        document.getElementById('status_sms').style.color='#ff0404'
        document.getElementById('status_sms').style.visibility='inherit'
      }
    }
  }
}
/*---Отправка сообщения---*/
