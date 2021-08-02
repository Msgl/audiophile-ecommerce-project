'use strict';

//MOBILE NAVIGATION MENU TOGGLE BUTTON
function toggleBtn() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('active-btn');

  const main = document.querySelector('.tint');
  main.classList.toggle('color-tint');
}

//PRODUCT INCREASE QUANTITY BUTTON
function increaseQuantity(elem) {
  elem.previousElementSibling.value++;
}

//PRODUCT DECREASE QUANTITY BUTTON
function decreaseQuantity(elem) {
  if (parseInt(elem.nextElementSibling.value) - 1 < 1) {
    alert('Cannot add less than 1 product');
    elem.nextElementSibling.value = 1;
  } else {
    parseInt(elem.nextElementSibling.value--);
  }
}

//GO BACK BUTTON
function goBackButton() {
  window.history.back();
}
