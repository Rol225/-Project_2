let configurations
// Загрузка из localStorage
document.addEventListener("DOMContentLoaded", () => {
  configurations = JSON.parse(localStorage.getItem('configurations'))
  });

// Сохранение в localStorage
function SaveLocalStorage(){
  localStorage.setItem('configurations', JSON.stringify(configurations))
}
/*Выбор из меню настроек*/
function Settings(option){
  if(option == 1){
    document.getElementById('background_setting').style.color = '#cfa612';
    document.getElementById('language_setting').style.color = '#ffffff';
    document.getElementById('server_setting').style.color = '#ffffff';
    document.getElementById('setting_1').style.display = 'block';
    if(configurations.animation == 'on'){
      document.getElementById('setting_animation_active').checked = true;
      document.getElementById('setting_animation_static').checked = false;
      document.getElementsByClassName('static_img_list')[0].style.display = 'none'
      window.parent.document.getElementById('AnimationImg_1').style.animation = 'blue 90s linear infinite'
      window.parent.document.getElementById('AnimationImg_2').style.animation = 'pink 90s linear infinite'
    }
    else if(configurations.animation == 'off'){
      document.getElementById('setting_animation_active').checked = false;
      document.getElementById('setting_animation_static').checked = true;
      document.getElementsByClassName('static_img_list')[0].style.display = 'flex'
      window.parent.document.getElementById('AnimationImg_1').style.animation = 'none'
      window.parent.document.getElementById('AnimationImg_2').style.animation = 'none'
    }
    document.getElementById('slider_setting').value=configurations.transparency*100
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
  if(option == 'Black'){color='0,0,0'}
  else if(option == 'Indigo'){color='75,0,130'}
  else if(option == 'DarkSlateGray'){color='47,79,79'}
  else if(option == 'MediumSlateBlue'){color='123,104,238'}
  else if(option == 'DarkSlateBlue'){color='72,61,139'}
  else if(option == 'SaddleBrown'){color='139,69,19'}
  else if(option == 'Grey'){color='96,96,96'}
  else if(option == 'LightGray'){color='191,191,191'}
  else if(option == 'LavenderBlush'){color='255,240,245'}
  configurations.bgColor = color // Сохранение значения цвета фона
  localStorage.setItem('configurations', JSON.stringify(configurations))
  window.parent.document.getElementById('MainBody').style.background = 'rgba('+configurations.bgColor+','+configurations.transparency+')'
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
        configurations.animation='on' // Сохранение Динамики/Статики фона
      }
      else if(document.getElementById('setting_animation_active').checked == false){
        document.getElementById('setting_animation_static').checked = true;
        document.getElementsByClassName('static_img_list')[0].style.display = 'flex'
        if(option_2 == null){
          StaticImg(configurations.positioning)
        }
        window.parent.document.getElementById('AnimationImg_1').style.animation = 'none'
        window.parent.document.getElementById('AnimationImg_2').style.animation = 'none'
        configurations.animation='off' // Сохранение Динамики/Статики фона
      }
  }
  else if(option == 2){
      if(document.getElementById('setting_animation_static').checked == true){
        document.getElementById('setting_animation_active').checked = false;
        document.getElementsByClassName('static_img_list')[0].style.display = 'flex'
        if(option_2 == null){
          StaticImg(configurations.positioning)
        }
        window.parent.document.getElementById('AnimationImg_1').style.animation = 'none'
        window.parent.document.getElementById('AnimationImg_2').style.animation = 'none'
        configurations.animation='off' // Сохранение Динамики/Статики фона
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
        configurations.animation='on' // Сохранение Динамики/Статики фона
      }
  }

}
/*Ползунок яркости*/
function SliderSetting(){
  let op = document.getElementById('slider_setting').value
  configurations.transparency = op/100 // Сохранение значения прозрачности
  window.parent.document.getElementById('MainBody').style.background = 'rgba('+configurations.bgColor+','+configurations.transparency+')'
}
/*Изменение положения статичных изображний*/
function StaticImg(option){
  if(option == 'around'){
    window.parent.document.getElementById('AnimationImg_1').style.left='-45%'
    window.parent.document.getElementById('AnimationImg_2').style.right='-45%'
    window.parent.document.getElementById('AnimationImg_1').style.display='block'
    window.parent.document.getElementById('AnimationImg_2').style.display='block'
  }
  else if(option == 'centre'){
    window.parent.document.getElementById('AnimationImg_1').style.left='0'
    window.parent.document.getElementById('AnimationImg_2').style.right='0'
    window.parent.document.getElementById('AnimationImg_1').style.display='block'
    window.parent.document.getElementById('AnimationImg_2').style.display='block'
  }
  else if(option == 'none'){
    window.parent.document.getElementById('AnimationImg_1').style.display='none'
    window.parent.document.getElementById('AnimationImg_2').style.display='none'
  }
  configurations.positioning=option // Сохранение значения позиционирования изображений
  localStorage.setItem('configurations', JSON.stringify(configurations))
}
