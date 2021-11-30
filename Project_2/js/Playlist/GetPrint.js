function AllPlaylistsPrint(device, data){
  let deviceText
  if(device == 'SMSDevice'){deviceText='СМС'}
  if(device == 'EmailDevice'){deviceText='E-mail'}
  if(device == 'SpeakersDevice'){deviceText='Динамики'}
  if(device == 'ScoreboardDevice'){deviceText='Табло'}
  document.getElementById('search_section').innerHTML = '<div class="search_module"><input type="text" name="" value="" class="search_input" placeholder="Найти..."><div class="rtrey"></div></div><div class="search_device">'+deviceText+'</div>'


  document.getElementById('list_playlist').innerHTML = '<div class="playlist playlist-add"><button type="button" name="button" id="" class="playlist_add">+</button></div>';
  for (let i in data.playlist){
    let color;
    let verification
    if(data.playlist[i].verification == 0){
      color = '<div class="playlist playlist-red">'
      verification = 'Не допущено'
    }
    else if(data.playlist[i].verification == 1){
      color = '<div class="playlist playlist-green">'
      verification = 'Допущено'
    }
    else if(data.playlist[i].verification == 2){
      color = '<div class="playlist playlist-yellow">'
      verification = 'Не проверенно'
    }
    document.getElementById('list_playlist').innerHTML += color+'<div class="playlist_title">'+data.playlist[i].name+'</div><div class="playlist_verification">'+verification+'</div><div class="playlist_description"><span class="playlist_description_static">Описание: </span><span class="playlist_description_text">'+data.playlist[i].description+'</span></div></div>';
  }

}
