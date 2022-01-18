let searchText = ''      // Текст для поиска
let flagStatus          // Флаги сортировки

/*Печать всего контента по выбранному устройству*/
function AllContentPrint(device, data){
  document.getElementById('search_section').style.display='flex'
  document.getElementById('section_all_content').style.display='block'
  document.getElementById('contentSMS_view').style.display = null

  let deviceText
  if(device == 'SMSDevice'){deviceText='СМС'}
  if(device == 'EmailDevice'){deviceText='E-mail'}
  if(device == 'SpeakersDevice'){deviceText='Динамики'}
  if(device == 'ScoreboardDevice'){deviceText='Табло'}
  document.getElementById('search_section').innerHTML = '<div class="search_module"><input type="search" name="" value="'+searchText+'" class="search_input" placeholder="Найти..." onkeyup="Search(\'contentSMS\', \'contentSearch\')" onfocusout="Search(\'contentSMS\', \'contentSearch\')" id="contentSearch"><svg onclick="SortContentlistView()" class="icon_search" id="icon_search_content" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path  d="M6 11C6 10.4477 6.44772 10 7 10H41C41.5523 10 42 10.4477 42 11C42 11.5523 41.5523 12 41 12H7C6.44772 12 6 11.5523 6 11Z"/><path d="M6 24C6 23.4477 6.44772 23 7 23H41C41.5523 23 42 23.4477 42 24C42 24.5523 41.5523 25 41 25H7C6.44772 25 6 24.5523 6 24Z"/><path d="M6 37C6 36.4477 6.44772 36 7 36H41C41.5523 36 42 36.4477 42 37C42 37.5523 41.5523 38 41 38H7C6.44772 38 6 37.5523 6 37Z"/></svg><div class="rtrey"></div></div><div class="search_device">'+deviceText+'</div>'

  if(flagStatus==undefined){
    FlagStatusChek() // Проверка сортировки
  }

  ItemPrint(device, data)
}
/*Печать окна просмотра контента*/
// Печать всего контента
function ItemPrint(device, data){
  document.getElementById('list').innerHTML = '<div class="content content-add"onclick="ContentAddPage(\'SMSDevice\')"><button type="button" name="button" id="" class="content_add">+</button></div>'

  try{
    data.Sort('name', 'increasing')
    for (let i in data.contents){
      let color
      let verification
      let name
      let content
      let status  // Для сортировки
      let id
      // Проверка верефикации контента
      try{
        if(data.contents[i]._status == 0){
          color = '<div class="content content-red"'
          verification = 'Не допущено'
          status = 'status_No'
        }
        else if(data.contents[i]._status == 1){
          color = '<div class="content content-green"'
          verification = 'Допущено'
          status = 'status_Ok'
        }
        else if(data.contents[i]._status == 2){
          color = '<div class="content content-yellow"'
          verification = 'Не проверенно'
          status = 'status_Unknow'
        }
        else{
          color = '<div class="content"'
          verification = 'null'
          status = 'null'
        }
      }catch(e){
        verification = 'undefined'
        status = 'undefined'
      }
      // Проверка id контента
      try{
        if(data.contents[i]._id.lenght != 0){
          color += 'onclick="ContentView('+data.contents[i]._id+')">'
          id = data.contents[i]._id
        }
      }catch(e){
        //alert('Ошибка '+ e.name + ':' + e.message + '\n\n' + 'Отсутствует поле объекта! Отсутствует "playlist.id"')
      }
      // Проверка name контента
      try{
        if(data.contents[i]._name.lenght != 0){
          name = data.contents[i]._name;
        }
        else{
          name = 'null'
        }
      }catch(e){
        name = 'undefined'
      }
      // Проверка contnen контента
      try{
        if(data.contents[i]._content.length != 0){
          content = data.contents[i]._content;
        }
        else{
          content = 'null'
        }
      }catch(e){
        content = 'undefined'
      }

      if(flagStatus == 'status_All'){
        document.getElementById('list').innerHTML += color+
            `<div class="content_title">`+name+`</div>
            <div class="content_verification">`+verification+`</div>
            <div class="content_description">
              <span class="content_description_static">Контент: </span>
              <span class="content_description_text">`+content+`</span>
              </div>
            <button class="content_del_btn" onclick="ContentDel(`+id+`)"></buttonclass>
            </div>`
      }
      else if(flagStatus == status){
        document.getElementById('list').innerHTML += color+
            `<div class="content_title">`+name+`</div>
            <div class="content_verification">`+verification+`</div>
            <div class="content_description">
                <span class="content_description_static">Контент: </span>
                <span class="content_description_text">`+content+`</span>
            </div>
            <button class="content_del_btn" onclick="ContentDel(`+id+`)"></buttonclass>
            </div>`
      }
    }
  } catch(e){

  }
}
// Удвление контента
function ContentDel(idContent){
  console.log(idContent)
  /*Request('POST', dataUrl._SMSContentPost, idContent)
      .catch(err => console.log('Error send content\n'+ err.name + '\n' + err.message))*/
}
// Окно редактирования контента
function ContentView(id){
  document.getElementById('contentSMS_send_status').value=null
  for(let i in Data.contents){
    if(id == Data.contents[i]._id){
      document.getElementById('contentSMS_view').style.display ='block';
      document.getElementById('contentSMS_name').value = Data.contents[i]._name
      document.getElementById('contentSMS_save').style.margin = null
      if(Data.contents[i]._status == 0){
        document.getElementById('contentSMS_status').innerHTML = 'Не допущено';
        document.getElementById('contentSMS_status').style.color = '#d90d0dbf';
      }
      else if(Data.contents[i]._status == 1){
        document.getElementById('contentSMS_status').innerHTML = 'Дупощено';
        document.getElementById('contentSMS_status').style.color = '#23d90dbf';
      }
      else if(Data.contents[i]._status == 2){
        document.getElementById('contentSMS_status').innerHTML = 'Не проверенно';
        document.getElementById('contentSMS_status').style.color = '#d99a0dbf';
      }
      document.getElementById('contentSMS_content').value = Data.contents[i]._content
      document.getElementById('contentSMS_save').innerHTML = '<button type="button" class="contentSMS_save_btn" onclick="SendContent(\'SMSDevice\','+Data.contents[i]._id+')">Сохранить изменения</button><button type="button" class="contentSMS_save_btn" onclick="SendContent(\'SMSDevice\')">Сохранить как новый контент</button>'
      break
    }
  }
}
/*Печать окна добавления контента*/
function ContentAddPage(device){
  if (device == 'SMSDevice'){
    document.getElementById('contentSMS_view').style.display = 'block'
    document.getElementById('contentSMS_name').value = null
    document.getElementById('contentSMS_status').innerHTML = 'Не проверенно';
    document.getElementById('contentSMS_content').value = null
    document.getElementById('contentSMS_status').style.color = '#d99a0dbf';
    document.getElementById('contentSMS_save').innerHTML = '<button type="button" class="contentSMS_save_btn" onclick="SendContent(\'SMSDevice\')">Сохранить как новый контент</button>'
    document.getElementById('contentSMS_save').style.margin = '15px 0 0 157px'
  }
}
/*Закрытие окна просмотра контента*/
function ContentViewClose(device){
  if (device == 'SMSDevice'){
    document.getElementById('contentSMS_view').style.display = null
    ContentURL(3)
  }
}
/*Обработка нажатий клавиш в input*/
function BgInput(id){
  document.getElementById(id).style.background = null
}
// Функция поиска
function Search(searchObjArray, searchId){
  searchText = document.getElementById(searchId).value
  if(searchObjArray == 'contentSMS'){
    if(searchText.length != 0){
      let newData = Data.Search(searchText)
      if(newData != null){
        ItemPrint('SMSDevice', newData)
      }
      else{
        ItemPrint('SMSDevice', Data)
      }
    }
    else{
      ItemPrint('SMSDevice', Data)
    }
  }
}
// Функция показа сортировки
function SortContentlistView(){
  if(document.getElementById('search_flag').className == 'search_flag active'){
    document.getElementById('search_flag').style.display = null
    document.getElementById('search_flag').className = 'search_flag'
  }
  else{
    document.getElementById('search_flag').style.display = 'block'
    document.getElementById('search_flag').className += ' active'
  }
}
// Проверка флагов сортировки на сайте
function FlagStatusChek(searchObjArray, searchId){
  try {
    let masFlag = document.getElementsByClassName('flag_status')
    for(let i in masFlag){
      if(masFlag[i].type == "radio" && masFlag[i].checked){
        try{
          flagStatus = masFlag[i].value
          Search(searchObjArray, searchId)
        }catch (e){}
      }
    }
  } catch (e) {
      alert('Ошибка '+ e.name + ':' + e.message + '\n\n' + 'Ошибка при сортировке')
  }
}
