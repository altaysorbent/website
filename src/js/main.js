var scrollpos = window.scrollY;
const header = document.getElementById('header');
const logo = document.getElementById('logo');
const navcontent = document.getElementById('nav-content');
const navaction = document.getElementById('navAction');
const toToggle = document.querySelectorAll('.toggleColour');

document.addEventListener('scroll', function () {

  /*Apply classes for slide in bar*/
  scrollpos = window.scrollY;

  if (scrollpos > 10) {
    logo.src = '/images/logo_black.png';
    header.classList.add('bg-white', 'border-b');
    //Use to switch toggleColour colours
    for (let i = 0; i < toToggle.length; i++) {
      toToggle[i].classList.add('text-gray-800');
      toToggle[i].classList.remove('text-white');
    }
    header.classList.add('shadow');
    navcontent.classList.remove('bg-gray-100');
    navcontent.classList.add('bg-white');
  } else {
    logo.src = '/images/logo_white.png';
    header.classList.remove('bg-white', 'border-b');
    //Use to switch toggleColour colours
    for (let i = 0; i < toToggle.length; i++) {
      toToggle[i].classList.add('text-white');
      toToggle[i].classList.remove('text-gray-800');
    }

    header.classList.remove('shadow');
    navcontent.classList.remove('bg-white');
    navcontent.classList.add('bg-gray-100');

  }

});

/*Toggle dropdown list*/
/*https://gist.github.com/slavapas/593e8e50cf4cc16ac972afcbad4f70c8*/

let navMenuDiv = document.getElementById('nav-content');
let navMenu = document.getElementById('nav-toggle');

document.onclick = check;

function check (e) {
  let target = (e && e.target) || (event && event.srcElement);

  //Nav Menu
  if (!checkParent(target, navMenuDiv)) {
    // click NOT on the menu
    if (checkParent(target, navMenu)) {
      // click on the link
      if (navMenuDiv.classList.contains('hidden')) {
        navMenuDiv.classList.remove('hidden');
      } else { navMenuDiv.classList.add('hidden'); }
    } else {
      // click both outside link and outside menu, hide menu
      navMenuDiv.classList.add('hidden');
    }
  }

}

function checkParent (t, elm) {
  while (t.parentNode) {
    if (t == elm) { return true; }
    t = t.parentNode;
  }
  return false;
}

ymaps.ready(init);

function init () {
  let myMap = new ymaps.Map('map', {
    center: [49.965184, 82.610],
    zoom: 16,
    controls: [],
  });
  myMap.behaviors.disable(['drag', 'multiTouch', 'scrollZoom', 'dblClickZoom']);

  myPlacemark = new ymaps.Placemark([49.965184, 82.611933], {
  }, {
    preset: 'islands#redMedicalIcon',
  });

  myMap.geoObjects.add(myPlacemark);
}