let DataRecipient

// Получение данных из бд
function RecipientURL(option){
  let url = dataUrl._recipient
  if(option == 'people'){
    Request('GET', url)
    .then(data => DataSetRecipient(option, data))
    .catch(err => console.log(err))
  }
  else if(option == 'group'){
    Request('GET', url)
    .then(data => DataSetRecipient(option, data))
    .catch(err => console.log(err))
  }
}
// Установка данных
function DataSetRecipient(option, data){
  document.getElementById('recipient_search').value=''
  DataRecipient = new ArrayRecipients()
  let recipient
  if(option == 'people'){
    for(let i in data.people){
      recipient = new Recipient(data.people[i].id, data.people[i].address)
      DataRecipient.recipients.push(recipient)
    }
  }
  else if(option == 'group'){
    for(let i in data.groups){
      recipient = new Recipient(data.groups[i].id, data.groups[i].address)
      DataRecipient.recipients.push(recipient)
    }
  }
  DataRecipient.Sort('address', 'increasing')
  RecipientPrint(DataRecipient.recipients)
}
// Печать данных
function RecipientPrint(data){
  document.getElementById('recipient_table').style.display='block'
  document.getElementById('recipient_tb').innerHTML = ''
  for(let i in data){
    if(i%2 == 0){
      document.getElementById('recipient_tb').innerHTML += `<div class="recipient_tr recipient_tr_2"><input type="radio" name="recipient_tr" value="`+data[i].address+`" id="recipient_tr_`+i+`"><label for="recipient_tr_`+i+`">`+data[i].address+`</label></div>`
    }
    else{
      document.getElementById('recipient_tb').innerHTML += `<div class="recipient_tr"><input type="radio" name="recipient_tr" value="`+data[i].address+`" id="recipient_tr_`+i+`"><label for="recipient_tr_`+i+`">`+data[i].address+`</label></div>`
    }
  }
}

// Функция поиска
function RecipientSearch(){
  let searchText = document.getElementById('recipient_search').value
  if(searchText.length != 0){
    let newData = DataRecipient.Search(searchText)
    if(newData != null){
      DataRecipient.Sort('adress', 'increasing')
      RecipientPrint(newData.recipients)
    }
    else {
      DataRecipient.Sort('adress', 'increasing')
      RecipientPrint(DataRecipient.recipients)
    }
  }
  else{
    DataRecipient.Sort('adress', 'increasing')
    RecipientPrint(DataRecipient.recipients)
  }
}

// Выбор получателя/группы
function RecipientValue(){
  let recipientArray = document.getElementById('recipient_tb').getElementsByTagName('input')
  for(let i in recipientArray){
    if(recipientArray[i].type == "radio" && recipientArray[i].checked){
      document.getElementById('recipient_value').value = recipientArray[i].value
      RecipienTableClose()
    }
  }
}
// Закрыть список
function RecipienTableClose(){
  if(document.getElementById('recipient_table').style.display=='block'){
    document.getElementById('recipient_table').style.display=null
    DataRecipient = undefined
  }
}
