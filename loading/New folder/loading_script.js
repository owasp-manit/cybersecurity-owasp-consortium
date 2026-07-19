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
    scale: [5, 30, 10]
  });

  timeline.add({
    targets: ['#svg_8'],
    fill: ['#150485', '#590995', '#c62a88', '#03c4a1'],
    scale: [.5, 1.05],
    complete: init
  });

  var stroke_anim1 = anime({
    targets: ['#svg_12'],
    strokeDashoffset: [anime.setDashoffset, 0],
    points: [
      {
        value: [
          '88.5,80.45313l272.5,79.54688l-231,189l-41.5,-268.54688z',
          '207.5,185.45313l156.5,-26.45313l,190l-44.5,-268.54687z'], duration: 20000,
      },
    ],
    fill: ['#150485', '#590995', '#c62a88', '#03c4a1'],
    stroke: ['#f1e7b6', '#fe346e', '#400082', '#00bdaa'],
    easing: 'easeOutQuad',
    duration: 2000,
    autoplay: true,
    loop: true,
  });

  var rotate_stroke_anime = anime({
    targets: ['#svg_13 path'],
    easing: ['easeOutInCirc'],
    strokeDashoffset: [10, 0],
    duration: 1000,
    opacity: .5,
    skewY: 100,
    skewX: 100,
    rotate: [45, 90],
    autoplay: true,
    direction: 'normal',
    loop: true,
    stroke: ['#150485', '#590995', '#c62a88', '#03c4a1'],
  });
};

// Progress bar fills once; redirect fires in the complete callback when bar reaches 100%
anime({
  targets: '.loader-bar-fill',
  width: ['0%', '100%'],
  easing: 'easeInOutSine',
  duration: 2200,
  complete: function() {
    var hash = window.location.hash.substring(1);
    if (hash) {
      var parts = hash.split(',');
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
  easing: 'easeInOutSine',
  duration: 2200,
  update: function(anim) {
    var percentElement = document.querySelector('.loader-percent');
    var num = Math.round(anim.progress);
    var label = 'SECURE LOADING... ' + num + '%';
    percentElement.textContent = label;
    percentElement.setAttribute('data-text', label);
  }
});

init();
