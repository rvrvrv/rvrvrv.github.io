const closeBtns = Array.from(document.getElementsByClassName('btn-close'));
const loading = Array.from(document.getElementsByClassName('loading'));
const menuBtns = Array.from(document.getElementsByClassName('btn-menu'));
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
  }, 3000);
}

// Display project menus
function openMenu(menu) {
  // Display overlay
  overlay.style.opacity = 1;
  overlay.style.top = 0;
  // Remove 'hidden' class from selected menu
  document.getElementsByClassName(`menu-${menu}`)[0].classList.remove('hidden');
}

// Close project menus
function closeMenu() {
  document.querySelector('.menu:not(.hidden)').classList.add('hidden');
  overlay.style.opacity = 0;
  overlay.style.top = '-100%';
}

document.addEventListener('DOMContentLoaded', () => {
  // Make elements appear smoothly
  loading.forEach((e) => {
    setTimeout(() => e.classList.remove('loading'), (Math.random() * 500) + 700);
    // Add nudge class to menu buttons after 3s delay
    if (e.classList.contains('btn-menu')) setTimeout(() => e.classList.add('nudge'), 3000);
  });
  // Begin tech carousel after 3s delay
  setTimeout(() => techSwap(), 3000);

  /* Click handlers: */
  // Open menu
  menuBtns.forEach((e) => {
    e.addEventListener('click', () => {
      // After any menu button is clicked, remove the nudge animation from all
      if (e.classList.contains('nudge')) menuBtns.forEach(btn => btn.classList.remove('nudge'));
      // Call openMenu based on which button is clicked
      openMenu(e.id.slice(3).toLowerCase());
    });
  });
  // Close menu (via close button)
  closeBtns.forEach(e => e.addEventListener('click', closeMenu));
  // Close menu (via overlay)
  overlay.addEventListener('click', closeMenu);
});
