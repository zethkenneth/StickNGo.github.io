// Variables
const stickers = document.querySelector('sticker-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      clearCartBtn = document.querySelector('#clear-cart');



// Listeners

loadEventListeners();

function loadEventListeners() {
     // When a new sticker is added
     stickers.addEventListener('click', buysticker);

     // When the remove button is clicked
     shoppingCartContent.addEventListener('click', removesticker);

     // Clear Cart Btn
     clearCartBtn.addEventListener('click', clearCart);

     // Document Ready
     document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}





// Functions
function buysticker(e) {
     e.preventDefault();
     // Use delegation to find the sticker that was added
     if(e.target.classList.contains('add-to-cart')) {
          // read the sticker values
          const sticker = e.target.parentElement.parentElement;

          // read the values
          getstickerInfo(sticker);
     }
}
// Reads the HTML information of the selected sticker
function getstickerInfo(sticker) {
     // Create an Object with sticker Data
     const stickerInfo = {
          image: sticker.querySelector('img').src,
          title: sticker.querySelector('h4').textContent,
          price: sticker.querySelector('.price span').textContent,
          id: sticker.querySelector('a').getAttribute('data-id')
     }
     // Insert into the shopping cart
     addIntoCart(stickerInfo);
}
// Display the selected sticker into the shopping cart

function addIntoCart(sticker) {
     // create a <tr>
     const row = document.createElement('tr');

     // Build the template
     row.innerHTML = `
          <tr>
               <td>
                    <img src="${sticker.image}" width=100>
               </td>
               <td>${sticker.title}</td>
               <td>${sticker.price}</td>
               <td>
                    <a href="#" class="remove" data-id="${sticker.id}">X</a>
               </td>
          </tr>
     `;
     // Add into the shopping cart
     shoppingCartContent.appendChild(row);

     // Add sticker into Storage
     saveIntoStorage(sticker);
}

// Add the stickers into the local storage

function saveIntoStorage(sticker) {
     let stickers = getstickersFromStorage();

     // add the sticker into the array
     stickers.push(sticker);

     // since storage only saves strings, we need to convert JSON into String
     localStorage.setItem('stickers', JSON.stringify(stickers) );
}

// Get the contents from storage
function getstickersFromStorage() {

     let stickers;

     // if something exist on storage then we get the value, otherwise create an empty array
     if(localStorage.getItem('stickers') === null) {
          stickers = [];
     } else {
          stickers = JSON.parse(localStorage.getItem('stickers') );
     }
     return stickers;

}

// remove sticker from the dom
function removesticker(e) {
     let sticker, stickerId;

     // Remove from the dom
     if(e.target.classList.contains('remove')) {
          e.target.parentElement.parentElement.remove();
          sticker = e.target.parentElement.parentElement;
          stickerId = sticker.querySelector('a').getAttribute('data-id');
     }
     console.log(stickerId);
     // remove from the local storage
     removestickerLocalStorage(stickerId);
}
// remove from local storage
function removestickerLocalStorage(id) {
     // get the local storage data
     let stickersLS = getstickersFromStorage();

     // loop trought the array and find the index to remove
     stickersLS.forEach(function(stickerLS, index) {
          if(stickerLS.id === id) {
               stickersLS.splice(index, 1);
          }
     });

     // Add the rest of the array
     localStorage.setItem('stickers', JSON.stringify(stickersLS));
}

// Clears the shopping cart
function clearCart() {
     // shoppingCartContent.innerHTML = '';

     while(shoppingCartContent.firstChild) {
          shoppingCartContent.removeChild(shoppingCartContent.firstChild);
     }

     // Clear from Local Storage
     clearLocalStorage();
}
// Clears the whole local storage
function clearLocalStorage() {
     localStorage.clear();
}

// Loads when document is ready and print stickers into shopping cart

function getFromLocalStorage() {
     let stickersLS = getstickersFromStorage();

     // LOOP throught the stickers and print into the cart
     stickersLS.forEach(function(sticker) {
          // create the <tr>
          const row = document.createElement('tr');

          // print the content
          row.innerHTML = `
               <tr>
                    <td>
                         <img src="${sticker.image}" width=100>
                    </td>
                    <td>${sticker.title}</td>
                    <td>${sticker.price}</td>
                    <td>
                         <a href="#" class="remove" data-id="${sticker.id}">X</a>
                    </td>
               </tr>
          `;
          shoppingCartContent.appendChild(row);
     });
}