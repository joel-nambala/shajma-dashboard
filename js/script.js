'use strict';

// Select DOM Elements
const sidebarLink = document.querySelectorAll('.sidebar-link');

// Change active class on click
sidebarLink.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetElement = e.target;

    sidebarLink.forEach(el => el.classList.remove('active'));
    targetElement.closest('.sidebar-link').classList.add('active');
  });
});
