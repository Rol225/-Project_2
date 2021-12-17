/*============================================================*/
// AnimationImg_1 - Динамика/Статика фона (57,68,81,94 строки)
// AnimationImg_2 - позиционирования изображений (125 строка)
// MainBody - значения прозрачности (102 строка)
// BgColor - цвет фона (41 строка)
/*===========================================================*/

/*Выбор из меню настроек*/
function Settings(option){
  if(option == 1){
    document.getElementById('background_setting').style.color = '#cfa612';
    document.getElementById('language_setting').style.color = '#ffffff';
    document.getElementById('server_setting').style.color = '#ffffff';
    document.getElementById('setting_1').style.display = 'block';
    if(window.parent.document.getElementById('AnimationImg_1').value == 1){
      document.getElementById('setting_animation_active').checked = true;
      document.getElementById('setting_animation_static').checked = false;
      document.getElementsByClassName('static_img_list')[0].style.display = 'none'
      window.parent.document.getElementById('AnimationImg_1').style.animation = 'blue 90s linear infinite'
      window.parent.document.getElementById('AnimationImg_2').style.animation = 'pink 90s linear infinite'
    }
    else if(window.parent.document.getElementById('AnimationImg_1').value == 2){
      document.getElementById('setting_animation_active').checked = false;
      document.getElementById('setting_animation_static').checked = true;
      document.getElementsByClassName('static_img_list')[0].style.display = 'flex'
      window.parent.document.getElementById('AnimationImg_1').style.animation = 'none'
      window.parent.document.getElementById('AnimationImg_2').style.animation = 'none'
    }
    document.getElementById('slider_setting').value=window.parent.document.getElementById('MainBody').value
  }
  else if(option == 2){
    document.getElementById('background_setting').style.color = '#ffffff';
    document.getElementById('language_setting').style.color = '#cfa612';
    document.getElementById('server_setting').style.color = '#ffffff';
  }
  else if(option == 3){
    document.getElementById('background_setting').style.color = '#ffffff';
    document.getElementById('language_setting').style.color = '#ffffff';
    document.getElementById('server_setting').style.color = '#cfa612';
  }
}
/*Изменение темы*/
function SettingsTopics(option){
  let color
  if(option == 'Black'){window.parent.document.getElementById('MainBody').style.background = '#000000';color='0,0,0'}
  else if(option == 'Indigo'){window.parent.document.getElementById('MainBody').style.background = '#4B0082';color='75,0,130'}
  else if(option == 'DarkSlateGray'){window.parent.document.getElementById('MainBody').style.background = '#2F4F4F';color='47,79,79'}
  else if(option == 'MediumSlateBlue'){window.parent.document.getElementById('MainBody').style.background = '#7B68EE';color='123,104,238'}
  else if(option == 'DarkSlateBlue'){window.parent.document.getElementById('MainBody').style.background = '#483D8B';color='72,61,139'}
  else if(option == 'SaddleBrown'){window.parent.document.getElementById('MainBody').style.background = '#8B4513';color='139,69,19'}
  else if(option == 'Grey'){window.parent.document.getElementById('MainBody').style.background = '#606060';color='96,96,96'}
  else if(option == 'LightGray'){window.parent.document.getElementById('MainBody').style.background = '#bfbfbf';color='191,191,191'}
  else if(option == 'LavenderBlush'){window.parent.document.getElementById('MainBody').style.background = '#FFF0F5';color='255,240,245'}
  window.parent.document.getElementById('BgColor').value = color // Сохранение значения цвета фона
}
/*Переключение Checkbox*/
function CheckboxAnimations(option, option_2=null){
  if(option == 1){
      if(document.getElementById('setting_animation_active').checked == true){
        document.getElementById('setting_animation_static').checked = false;
        document.getElementsByClassName('static_img_list')[0].style.display = 'none'
        if(option_2 == null){
          window.parent.document.getElementById('AnimationImg_1').style.left='0'
          window.parent.document.getElementById('AnimationImg_2').style.right='0'
        }
        window.parent.document.getElementById('AnimationImg_1').style.display='block'
        window.parent.document.getElementById('AnimationImg_2').style.display='block'
        window.parent.document.getElementById('AnimationImg_1').style.animation = 'blue 90s linear infinite'
        window.parent.document.getElementById('AnimationImg_2').style.animation = 'pink 90s linear infinite'
        window.parent.document.getElementById('AnimationImg_1').value=1 // Сохранение Динамики/Статики фона
      }
      else if(document.getElementById('setting_animation_active').checked == false){
        document.getElementById('setting_animation_static').checked = true;
        document.getElementsByClassName('static_img_list')[0].style.display = 'flex'
        if(option_2 == null){
          window.parent.document.getElementById('AnimationImg_1').style.left='-45%'
          window.parent.document.getElementById('AnimationImg_2').style.right='-45%'
        }
        window.parent.document.getElementById('AnimationImg_1').style.animation = 'none'
        window.parent.document.getElementById('AnimationImg_2').style.animation = 'none'
        window.parent.document.getElementById('AnimationImg_1').value=2 // Сохранение Динамики/Статики фона
      }
  }
  else if(option == 2){
      if(document.getElementById('setting_animation_static').checked == true){
        document.getElementById('setting_animation_active').checked = false;
        document.getElementsByClassName('static_img_list')[0].style.display = 'flex'
        if(option_2 == null){
          window.parent.document.getElementById('AnimationImg_1').style.left='-45%'
          window.parent.document.getElementById('AnimationImg_2').style.right='-45%'
        }
        window.parent.document.getElementById('AnimationImg_1').style.animation = 'none'
        window.parent.document.getElementById('AnimationImg_2').style.animation = 'none'
        window.parent.document.getElementById('AnimationImg_1').value=2 // Сохранение Динамики/Статики фона
      }
      else if(document.getElementById('setting_animation_static').checked == false){
        document.getElementById('setting_animation_active').checked = true;
        document.getElementsByClassName('static_img_list')[0].style.display = 'none'
        if(option_2 == null){
          window.parent.document.getElementById('AnimationImg_1').style.left='0'
          window.parent.document.getElementById('AnimationImg_2').style.right='0'
        }
        window.parent.document.getElementById('AnimationImg_1').style.display='block'
        window.parent.document.getElementById('AnimationImg_2').style.display='block'
        window.parent.document.getElementById('AnimationImg_1').style.animation = 'blue 90s linear infinite'
        window.parent.document.getElementById('AnimationImg_2').style.animation = 'pink 90s linear infinite'
        window.parent.document.getElementById('AnimationImg_1').value=1 // Сохранение Динамики/Статики фона
      }
  }

}
/*Ползунок яркости*/
function SliderSetting(){
  let op = document.getElementById('slider_setting').value
  window.parent.document.getElementById('MainBody').value = op // Сохранение значения прозрачности
  op = op/100
  color = window.parent.document.getElementById('BgColor').value
  window.parent.document.getElementById('MainBody').style.background = 'rgba('+color+','+op+')'
}
/*Изменение положения статичных изображний*/
function StaticImg(option){
  if(option == 'around'){
    window.parent.document.getElementById('AnimationImg_1').style.left='-45%'
    window.parent.document.getElementById('AnimationImg_2').style.right='-45%'
    window.parent.document.getElementById('AnimationImg_1').style.display='block'
    window.parent.document.getElementById('AnimationImg_2').style.display='block'
  }
  else if(option == 'centet'){
    window.parent.document.getElementById('AnimationImg_1').style.left='0'
    window.parent.document.getElementById('AnimationImg_2').style.right='0'
    window.parent.document.getElementById('AnimationImg_1').style.display='block'
    window.parent.document.getElementById('AnimationImg_2').style.display='block'
  }
  else if(option == 'none'){
    window.parent.document.getElementById('AnimationImg_1').style.display='none'
    window.parent.document.getElementById('AnimationImg_2').style.display='none'
  }
  window.parent.document.getElementById('AnimationImg_2').value=option // Сохранение значения позиционирования изображений
}
