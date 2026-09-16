// ── Returning visitor detection ──────────────────────────────────────────────
var STORAGE_KEY = 'owasp_loader_visited';
var isReturning = !!localStorage.getItem(STORAGE_KEY);
localStorage.setItem(STORAGE_KEY, '1');

var isRedirecting = !!window.location.hash.substring(1);
var Redirecting_url = window.location.hash.substring(1);


// First visit: 2200ms  |  Returning: 800ms
var LOAD_DURATION = isReturning ? 800 : 2200;

// Expose so the inline redirect script in HTML reads the right delay
window.__loaderDuration = LOAD_DURATION;


// ─────────────────────────────────────────────────────────────────────────────
// // Rotating sublabel strings
// var sublabels = [
//   'scanning attack vectors...',
//   'enumerating nodes...',
//   'mapping threat surface...',
//   'auditing injection points...',
//   'profiling session tokens...',
//   'resolving CVE dependencies...',
//   'initializing risk matrix...',
//   'calibrating threat model...',
// ];
// var sublabelIndex = 0;
// var sublabelEl = document.getElementById('loader-sublabel');

// function rotateSublabel() {
//   if (!sublabelEl) return;
//   sublabelEl.style.opacity = '0';
//   setTimeout(function () {
//     sublabelEl.textContent = sublabels[sublabelIndex % sublabels.length];
//     sublabelEl.style.opacity = '1';
//     sublabelIndex++;
//   }, 350);
// }

// rotateSublabel();
// setInterval(rotateSublabel, isReturning ? 500 : 1800);

// Typewriter for kicker — instant on return visits
var kickerEl = document.getElementById('loader-kicker');
var kickerText = isReturning ? 'cache restored' : 'threat surface initializing';
if (kickerEl) {
  kickerEl.textContent = '';
  if (isReturning) {
    kickerEl.textContent = kickerText;
  } else {
    var i = 0;
    var typeInterval = setInterval(function () {
      kickerEl.textContent += kickerText[i];
      i++;
      if (i >= kickerText.length) clearInterval(typeInterval);
    }, 55);
  }
}

function init() {
  var timeline = anime.timeline({
    direction: 'alternate',
    easing: 'easeInOutQuint',
    autoplay: true,
    duration: function() {
      return anime.random(0, 270);
    },
    delay: [45, 250],
    loop: true,
  });

  timeline.add({
    targets: ['feDisplacementMap'],
    scale: [5, 30, 10],
    duration: LOAD_DURATION,
  });

  timeline.add({
    targets: ['#svg_8'],
    fill: ['#150485', '#590995', '#c62a88', '#03c4a1'],
    scale: [.5, 1.05],
    duration: LOAD_DURATION,
  });

  var stroke_anim1 = anime({
    targets: ['#svg_12'],
    strokeDashoffset: [anime.setDashoffset, 0],
    points: [
      {
        value: [
          '88.5,80.45313l272.5,79.54688l-231,189l-41.5,-268.54688z',
          '207.5,185.45313l156.5,-26.45313l,190l-44.5,-268.54687z'
        ],
        duration: LOAD_DURATION * 9,
      },
    ],
    fill: ['#150485', '#590995', '#c62a88', '#03c4a1'],
    stroke: ['#f1e7b6', '#fe346e', '#400082', '#00bdaa'],
    easing: 'easeOutQuad',
    duration: LOAD_DURATION,
    autoplay: true,
    loop: true,
  });

  var rotate_stroke_anime = anime({
    targets: ['#svg_13 path'],
    easing: ['easeOutInCirc'],
    strokeDashoffset: [10, 0],
    duration: isRedirecting ? 400 : 1000,
    opacity: .5,
    skewY: 100,
    skewX: 100,
    rotate: [45, 90],
    autoplay: true,
    direction: 'alternate',
    loop: true,
    stroke: ['#150485', '#590995', '#c62a88', '#03c4a1'],
  });
};

// Progress bar fills once; redirect fires in the complete callback when bar reaches 100%
anime({
  targets: '.loader-bar-fill',
  width: ['0%', '100%'],
  easing: isReturning ? 'easeOutQuart' : 'easeInOutSine',
  duration: LOAD_DURATION,
  direction: isReturning ? 'normal':'alternate' ,
  loop: isRedirecting ? false: true,
  complete: function() {
    if (isRedirecting) {
      var parts = Redirecting_url.split(',');
      var page = parts[0];
      var section = parts[1];
      var url = page + '.html';
      if (section) url += '#' + section;
      window.location.href = url;
    }
  }
});

anime({
  targets: '.loader-percent',
  innerHTML: [0, 100],
  round: 1,
  easing: isReturning ? 'easeOutQuart' : 'easeInOutSine',
  duration: LOAD_DURATION,
  direction: isRedirecting ? 'normal':'alternate' ,
  loop: isRedirecting ? false: true,
  update: function(anim) {
    var percentElement = document.querySelector('.loader-percent');
    var num = Math.round(anim.progress);
    var label = 'SECURE LOADING... ' + num + '%';
    percentElement.textContent = label;
    percentElement.setAttribute('data-text', label);
  }
});

init();
