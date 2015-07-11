$(document).on 'page:change', ->
  for player in document.getElementsByClassName 'video-js'
    videojs player