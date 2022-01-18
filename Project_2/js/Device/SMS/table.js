var tableStr
/*Сортировка*/
function Sort(device, sortProperty, order, data=null){
  if(data==null){
    if(SearchDataPublications == undefined || SearchDataPublications == null){
      data = DataDevice._devices[IdElement]._publications
    }
    else{
      data = SearchDataPublications
    }
  }
  if(order == 'increasing'){
    if(device == 'SMSDevice' || device == 'EmailDevice'){
      if(device == 'SMSDevice'){
        tableStr = '<tr class="tr"><th class="th th_left" onclick="Sort(\'SMSDevice\', \'time\', \'decreasing\')">Время</th><th class="th" onclick="Sort(\'SMSDevice\', \'publucation_plan\', \'decreasing\')">План публикаций</th><th class="th" onclick="Sort(\'SMSDevice\', \'name\', \'decreasing\')">Наименование</th><th class="th" onclick="Sort(\'SMSDevice\', \'recipient\', \'decreasing\')">Кому</th><th class="th" onclick="Sort(\'SMSDevice\', \'content\', \'decreasing\')">Текст</th><th class="th" onclick="Sort(\'SMSDevice\', \'status\', \'decreasing\')">Статус</th><th class="th">Действие</th><th class="th th_right">Действие <p class="p_margin_0">над планом публикаций</p></th></tr>'
        data.Sort(sortProperty, order)
      }
      else if(device == 'EmailDevice'){
        tableStr = '<tr class="tr"><th class="th th_left" onclick="Sort(\'EmailDevice\', \'time\', \'decreasing\')">Время</th><th class="th" onclick="Sort(\'EmailDevice\', \'publucation_plan\', \'decreasing\')">План публикаций</th><th class="th" onclick="Sort(\'EmailDevice\', \'name\', \'decreasing\')">Наименование</th><th class="th" onclick="Sort(\'EmailDevice\', \'recipient\', \'decreasing\')">Кому</th><th class="th" onclick="Sort(\'EmailDevice\', \'content\', \'decreasing\')">Текст</th><th class="th" onclick="Sort(\'EmailDevice\', \'status\', \'decreasing\')">Статус</th><th class="th">Действие</th><th class="th th_right">Действие <p class="p_margin_0">над планом публикаций</p></th></tr>'
        data.Sort(sortProperty, order)
      }
      PrintOnWindow(data._publications)
    }
  }
  else if(order == 'decreasing'){
    if(device == 'SMSDevice' || device == 'EmailDevice'){
      if(device == 'SMSDevice'){
        tableStr = '<tr class="tr"><th class="th th_left" onclick="Sort(\'SMSDevice\', \'time\', \'increasing\')">Время</th><th class="th" onclick="Sort(\'SMSDevice\', \'publucation_plan\', \'increasing\')">План публикаций</th><th class="th" onclick="Sort(\'SMSDevice\', \'name\', \'increasing\')">Наименование</th><th class="th" onclick="Sort(\'SMSDevice\', \'recipient\', \'increasing\')">Кому</th><th class="th" onclick="Sort(\'SMSDevice\', \'content\', \'increasing\')">Текст</th><th class="th" onclick="Sort(\'SMSDevice\', \'status\', \'increasing\')">Статус</th><th class="th">Действие</th><th class="th th_right">Действие <p class="p_margin_0">над планом публикаций</p></th></tr>'
        data.Sort(sortProperty, order)
      }
      else if(device == 'EmailDevice'){
        tableStr = '<tr class="tr"><th class="th th_left" onclick="Sort(\'EmailDevice\', \'time\', \'increasing\')">Время</th><th class="th" onclick="Sort(\'EmailDevice\', \'publucation_plan\', \'increasing\')">План публикаций</th><th class="th" onclick="Sort(\'EmailDevice\', \'name\', \'increasing\')">Наименование</th><th class="th" onclick="Sort(\'EmailDevice\', \'recipient\', \'increasing\')">Кому</th><th class="th" onclick="Sort(\'EmailDevice\', \'content\', \'increasing\')">Текст</th><th class="th" onclick="Sort(\'EmailDevice\', \'status\', \'increasing\')">Статус</th><th class="th">Действие</th><th class="th th_right">Действие <p class="p_margin_0">над планом публикаций</p></th></tr>'
        data.Sort(sortProperty, order)
      }
      PrintOnWindow(data._publications)
    }
  }
}
/*---Сортировка---*/

// Выводы в таблицу
function PrintOnWindow(data){
  let color  // Цвет строки таблицы
  let icon  // Иконка статуса
  let time  // Время

  // В таблицу
  document.getElementById('rezult').innerHTML = tableStr
    try{
      for (let i in data){
        let status
        try{
          // Не отправленно
          if(data[i]._status == 0){
            color = '<tr class="tr tr-red">'
            icon = '<div class="tdStatusNo"></div>'
            status = 'status_No'
          }
          // Отправленно
          else if(data[i]._status == 1){
            color = '<tr class="tr">'
            icon = '<div class="tdStatusOK"></div>'
            status = 'status_Ok'
          }
          // Ожидание отправления
          else if (data[i]._status == 2){
            color = '<tr class="tr tr-yelow">'
            icon = '<div class="tdStatusUnknow"></div>'
            status = 'status_Unknow'
          }
          // Ошибка
          else{
            color = '<tr class="tr">'
            icon = '<div class="tdStatusError"></div>'
            status = 'null'
          }
        } catch(e){
          color = '<tr class="tr">'
          icon = '<div class="tdStatusError"></div>'
          status = 'undefined'
        }
        // Вывод
        let time
        let publucation_plan
        let name
        let recipient
        let content

        // Проверка time контента
        try{
          if(data[i]._date._time.lenght != 0){
            time = data[i]._date._time
          }
          else{
            time = 'undefined'
          }
        }catch(e){
          //alert('Ошибка '+ e.name + ':' + e.message + '\n\n' + 'Отсутствует поле объекта! Отсутствует "playlist.id"')
        }

        // Проверка name контента
        try{
          if(data[i]._name.lenght != 0){
            name = data[i]._name;
          }
          else{
            name = 'null'
          }
        }catch(e){
          name = 'undefined'
        }

        // Проверка content контента
        try{
          if(data[i]._content.length != 0){
            content = data[i]._content;
          }
          else{
            content = 'null'
          }
        }catch(e){
          content = 'undefined'
        }

        // Проверка description контента
        try{
          if(data[i]._publucation_plan.length != 0){
            publucation_plan = data[i]._publucation_plan;
          }
          else{
            publucation_plan = 'null'
          }
        }catch(e){
          publucation_plan = 'undefined'
        }

        // Проверка recipient контента
        try{
          if(data[i]._recipient.length != 0){
            recipient = data[i]._recipient;
          }
          else{
            recipient = 'null'
          }
        }catch(e){
          recipient = 'undefined'
        }
        if(flagStatus_content == 'status_All'){
          document.getElementById('rezult').innerHTML += color+'<td class="td">'+ time +'</td><td class="td">'+ publucation_plan +'</td><td class="td">'+ name+'</td><td class="td">'+ recipient +'</td><td class="td">'+ content +'</td><td class="td">'+icon+'</td><td class="td"><div class="tdActionDelete"></div></td><td class="td"><div class="tdActionDelete"></div></td></tr>';
        }
        else if(flagStatus_content == status){
          document.getElementById('rezult').innerHTML += color+'<td class="td">'+ time +'</td><td class="td">'+ publucation_plan +'</td><td class="td">'+ name+'</td><td class="td">'+ recipient +'</td><td class="td">'+ content +'</td><td class="td">'+icon+'</td><td class="td"><div class="tdActionDelete"></div></td><td class="td"><div class="tdActionDelete"></div></td></tr>';
        }
       }
    }catch(e){
      alert('Ошибка '+ e.name + ':' + e.message + '\n\n' + 'Отсутствует поле объекта!')
    }
}

/*Информация о каналах СМС*/
function DeviceView(IdElementNew, device){
    Reload = 1
    Sort(device, 'time', 'decreasing', DataDevice._devices[IdElement]._publications) // Сортировка и вывод таблицы
    SendSMSBg()
    SendSMSValue()
  }
/*---Информация о каналах СМС---*/

document.addEventListener("DOMContentLoaded", resize())
function resize(){
  let a = document.getElementById('list').offsetHeight - document.getElementById('TopLeftRightBtn_CMC').offsetHeight - document.getElementById('view_list_item').offsetHeight - document.getElementById('contentSearch').offsetHeight - 159
    document.getElementById('table_container').style.height = a +'px'
    window.onresize = function() {
        a = document.getElementById('list').offsetHeight - document.getElementById('TopLeftRightBtn_CMC').offsetHeight - document.getElementById('view_list_item').offsetHeight - document.getElementById('contentSearch').offsetHeight - 30
        document.getElementById('table_container').style.height = a +'px'
    }
}
