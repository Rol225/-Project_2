
function AllContentPrint(device, data){
  document.getElementById('search_section').style.display='flex'
  document.getElementById('section_all_content').style.display='block'
  document.getElementById('contentSMS_view').style.display = null

  let deviceText
  if(device == 'SMSDevice'){deviceText='СМС'}
  if(device == 'EmailDevice'){deviceText='E-mail'}
  if(device == 'SpeakersDevice'){deviceText='Динамики'}
  if(device == 'ScoreboardDevice'){deviceText='Табло'}
  document.getElementById('search_section').innerHTML = '<div class="search_module"><input type="text" name="" value="" class="search_input" placeholder="Найти..."><div class="rtrey"></div></div><div class="search_device">'+deviceText+'</div>'

  document.getElementById('list').innerHTML = '<div class="content content-add"onclick="ContentAddPage(\'SMSDevice\')"><button type="button" name="button" id="" class="content_add">+</button></div>'

  for (let i in data){
    Data = data
    let color;
    let verification;
    if(data[i].status == 0){
      color = '<div class="content content-red" onclick="ContentView('+data[i].id+', 1)">'
      verification = 'Не допущено'
    }
    else if(data[i].status == 1){
      color = '<div class="content content-green" onclick="ContentView('+data[i].id+', 1)">'
      verification = 'Допущено'
    }
    else if(data[i].status == 2){
      color = '<div class="content content-yellow" onclick="ContentView('+data[i].id+', 1)">'
      verification = 'Не проверено'
    }
    document.getElementById('list').innerHTML += color+'<div class="content_title">'+data[i].name+'</div><div class="content_verification">'+verification+'</div><div class="content_description"><span class="content_description_static">Контент: </span><span class="content_description_text">'+data[i].content+'</span></div></div>';
  }
}
function ContentView(id){
  for(let i in Data){
    if(id == Data[i].id){
      document.getElementById('contentSMS_view').style.display ='block';
      document.getElementById('contentSMS_name').value = Data[i].name
      document.getElementById('contentSMS_save').style.margin = null
      if(Data[i].status == 0){
        document.getElementById('contentSMS_status').innerHTML = 'Не допущено';
        document.getElementById('contentSMS_status').style.color = '#d90d0dbf';
      }
      else if(Data[i].status == 1){
        document.getElementById('contentSMS_status').innerHTML = 'Дупощено';
        document.getElementById('contentSMS_status').style.color = '#23d90dbf';
      }
      else if(Data[i].status == 2){
        document.getElementById('contentSMS_status').innerHTML = 'Не проверенно';
        document.getElementById('contentSMS_status').style.color = '#d99a0dbf';
      }
      document.getElementById('contentSMS_content').value = Data[i].content
      document.getElementById('contentSMS_save').innerHTML = '<button type="button" class="contentSMS_save_btn" onclick="SendContent(\'SMSDevice\','+Data[i].id+')">Сохранить изменения</button><button type="button" class="contentSMS_save_btn" onclick="SendContent(\'SMSDevice\')">Сохранить как новый контент</button>'
      break
    }
  }
}
function ContentAddPage(device){
  if (device == 'SMSDevice'){
    document.getElementById('contentSMS_view').style.display = 'block'
    document.getElementById('contentSMS_status').innerHTML = 'Не проверенно';
    document.getElementById('contentSMS_status').style.color = '#d99a0dbf';
    document.getElementById('contentSMS_save').innerHTML = '<button type="button" class="contentSMS_save_btn" onclick="SendContent(\'SMSDevice\')">Сохранить как новый контент</button>'
    document.getElementById('contentSMS_save').style.margin = '15px 0 0 157px'
  }
}
function ContentViewClose(device){
  if (device == 'SMSDevice'){
    document.getElementById('contentSMS_view').style.display = null
    Content(3)
  }
}
function BgInput(id){
  document.getElementById(id).style.background = null
}
