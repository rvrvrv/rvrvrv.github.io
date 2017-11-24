const overlay = document.getElementsByClassName('overlay')[0];

// Toggle blur animation
function toggleBlur(el) {
  el.classList.toggle('focus-in');
  el.classList.toggle('blur-out');
}

// Tech carousel
function techSwap() {
  // Array of SVG images in tech carousel
  const svgs = [
    {
      id: 'nodejs',
      name: 'NodeJS'
    },
    {
      id: 'react',
      name: 'React'
    },
    {
      id: 'sass',
      name: 'Sass'
    },
    {
      id: 'mongodb',
      name: 'MongoDB'
    },
    {
      id: 'd3',
      name: 'D3.js'
    },
    {
      id: 'socketio',
      name: 'Socket.IO'
    },
    {
      id: 'highcharts',
      name: 'Highcharts'
    },
    {
      id: 'materialize',
      name: 'Materialize'
    },
    {
      id: 'jquery',
      name: 'jQuery'
    },
    {
      id: 'js',
      name: 'JavaScript'
    },
    {
      id: 'oauth',
      name: 'OAuth'
    },
    {
      id: 'bootstrap',
      name: 'Bootstrap'
    }
  ];
  const url = './svg/';
  const tech = document.getElementById('tech');
  let i = 0;
  setInterval(() => {
    // Blur out current tech
    toggleBlur(tech);
    // After delay (for blur animation), replace current tech
    setTimeout(() => {
      const newTech = svgs[i];
      tech.setAttribute('src', `${url}${newTech.id}.svg`);
      tech.setAttribute('alt', `Click to view ${newTech.name} projects`);
      // Unblur new tech
      toggleBlur(tech);
    }, 300);
    // Increment counter or reset to zero
    i = (i < svgs.length - 1) ? i + 1 : 0;
  }, 2000);
}

// Display project menus
function openMenu(menu) {
  // Display overlay
  overlay.style.opacity = 1;
  overlay.style.display = 'block';
  // Remove 'hidden' class from selected menu
  document.getElementsByClassName(`menu-${menu}`)[0].classList.remove('hidden');


}

// Trigger animations after page loads
document.addEventListener('DOMContentLoaded', () => {
  // Begin tech carousel
  techSwap();
  // Make elements appear smoothly
  Array.from(document.getElementsByClassName('loading')).forEach(e => e.classList.remove('loading'));
  // Create click-handlers for menu buttons
  Array.from(document.getElementsByTagName('button')).forEach((e) => {
    e.addEventListener('click', () => openMenu(e.id.slice(3).toLowerCase()));
  });
  // When overlay is clicked, close menu and hide overlay
  overlay.addEventListener('click', () => {
    document.querySelector('.menu:not(.hidden)').classList.add('hidden');
    overlay.style.opacity = 0;
    overlay.style.display = 'none';
  });
});

