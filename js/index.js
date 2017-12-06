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
      name: 'NodeJS',
      menu: 'full'
    },
    {
      id: 'react',
      name: 'React',
      menu: 'react'
    },
    {
      id: 'sass',
      name: 'Sass',
      link: 'https://codepen.io/rvrvrv/pen/VrYQXK'
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      menu: 'full'
    },
    {
      id: 'd3',
      name: 'D3.js',
      menu: 'react'
    },
    {
      id: 'socketio',
      name: 'Socket.IO',
      link: 'https://rv-stocks.herokuapp.com/'
    },
    {
      id: 'highcharts',
      name: 'Highcharts',
      link: 'https://rv-stocks.herokuapp.com/'
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
      tech.setAttribute('alt', newTech.name);
      tech.style.cursor = 'pointer';
      if (svgs[i].menu) {
        // If new tech has a menu prop, replace data-menu and remove data-link
        tech.setAttribute('data-menu', svgs[i].menu);
        tech.removeAttribute('data-link');
      } else if (svgs[i].link) {
        // If new tech has a link prop, replace data-link and remove data-menu
        tech.setAttribute('data-link', svgs[i].link);
        tech.removeAttribute('data-menu');
      } else {
        // If new tech has no menu or link prop, remove previous attributes
        tech.removeAttribute('data-menu');
        tech.removeAttribute('data-link');
        tech.style.cursor = 'default';
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
  loading.forEach((el) => {
    // Delay and stagger menu button entrance
    if (el.classList.contains('btn-menu')) {
      setTimeout(() => el.classList.remove('loading'), (Math.random() * 500) + 1000);
      setTimeout(() => el.classList.add('nudge'), 5000); // Add nudge class after additional delay
    } else el.classList.remove('loading');
  });
  // Begin tech carousel and wake up Heroku apps after 6s delay
  setTimeout(() => {
    techSwap();
    wakeUpApps();
  }, 6000);
  /* Click handlers: */
  // Open menu
  menuBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // After any menu button is clicked, remove the nudge animation from all
      if (btn.classList.contains('nudge')) menuBtns.forEach(b => b.classList.remove('nudge'));
      // Call openMenu based on which button is clicked
      openMenu(btn.id.slice(3).toLowerCase());
    });
  });
  // Close menu (via close button)
  closeBtns.forEach(btn => btn.addEventListener('click', closeMenu));
  // Close menu (via overlay)
  overlay.addEventListener('click', closeMenu);
  // Show projects (via technologies icon)
  techImg.addEventListener('click', (e) => {
    // Open a menu
    if (e.target.dataset.menu) openMenu(e.target.dataset.menu);
    // Open a specific project
    else if (e.target.dataset.link) window.open(e.target.dataset.link, '_blank');
    // Make menu buttons glow
    else {
      menuBtns.forEach((btn) => {
        btn.classList.remove('nudge');
        btn.classList.add('glow');
        setTimeout(() => btn.classList.remove('glow'), 3000);
      });
    }
  });
};
