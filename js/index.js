const closeBtns = Array.from(document.getElementsByClassName('btn-close'));
const loading = Array.from(document.getElementsByClassName('loading'));
const menuBtns = Array.from(document.getElementsByClassName('btn-menu'));
const overlay = document.getElementsByClassName('overlay')[0];
const techImg = document.getElementById('tech');

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
      name: 'React',
      menu: 'react'
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
      name: 'D3.js',
      menu: 'react'
    },
    {
      id: 'socketio',
      name: 'Socket.IO'
    },
    {
      id: 'highcharts',
      name: 'Highcharts',
      menu: 'full'
    },
    {
      id: 'materialize',
      name: 'Materialize',
      menu: 'full'
    },
    {
      id: 'jquery',
      name: 'jQuery',
      menu: 'front'
    },
    {
      id: 'js',
      name: 'JavaScript'
    },
    {
      id: 'oauth',
      name: 'OAuth',
      menu: 'full'
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
      tech.setAttribute('alt', `View ${newTech.name} projects`);
      if (svgs[i].menu) tech.setAttribute('data-menu', svgs[i].menu);
      else {
        tech.removeAttribute('data-menu');
        tech.setAttribute('data-action', 'Other operation');
      }
      // Unblur new tech
      toggleBlur(tech);
    }, 300);
    // Increment counter or reset to zero
    i = (i < svgs.length - 1) ? i + 1 : 0;
  }, 5000);
}

// Wake up Heroku apps
function wakeUpApps() {
  // Array of Heroku apps
  const apps = ['https://rv-interested.herokuapp.com/',
    'https://rv-bookclub.herokuapp.com/',
    'https://rv-nightlife.herokuapp.com/',
    'https://rv-stocks.herokuapp.com/',
    'https://rv-voting.herokuapp.com/',
    'https://url-shortener-rv.herokuapp.com/',
    'https://timestamp-api-rv.herokuapp.com/',
    'https://img-search-rv.herokuapp.com/',
    'https://file-size-rv.herokuapp.com/',
    'https://req-header-parser-rv.herokuapp.com/'];
  // Use Fetch API to wake up each app in background
  apps.forEach(url => fetch(url, { mode: 'no-cors' }));
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

window.onload = () => {
  // Make elements appear smoothly
  loading.forEach((e) => {
    // Delay and stagger menu button entrance
    if (e.classList.contains('btn-menu')) {
      setTimeout(() => e.classList.remove('loading'), (Math.random() * 500) + 1000);
      setTimeout(() => e.classList.add('nudge'), 5000); // Add nudge class after additional delay
    } else e.classList.remove('loading');
  });
  // Begin tech carousel and wake up Heroku apps after 6s delay
  setTimeout(() => {
    techSwap();
    wakeUpApps();
  }, 6000);
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
  // Show projects (via technologies icon)
  techImg.addEventListener('click', (e) => {
    if (e.target.dataset.menu) openMenu(e.target.dataset.menu);
    else console.log('Perform other operation');
  });
};
