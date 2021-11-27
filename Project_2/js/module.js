/*Смена модулей*/
function MainModule(){
    document.getElementById('module_devices').innerHTML = '<iframe src="./module/devices.html" frameborder="0" seamless></iframe>';
}
/*---Смена модулей---*/

/*Правая левая кнопка дисплей->СМС*/
function Left_button_queue(){
  document.getElementById('view_content').style.display='block'
  document.getElementById('send_message').style.display='none'
  document.getElementById('Left_button').style.background='#7F9860'
  document.getElementById('Left_button').style.border='#7F9860'
  document.getElementById('Right_button').style.background='#8A8A8A'
  document.getElementById('Right_button').style.border='#8A8A8A'
}
function Right_button_write(){
  document.getElementById('view_content').style.display='none'
  document.getElementById('send_message').style.display='flex'
  document.getElementById('Left_button').style.background='#8A8A8A'
  document.getElementById('Left_button').style.border='#8A8A8A'
  document.getElementById('Right_button').style.background='#7F9860'
  document.getElementById('Right_button').style.border='#7F9860'
}
/*--Правая левая кнопка дисплей->СМС--*/

/*Информация о каналах СМС*/
function Device_info(IdElement){
    let data = DeviceDataSMS[IdElement];
    document.getElementById('info_device').style.display='block';
    document.getElementById('TopLeftRightBtn_CMC').style.display='flex';
    // В таблицу
    document.getElementById('rezult').innerHTML = '<tr class="tr"><th class="th th_left">Время</th><th class="th">Группа</th><th class="th">Наименование</th><th class="th">Кому</th><th class="th">Текст</th><th class="th">Статус</th><th class="th">Действие</th><th class="th th_right">Действие <p class="p_margin_0">над группой</p></th></tr>';
    for (let i in data.item){
      if(data.item[i].status == 0){
      document.getElementById('rezult').innerHTML += '<tr class="tr tr-red"><td class="td">'+ data.item[i].date.time +'</td><td class="td">'+ data.item[i].group +'</td><td class="td">'+ data.item[i].name+'</td><td class="td">'+ data.item[i].recipient+'</td><td class="td">'+ data.item[i].content+'</td><td class="td">'+ data.item[i].status+'</td><td class="td">'+ 'NONE'+'</td><td class="td">'+ 'NONE'+'</td></tr>';
      } // Не отправленно
      else if(data.item[i].status == 1){
        document.getElementById('rezult').innerHTML += '<tr class="tr"><td class="td">'+ data.item[i].date.time +'</td><td class="td">'+ data.item[i].group +'</td><td class="td">'+ data.item[i].name+'</td><td class="td">'+ data.item[i].recipient+'</td><td class="td">'+ data.item[i].content+'</td><td class="td">'+ data.item[i].status+'</td><td class="td">'+ 'NONE'+'</td><td class="td">'+ 'NONE'+'</td></tr>';
      } // Отправленно
      else if (data.item[i].status == 2){
        document.getElementById('rezult').innerHTML += '<tr class="tr tr-yelow"><td class="td">'+ data.item[i].date.time +'</td><td class="td">'+ data.item[i].group +'</td><td class="td">'+ data.item[i].name+'</td><td class="td">'+ data.item[i].recipient+'</td><td class="td">'+ data.item[i].content+'</td><td class="td">'+ data.item[i].status+'</td><td class="td">'+ 'NONE'+'</td><td class="td">'+ 'NONE'+'</td></tr>';
      } // Ожидание отправления
    }
    // Секция информации о канале/устройстве
    document.getElementById('view_list_item').innerHTML = '';
    document.getElementById('view_list_item').innerHTML += '<div class="view_list_item_start_end_btn"><button type="button" class="view_list_item_end_btn">END</button><button class="view_list_item_start_btn">START</button></div><div class="item_status_light item_view_status_light_device" style="background:'+data.status+'"></div><div class="item_descriptions item_descriptions_view"><div class="item_descriptions_text item_descriptions_text--device">Имя: <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">'+data.name+'</span></div><div class="item_descriptions_text item_descriptions_text--device">Статус: <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">'+data.statusText+'</span></div><div class="item_descriptions_text item_view_descriptions_text">Описание: <span class="item_descriptions_text_meaning item_descriptions_text_meaning--device">'+data.description+'</span></div></div>'
}
