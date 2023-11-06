$.cookie = function() {
  function get(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    
    for (let i=0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }
  
  function set(name,value,days) {
    if (days) {
      let date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      let expires = "; expires="+date.toGMTString();
    } else {let expires = "";}
    
    document.cookie = name+"="+value+expires+"; path=/";
  }
  
  function xdelete(name) {
    set(name, null, -1);
  }
  
  if (arguments.length == 1) {
    return get(arguments[0]);
    
  } else if (arguments[1] == null) {
    xdelete(arguments[0]);
    
  } else {
    set(arguments[0], arguments[1], arguments[2]);
  }
}

function rand(num) {
  return Math.floor(Math.random(num) * num);
}

function formattedTime(secs) {
  let sec = secs % 60,
      min = ((secs - sec) / 60) % 60,
      hrs = ((secs - (sec + (min * 60))) / 3600) % 60;
  return formatTimePart(hrs) +':'+ formatTimePart(min) +':'+ formatTimePart(sec);
}

function formatTimePart(t) {
  return (t < 10) ? '0'+ t : t;
}

function c_log() {
  if (console.log) console.log(arguments);
}