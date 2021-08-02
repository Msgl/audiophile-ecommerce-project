'use strict';

import { products } from '/products.js';

const cartModal = document.querySelector('.cart-modal');
const cartButton = document.querySelector('.cart-button');

const clearStorage = document.querySelector('.clear-storage-button');
const addCartButton = document.querySelector('.add-cart');

const userProducts = document.querySelector('.user-products');
const cartItems = userProducts.querySelectorAll('.cart-name');
const cartQuantity = userProducts.querySelectorAll('.cart-quantity');
const totalPrice = document.querySelector('.total-price');

loadCart();
storageQuantity();

//CART: OPEN/CLOSE THE CART
cartButton.addEventListener('click', () => {
  cartModal.classList.toggle('cart-content-hide');
  cartModal.classList.toggle('cart-shadow');
});

//CART: DELETE ALL ITEMS FROM CART + LOCALSTORAGE
clearStorage.addEventListener('click', () => {
  localStorage.clear();
  userProducts.remove();
  location.reload();
});

//CART: LOAD ITEMS FROM LOCALSTORAGE
function loadCart() {
  //CHECK IF LOCALSTORAGE IS EMPTY
  if (localStorage.getItem('storageItems') != null) {
    console.log('localstorage is populated');
    let savedProducts = localStorage.getItem('storageItems');
    savedProducts = JSON.parse(savedProducts);

    for (let i = 0; i < Object.keys(savedProducts).length; i++) {
      let item = Object.keys(savedProducts)[i];
      //Populate Cart with the saved localstorage items
      let nodeDiv = document.createElement('div');
      let nameAndPriceDiv = document.createElement('div');
      let nodeName = document.createElement('h6');
      nodeName.classList.add('cart-name');
      let nodePrice = document.createElement('p');
      let nodeImage = document.createElement('img');
      nodeImage.src = savedProducts[item].image.mobile;
      nodeImage.alt = 'product in cart named ' + savedProducts[item].name;
      nodeImage.style.width = '70px';

      let quantityDiv = document.createElement('div');
      quantityDiv.style.display = 'flex';
      let nodeDecrement = document.createElement('button');
      nodeDecrement.classList.add('myButton');
      nodeDecrement.classList.add('quantity-button');
      nodeDecrement.classList.add('cart-decrease');

      nodeDecrement.textContent = '-';
      nodeDecrement.style.width = '25px';
      let nodeIncrement = document.createElement('button');
      nodeIncrement.classList.add('myButton');

      nodeIncrement.classList.add('quantity-button');
      nodeIncrement.classList.add('cart-increase');

      nodeIncrement.textContent = '+';
      nodeIncrement.style.width = '25px';

      let nodeQuantity = document.createElement('p');
      nodeQuantity.classList.add('cart-quantity');

      nodeQuantity.style.width = '25px';
      //
      //

      //increase + decrease buttons
      nodeDecrement.onclick = function (event) {
        if (parseInt(this.nextElementSibling.innerHTML) - 1 == 0) {
          this.parentElement.parentElement.remove();

          let prodCost = parseInt(savedProducts[item].price);
          let cost = localStorage.getItem('totalCost');
          cost = parseInt(cost);
          localStorage.setItem('totalCost', cost - prodCost);

          let storageQuantity = localStorage.getItem('storageQuantity');
          storageQuantity = parseInt(storageQuantity);
          storageQuantity = parseInt(storageQuantity) - 1;
          localStorage.setItem('storageQuantity', storageQuantity);

          delete savedProducts[item];
          localStorage.setItem('storageItems', JSON.stringify(savedProducts));
          location.reload();
        } else {
          this.nextElementSibling.innerHTML =
            parseInt(this.nextElementSibling.innerHTML) - 1;

          savedProducts[item].quantity = this.nextElementSibling.innerHTML;

          let newQuantity = parseInt(savedProducts[item].quantity);

          if (savedProducts[item].slug) {
            savedProducts[item].quantity = newQuantity;
          }
          let prodCost = parseInt(savedProducts[item].price);

          let cost = localStorage.getItem('totalCost');

          cost = parseInt(cost);

          localStorage.setItem('totalCost', cost - prodCost);

          let storageQuantity = localStorage.getItem('storageQuantity');
          storageQuantity = parseInt(storageQuantity);
          storageQuantity = parseInt(storageQuantity) - 1;

          localStorage.setItem('storageQuantity', storageQuantity);
          location.reload();
          localStorage.setItem('storageItems', JSON.stringify(savedProducts));
        }
      };

      nodeIncrement.onclick = function (event) {
        this.previousElementSibling.innerHTML =
          parseInt(this.previousElementSibling.innerHTML) + 1;

        savedProducts[item].quantity = this.previousElementSibling.innerHTML;

        let newQuantity = parseInt(savedProducts[item].quantity);

        if (savedProducts[item].slug) {
          savedProducts[item].quantity = newQuantity;
        }
        let prodCost = parseInt(savedProducts[item].price);

        let cost = localStorage.getItem('totalCost');

        cost = parseInt(cost);

        localStorage.setItem('totalCost', cost + prodCost);

        let storageQuantity = localStorage.getItem('storageQuantity');
        storageQuantity = parseInt(storageQuantity);
        storageQuantity = storageQuantity + 1;

        localStorage.setItem('storageQuantity', storageQuantity);
        location.reload();
        localStorage.setItem('storageItems', JSON.stringify(savedProducts));
      };

      //createTextNode - get the name/price from JSON
      let getName = document.createTextNode(savedProducts[item].slug);
      let getPrice = document.createTextNode(savedProducts[item].price);
      let getQuantity = document.createTextNode(savedProducts[item].quantity);

      //appendChild() - link the nodes we created with the data from JSON
      nodeName.appendChild(getName);
      nodePrice.appendChild(getPrice);
      nodeQuantity.appendChild(getQuantity);
      nameAndPriceDiv.append(nodeName, nodePrice);
      nameAndPriceDiv.classList.add('name-price');

      quantityDiv.append(nodeDecrement, nodeQuantity, nodeIncrement);
      //append to a div so that each product lives in a separate div
      nodeDiv.append(nodeImage, nameAndPriceDiv, quantityDiv);
      nodeDiv.classList.add('new-product');
      //append everything to the cart
      userProducts.appendChild(nodeDiv);

      //CART: CALCULATE TOTAL PRICE

      if (localStorage.getItem('totalCost') == null) {
        totalPrice.textContent = '$' + 0;
      } else {
        totalPrice.textContent = '$' + localStorage.getItem('totalCost');
      }
    }
  } else {
    console.log('localstorage is empty');
  }
}

//ADD-TO-CART BUTTON: ADD ITEMS
if (addCartButton !== null) {
  //Loop through the .add-cart button + grab the json info
  addCartButton.addEventListener('click', () => {
    let productName = addCartButton.getAttribute('data-product-name');

    for (let i = 0; i < products.length; i++) {
      if (productName == products[i].name) {
        let quantity = parseInt(
          addCartButton.nextElementSibling.querySelector('input').value
        ); //Get the sibling (div) of cart button. Then get the child of the div that is input. Get the value of input. Convert this to number.

        addToCart(products[i]); //ADD/UPDATE CART
        addToLocalStorage(products[i], quantity); //ADD/UPDATE ITEM AND IT'S QUANTITY TO LOCALSTORAGE
        storageQuantity(quantity); //TOTAL QUANTITY OF ITEMS IN CART
        totalCost(products[i], quantity); //UPDATE TOTAL COST
        location.reload();
      }
    }
  });
}

//CART: ADD/UPDATE ITEMS
function addToCart(item) {
  let localStorageProducts = localStorage.getItem('storageItems');
  localStorageProducts = JSON.parse(localStorageProducts);

  //CHECK IF CART IS EMPTY
  if (cartItems.length < 1) {
    loadCart();
  }

  //CHECK IF CART IS POPULATED
  else {
    //CHECK IF ITEM ALREADY EXISTS
    for (let i = 0; i < cartItems.length; i++) {
      //PRODUCT ALREADY EXISTS
      if (cartItems[i].innerHTML == item.name) {
        cartQuantity[i].innerHTML = localStorageProducts[item.name].quantity;
        location.reload();
      }
      //NEW PRODUCT
      else if (cartItems[i].innerHTML !== item.name) {
        location.reload();
      }
    }
  }
}

//LOCALSTORAGE: ADD ITEM + UPDATE ITEM'S QUANTITY
function addToLocalStorage(item, itemQuantity) {
  let localStorageProducts = localStorage.getItem('storageItems');
  localStorageProducts = JSON.parse(localStorageProducts);

  if (localStorageProducts == null) {
    localStorageProducts = {
      [item.name]: item,
    };
    localStorageProducts[item.name].quantity = itemQuantity;
  } else if (localStorageProducts[item.name] == undefined) {
    localStorageProducts = {
      ...localStorageProducts,
      [item.name]: item,
    };
    localStorageProducts[item.name].quantity = itemQuantity;
  } else {
    localStorageProducts[item.name].quantity =
      localStorageProducts[item.name].quantity + itemQuantity;
  }

  localStorage.setItem('storageItems', JSON.stringify(localStorageProducts));
}

//NAVBAR + CART + LOCALSTORAGE: CREATE/UPDATE QUANTITY PROPERTY IN LOCALSTORAGE
function storageQuantity(quantity) {
  let storageQuantity = localStorage.getItem('storageQuantity');
  storageQuantity = parseInt(storageQuantity);

  //CHECK IF STORAGE QUANTITY EXISTS (= IF IT DOES IT MEANS THAT THERE ARE ITEMS IN CART)
  if (storageQuantity) {
    //CHECK IF QUANTITY EXISTS (= IF IT DOES IT MEANS THAT THE FUNCTION storageQuantity HAS BEEN CALLED WHEN CLICKING ON THE "ADD TO CART" BUTTON. IT ALSO MEANS THAT THE PRODUCT EXISTS SO WE HAVE TO UPDATE ITS QUANTITY)
    if (quantity == null) {
      document.querySelector('.count-products-cart-nav').textContent =
        storageQuantity; //NAVBAR
      document.querySelector('.count-products-cart').textContent =
        storageQuantity; //IN CART NEXT TO CART (number)
    } else {
      //IF QUANTITY DOES NOT EXIST IT MEANS THAT THE FUNCTION storageQuantity HAS BEEN CALLED WHEN THE PAGE IS LOADED
      storageQuantity = storageQuantity + quantity;
      localStorage.setItem('storageQuantity', storageQuantity);
    }
    //IF storageQuantity DOES NOT EXISTS, IT MEANS THAT THE PRODUCT IS NEW, SO WE CREATE THE QUANTITY PROPERTY AND WE POPULATE IT FOR THE ITEM
  } else {
    localStorage.setItem('storageQuantity', quantity);
    document.querySelector('.count-products-cart').textContent = quantity;
  }
}

//LOCALSTORAGE + CART: CALCULATE TOTAL COST
function totalCost(product, productQuantity) {
  let cost = localStorage.getItem('totalCost');

  if (cost != null) {
    cost = parseInt(cost);
    localStorage.setItem('totalCost', cost + product.price * productQuantity);
  } else {
    localStorage.setItem('totalCost', product.price * productQuantity);
  }
}
