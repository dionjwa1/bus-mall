'use strict';

let totalClicks = 0;
let clicksAllowed = 25;
let allProducts = [];
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');

function Products(name, fileExtension = '.jpg') {
  this.name = name;
  this.src = `../img/${name}${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

new Products('bag');
new Products('banana');
new Products('bathroom');
new Products('boots');
new Products('breakfast');
new Products('bubblegum');
new Products('chair');
new Products('cthulhu');
new Products('dog-duck');
new Products('dragon');
new Products('pen');
new Products('pet-sweep');
new Products('scissors');
new Products('shark');
new Products('sweep', '.png');
new Products('tauntaun');
new Products('unicorn');
new Products('usb', '.gif');
new Products('water-can');
new Products('wine-glass');
// *DevMod Math.Random
function getRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  let randomNum1 = getRandomProduct();
  let randomNum2 = getRandomProduct();
  let randomNum3 = getRandomProduct();
  if (randomNum1 === randomNum2 || randomNum3 === randomNum1 || randomNum2 === randomNum3) {
    renderProducts();
  } else {
    image1.src = allProducts[randomNum1].src;
    image1.setAttribute('name', `${allProducts[randomNum1].name}`);
    allProducts[randomNum1].views++;
    allProducts[randomNum2].views++;
    allProducts[randomNum3].views++;
    console.log(allProducts[randomNum1]);
    image2.src = allProducts[randomNum2].src;
    image3.src = allProducts[randomNum3].src;

    image1.addEventListener('click', handleClick);
    image2.addEventListener('click', handleClick);
    image3.addEventListener('click', handleClick);
  }

}

function renderResults() {
  let myList = document.querySelector('ul');
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} votes, and was seen ${allProducts[i].clicks} times`;
    myList.appendChild(li);
  }
}
function handleClick(event) {
  totalClicks++;
  let productClicked = event.target.title;

  for (let i = 0; i < allProducts.length; i++)
    if (productClicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  renderProducts();
  if (totalClicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleClick);
    renderResults();
  }
}
function handleButtonClick(event) {
  if (totalClicks === clicksAllowed) {
    renderResults();
  }

}

renderProducts();

myContainer.addEventListener('click', handleClick);
myButton.addEventListener('click', handleButtonClick);
