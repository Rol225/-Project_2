function StartAuthorization(){
  document.getElementById('welcome').style.marginTop='4vh'
  document.getElementById('authorization').style.visibility='visible'
  document.getElementById('authorization').style.opacity='1'
}
function EndAuthorization(){
  document.getElementById('welcome').onclick = null
  document.getElementById('welcome').style.cursor='default'
  document.getElementById('welcome').style.marginTop='-16vh'
  document.getElementById('authorization').style.transition='.2s linear'
  document.getElementById('authorization').style.visibility='hidden'
  document.getElementById('authorization').style.opacity='0'
  document.getElementById('bar').style.display="block"
}

if(!localStorage.getItem('configurations')){
  let configurations = {
    transparency: 100,      // Прозрачность фона для ползунка
    bgColor: '0,0,0',       // Цвет фона
    animation: 'off',       // Статика/Динамика фона
    positioning: 'centre'   // Позицианирование изображения
  }
  localStorage.setItem('configurations', JSON.stringify(configurations))
}

document.addEventListener("DOMContentLoaded", () => {
  configurations = JSON.parse(localStorage.getItem('configurations'))
  if(configurations.animation == 'off'){
    if(configurations.positioning == 'around'){
      window.parent.document.getElementById('AnimationImg_1').style.left='-45%'
      window.parent.document.getElementById('AnimationImg_2').style.right='-45%'
      window.parent.document.getElementById('AnimationImg_1').style.display='block'
      window.parent.document.getElementById('AnimationImg_2').style.display='block'
    }
    else if(configurations.positioning == 'centre'){
      window.parent.document.getElementById('AnimationImg_1').style.left='0'
      window.parent.document.getElementById('AnimationImg_2').style.right='0'
      window.parent.document.getElementById('AnimationImg_1').style.display='block'
      window.parent.document.getElementById('AnimationImg_2').style.display='block'
    }
    else if(configurations.positioning == 'none'){
      window.parent.document.getElementById('AnimationImg_1').style.display='none'
      window.parent.document.getElementById('AnimationImg_2').style.display='none'
    }
    document.getElementById('AnimationImg_1').style.animation = 'none'
    document.getElementById('AnimationImg_2').style.animation = 'none'
  }
  else if(configurations.animation == 'on'){
    document.getElementById('AnimationImg_1').style.animation = 'blue 90s linear infinite'
    document.getElementById('AnimationImg_2').style.animation = 'pink 90s linear infinite'
  }
  document.getElementById('MainBody').style.background = 'rgba('+configurations.bgColor+','+configurations.transparency+')'

});
