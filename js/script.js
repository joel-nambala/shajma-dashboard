'use strict';

// Select DOM Elements
const sidebarLink = document.querySelectorAll('.sidebar-link');
const recentOrdersBody = document.querySelector('.recent-orders-data');
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');
const sidebar = document.querySelector('.sidebar');

// State variables

// prettier-ignore
const codes = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h'];

// Change active class on click
sidebarLink.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetElement = e.target;

    sidebarLink.forEach(el => el.classList.remove('active'));
    targetElement.closest('.sidebar-link').classList.add('active');

    // sidebar.style.transform = 'translateX(-100%)';
  });
});

// Generate random ids
const generateRandomId = function () {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 1; i <= 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
console.log(generateRandomId());

// String manipulation
const stringUppercase = function (str) {
  return str[0].toUpperCase() + str.slice(1);
};

// Number formatter
const currencyFormatter = function (currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(currency);
};

// Get data from the json file
const getRecentOrders = async function () {
  try {
    // Get the data from the json file
    const response = await fetch('./data/data.json');

    // Covert to a json string
    const orders = await response.json();

    // Loop over the data
    orders.forEach(function (order, i, arr) {
      // Generate a class
      let domClass;

      if (order.status === 'shipped') {
        domClass = 'success';
      } else if (order.status === 'pending') {
        domClass = 'warning';
      } else {
        domClass = 'danger';
      }

      // Generate markup
      const html = `
        <tr>
          <td>${order.name}</td>
          <td>${order.code.toUpperCase()}</td>
          <td>${currencyFormatter(order.price)}</td>
          <td class="${domClass}">${stringUppercase(order.status)}</td>
          <td>${stringUppercase(order.payment)}</td>
        </tr>
      `;

      // Append to the UI
      recentOrdersBody.insertAdjacentHTML('beforeend', html);
    });
  } catch (error) {
    console.error(error.message);
  }
};
getRecentOrders();

menuBtn.addEventListener('click', function () {
  sidebar.style.transform = 'translateX(0)';
});

closeBtn.addEventListener('click', function () {
  sidebar.style.transform = 'translateX(-100%)';
});
