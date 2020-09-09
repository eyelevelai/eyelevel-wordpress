
let open_mob_menu = document.querySelector(".open-mob-menu");
let mob_menu = document.querySelector(".mob-menu");
let cls_mob_menu = document.querySelector(".cls-btn");
let is_menu_open = false;
if (open_mob_menu) {
	open_mob_menu.addEventListener("click", function() { menu_open() });
}
if (cls_mob_menu) {
	cls_mob_menu.addEventListener("click", function() { menu_close() });
}

function menu_open() {
  mob_menu.style.display = "block";
  setTimeout(function() { is_menu_open = true }, 20);
}
function menu_close() {
  mob_menu.style.display = "none";
  setTimeout(function() { is_menu_open = false }, 20);
}
document.querySelector("body").addEventListener("click", function(e) {
  let width = document.documentElement["clientWidth"];
  if((e.clientX < width - 200) && is_menu_open) menu_close();
});

window.addEventListener('load', function() {
  var chat1 = document.querySelector("#chatButton1");
  if (chat1) {
    if (window.toggleChat && window.supportsPassive) {
	    chat1.addEventListener("click", window.toggleChat, false);
      chat1.addEventListener("touchstart", window.toggleChat, window.supportsPassive() ? {passive : false} : false);
    } else {
      console.warn('missing toggleChat and/or supportsPassive', window.toggleChat, window.supportsPassive);
    }
  }
});
