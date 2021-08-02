'use strict';

const summaryTotalPrice = document.querySelector('.summary-total-price');
const summaryVatPrice = document.querySelector('.summary-vat-price');
const summaryShippingPrice = document.querySelector('.summary-shipping-price');
const summaryGrandTotalPrice = document.querySelector(
  '.summary-grand-total-price'
);

function summary() {
  if (localStorage.getItem('totalCost') == null) {
    summaryTotalPrice.textContent = '$ ' + 0;
    summaryVatPrice.textContent = '$ ' + 0;
    summaryShippingPrice.textContent = '$ ' + 0;
    summaryGrandTotalPrice.textContent = '$ ' + 0;
  } else {
    const cost = parseInt(localStorage.getItem('totalCost'));
    const shipping = 50;
    summaryShippingPrice.textContent = '$ ' + shipping;
    summaryTotalPrice.textContent = '$ ' + cost;
    summaryVatPrice.textContent = '$ ' + ((20 / 100) * cost).toFixed(2);
    summaryGrandTotalPrice.textContent = '$ ' + (cost + shipping);
  }
}

const summaryUserProducts = document.querySelector('.summary-user-products');

function summaryImages() {
  if (localStorage.getItem('storageItems') != null) {
    console.log('localstorage is populated');
    let savedProducts = localStorage.getItem('storageItems');
    savedProducts = JSON.parse(savedProducts);

    for (let i = 0; i < Object.keys(savedProducts).length; i++) {
      let item = Object.keys(savedProducts)[i];

      //Populate Summary with the saved localstorage items
      let nodeDiv = document.createElement('div');
      let nameAndPriceDiv = document.createElement('div');
      let nodeName = document.createElement('h6');
      nodeName.classList.add('cart-name');
      let nodePrice = document.createElement('p');
      let nodeImage = document.createElement('img');
      nodeImage.src = savedProducts[item].image.mobile;
      nodeImage.alt = 'product in cart named ' + savedProducts[item].name;
      nodeImage.style.width = '70px';
      let nodeQuantity = document.createElement('p');
      nodeQuantity.classList.add('summary-quantity');

      //createTextNode - get the name/price from JSON
      let getName = document.createTextNode(savedProducts[item].slug);
      let getPrice = document.createTextNode('$ ' + savedProducts[item].price);
      let getQuantity = document.createTextNode(
        'x ' + savedProducts[item].quantity
      );

      //appendChild() - link the nodes we created with the data from JSON
      nodeName.appendChild(getName);
      nodePrice.appendChild(getPrice);
      nodeQuantity.appendChild(getQuantity);
      nameAndPriceDiv.append(nodeName, nodePrice);
      nameAndPriceDiv.classList.add('name-price');

      //append to a div so that each product lives in a separate div
      nodeDiv.append(nodeImage, nameAndPriceDiv, nodeQuantity);
      nodeDiv.classList.add('new-product');

      //append everything to the cart
      summaryUserProducts.appendChild(nodeDiv);
    }
  } else {
    console.log('localstorage is empty');
  }
}

summaryImages();
summary();

//Check validity - user input & show error message

function checkInputValidity(elem) {
  console.log(elem.checkValidity());
  if (elem.checkValidity()) {
    elem.previousElementSibling.style.color = '#101010';
    elem.previousElementSibling.classList.remove('wrong-format-error');
  } else {
    elem.previousElementSibling.style.color = '#cd2c2c';
    elem.previousElementSibling.classList.add('wrong-format-error');
  }
}

const orderModal = document.querySelector('.order-modal');

function openModal() {
  window.scrollTo(0, 0);
  orderModal.style.display = 'block';
}
