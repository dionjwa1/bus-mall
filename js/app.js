'use strict';

let totalClicks = 0;
let clicksAllowed = 25;
let allProducts = [];
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
let myContainer = document.querySelector('section');

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
    image2.src = allProducts[randomNum2].src;
    image2.setAttribute('name', `${allProducts[randomNum2].name}`);
    image3.src = allProducts[randomNum3].src;
    image3.setAttribute('name', `${allProducts[randomNum3].name}`);
  }

}


function handleClick(event) {
  totalClicks++;
  console.log(totalClicks, 'totalClicks');
  let productClicked = event.target.name;
  console.log(productClicked);
  for (let i = 0; i < allProducts.length; i++) {
    if (productClicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }
  renderProducts();
  if (totalClicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleClick);
    renderResults();
  }
}



renderProducts();

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

myContainer.addEventListener('click', handleClick);

