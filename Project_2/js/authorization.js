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
document.getElementById('AnimationImg_1').value=1       // Статика/Динамика фона
document.getElementById('BgColor').value='0,0,0'        // Цвет фона
document.getElementById('MainBody').value=100           // Прозрачность для ползунка
