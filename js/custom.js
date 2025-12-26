//Loader

$(window).bind("load", function () {
  $(".loader-screen").hide();
});



(function () {
  const body = document.body;
  const root = document.documentElement;
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('main');
  const backdrop = document.getElementById('sidebarBackdrop');

  const btnMobileMenu = document.getElementById('btnMobileMenu');
  const btnCollapse = document.getElementById('btnCollapse');
  const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
  const btnTheme = document.getElementById('btnTheme');
  const btnFullscreen = document.getElementById('btnFullscreen');
  const swatches = document.querySelectorAll('.btn-theme');

  // Preferences
  // let prefs = { collapsed: false, dark: false, primary: getComputedStyle(root).getPropertyValue('--primary').trim() };

  // load prefs
  try {
    const stored = JSON.parse(localStorage.getItem('dashboard_prefs') || '{}');
    prefs = Object.assign(prefs, stored || {});
  } catch (e) { }

  // Apply initial states
  if (prefs.dark) {
    body.classList.add('dark');
    btnTheme.setAttribute('aria-pressed', 'true');
    btnTheme.querySelector('i').className = 'bi bi-sun-fill';
  }
  if (prefs.collapsed && window.innerWidth >= 992) {
    sidebar.classList.add('collapsed');
    main.classList.add('collapsed');
    document.querySelectorAll('.content-wrap')[0]?.classList?.add('collapsed');
    btnCollapse.setAttribute('aria-pressed', 'true');
  }
  root.style.setProperty('--primary', prefs.primary);

  // Utility: save prefs
  function savePrefs() {
    try { localStorage.setItem('dashboard_prefs', JSON.stringify(prefs)); } catch (e) { }
  }

  // MOBILE: open/close sidebar (overlay)
  function openMobileSidebar() {
    sidebar.classList.add('mobile-show');
    backdrop.classList.add('show');
    backdrop.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
  function closeMobileSidebar() {
    sidebar.classList.remove('mobile-show');
    backdrop.classList.remove('show');
    backdrop.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }
  btnMobileMenu.addEventListener('click', openMobileSidebar);
  backdrop.addEventListener('click', closeMobileSidebar);

  // COLLAPSE (desktop)
  function toggleCollapse() {
    const isCollapsed = sidebar.classList.toggle('collapsed');
    if (window.innerWidth >= 992) {
      document.querySelector('.content-wrap').classList.toggle('collapsed', isCollapsed);
    }
    btnCollapse.setAttribute('aria-pressed', isCollapsed ? 'true' : 'false');
    sidebarCollapseBtn.setAttribute('aria-pressed', isCollapsed ? 'true' : 'false');
    sidebarCollapseBtn.querySelector('i').className = isCollapsed ? 'bi bi-chevron-right' : 'bi bi-chevron-left';
    prefs.collapsed = isCollapsed;
    savePrefs();
  }
  btnCollapse.addEventListener('click', toggleCollapse);
  sidebarCollapseBtn.addEventListener('click', toggleCollapse);

  // Remove all active classes on load
  sidebar.querySelectorAll('.sidebar-link, .subitem').forEach(a => a.classList.remove('active'));

  // Clicking sidebar links: set active; close mobile overlay for small screens
  sidebar.querySelectorAll('.sidebar-link, .subitem').forEach(a => {
    a.addEventListener('click', function () {
      if (a.classList.contains('sidebar-link')) {
        sidebar.querySelectorAll('.sidebar-link, .submenu').forEach(x => x.classList.remove('active'));
        // a.classList.add('active');
      }
      if (window.innerWidth < 992) closeMobileSidebar();
    });
  });

  // Submenu open/close helpers
  function closeSubmenu(subEl) {
    subEl.classList.remove('show');
    subEl.setAttribute('aria-hidden', 'true');
    const toggleBtn = document.querySelector(`.js-sub-toggle[data-target="${subEl.id}"]`);
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.querySelector('.caret')?.classList.remove('rotate');
    }
  }
  function openSubmenu(subEl, toggleBtn) {
    subEl.classList.add('show');
    toggleBtn.setAttribute('aria-expanded', 'true');
    subEl.setAttribute('aria-hidden', 'false');
    toggleBtn.querySelector('.caret')?.classList.add('rotate');
  }

  // Submenu toggles (Accordion)
  document.querySelectorAll('.js-sub-toggle').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.dataset.target;
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const isCurrentlyOpen = targetEl.classList.contains('show');

      // Close all top-level submenus except the clicked one
      document.querySelectorAll('.sidebar > .nav > .nav-item > .submenu.show').forEach(openSub => {
        if (openSub !== targetEl) closeSubmenu(openSub);
      });

      // Toggle clicked submenu
      if (!isCurrentlyOpen) openSubmenu(targetEl, this);
      else closeSubmenu(targetEl);

      // Re-assert nested submenus that were already open
      if (!isCurrentlyOpen) {
        targetEl.querySelectorAll('.submenu.show').forEach(nestedSub => {
          const nestedBtn = document.querySelector(`.js-sub-toggle[data-target="${nestedSub.id}"]`);
          if (nestedBtn) openSubmenu(nestedSub, nestedBtn);
        });
      }
    });
  });

  // Theme toggle
  // btnTheme.addEventListener('click', function () {
  //   const isDark = body.classList.toggle('dark');
  //   btnTheme.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  //   btnTheme.querySelector('i').className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars';
  //   prefs.dark = isDark;
  //   savePrefs();
  // });

  // Color swatches
  swatches.forEach(s => {
    s.addEventListener('click', function () {
      const color = s.dataset.color;
      if (color) { root.style.setProperty('--primary', color); prefs.primary = color; savePrefs(); }
    });
  });

  // Fullscreen toggle
  btnFullscreen.addEventListener('click', async function () {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch (e) { console.warn('Fullscreen error', e); }
  });

  // Close mobile sidebar on resize
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 992) {
      closeMobileSidebar();
      document.querySelector('.content-wrap').classList.toggle('collapsed', sidebar.classList.contains('collapsed'));
    }
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('mobile-show')) closeMobileSidebar();
    if (e.ctrlKey && e.key.toLowerCase() === 'k' && window.innerWidth >= 992) toggleCollapse();
  });

  // Persist initial prefs
  savePrefs();
})();


//Outage & Grid Map

(async () => {

  const topology = await fetch(
    'https://code.highcharts.com/mapdata/countries/in/in-all.topo.json'
  ).then(response => response.json());

  // Create the chart
  Highcharts.mapChart('outageMap', {
    chart: {
      map: topology,
      margin: 1
    },

    // title: {
    //     text: 'Categories of Indian Capitals',
    //     style: {
    //         textOutline: '5px contrast'
    //     }
    // },

    // subtitle: {
    //     text: 'Map markers in Highcharts',
    //     style: {
    //         textOutline: '5px contrast'
    //     }
    // },

    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: 'spacingBox',
        verticalAlign: 'bottom'
      }
    },

    mapView: {
      padding: [0, 0, 85, 0]
    },

    legend: {
      floating: true
    },

    plotOptions: {
      mappoint: {
        keys: ['id', 'lat', 'lon', 'name', 'y'],
        marker: {
          lineWidth: 1,
          lineColor: '#000',
          symbol: 'mapmarker',
          radius: 8
        },
        dataLabels: {
          enabled: false
        }
      }
    },

    tooltip: {
      headerFormat: '<span style="color:{point.color}">\u25CF</span> ' +
        '{point.key}<br/>',
      pointFormat: '{series.name}'
    },

    series: [{
      allAreas: true,
      name: 'States',
      states: {
        inactive: {
          opacity: 0.2
        }
      },
      dataLabels: {
        enabled: false
      },
      enableMouseTracking: false,
      showInLegend: false,
      borderColor: '#99f',
      opacity: 0.4,
      borderWidth: 1
    }, {
      // name: 'Coastal',
      showInLegend: false,
      color: 'rgb(124, 181, 236)',
      data: [
        ['in-ap', 16.5, 80.65, 'Amaravati', 0],
        ['in-ga', 15.49, 73.83, 'Panaji', 0],
        ['in-tn', 13.08, 80.27, 'Chennai', 0],
        ['in-kl', 9.93, 76.27, 'Thiruvananthapuram', 0],
        ['in-or', 20.3, 85.83, 'Bhubaneswar', 0],
        ['in-mh', 19.07, 72.87, 'Mumbai', 0],
        ['in-wb', 22.57, 88.36, 'Kolkata', 0],
      ],
      type: 'mappoint'
    }, {
      // name: 'Landlocked',
      showInLegend: false,
      color: 'rgb(241, 92, 128)',
      data: [
        ['in-dl', 28.61, 77.21, 'Delhi', 0],
        ['in-pb', 31.63, 74.87, 'Chandigarh', 0],
        ['in-jk', 34.08, 74.79, 'Srinagar', 0],
        ['in-mp', 23.25, 77.41, 'Bhopal', 0],
        ['in-up', 26.85, 80.95, 'Lucknow', 0],
        ['in-br', 25.61, 85.13, 'Patna', 0],
        ['in-rj', 26.91, 75.79, 'Jaipur', 0],
        ['in-ct', 21.25, 81.63, 'Raipur', 0],
        ['in-hp', 31.1, 77.17, 'Shimla', 0],
        ['in-ch', 30.74, 76.79, 'Chandigarh', 0],
        ['in-jh', 23.81, 86.44, 'Ranchi', 0],
        ['in-hr', 28.45, 77.02, 'Chandigarh', 0],
        ['in-uk', 30.32, 78.07, 'Dehradun', 0],
        ['in-sk', 27.33, 88.61, 'Gangtok', 0],
        ['in-ar', 28.1, 94.62, 'Itanagar', 0],
        ['in-mn', 24.82, 93.94, 'Imphal', 0],
        ['in-tr', 23.83, 91.28, 'Agartala', 0],
        ['in-me', 25.96, 91.88, 'Shillong', 0],
        ['in-nl', 25.67, 94.11, 'Kohima', 0],
        ['in-mz', 23.73, 92.72, 'Aizawl', 0],
        ['in-as', 26.15, 91.78, 'Dispur', 0],
        ['in-ka', 12.97, 77.59, 'Bengaluru', 0],
        ['in-tg', 17.38, 78.48, 'Hyderabad', 0],
        ['in-ld', 11.67, 92.73, 'Port Blair', 0],
        ['in-py', 11.93, 79.83, 'Puducherry', 0]
      ],
      type: 'mappoint'
    }]
  });

})();



//Color swatch box open / close on click

$(document).ready(function () {
  $("#btnColorSwatches").click(function (event) {
    event.stopPropagation();
    $("#colorSwatch").slideToggle("slow");
  });

  $(document).click(function (event) {
    if (!$(event.target).closest("#btnColorSwatches, #colorSwatch").length) {
      $("#colorSwatch").slideUp("slow");
    }
  });
});


