document.addEventListener('scroll', function(e) {
  var top = window.pageYOffset + window.innerHeight,
    isVisible = top > document.querySelector('.phone-img').offsetTop;
  if (isVisible) {
    document.getElementById('element').classList.add('slideRight');
  } else {
    document.getElementById('element').classList.remove('slideRight');
  }
});

document.addEventListener('scroll', function(e) {
  var top = window.pageYOffset + window.innerHeight,
    isVisible = top > document.querySelector('.info').offsetTop;
  if (isVisible) {
    document.getElementById('info').classList.add('slideLeft');
  } else {
    document.getElementById('info').classList.remove('slideLeft');
  }
});
document.addEventListener('scroll', function(e) {
  var top = window.pageYOffset + window.innerHeight,
    isVisible = top > document.querySelector('#btn-anime').offsetTop;
  if (isVisible) {
    document.getElementById('btn-anime').classList.add('slideRight');
  } else {
    document.getElementById('btn-anime').classList.remove('slideRight');
  }
});

document.addEventListener('scroll', function(e) {
  var top = window.pageYOffset + window.innerHeight,
    isVisible = top > document.querySelector('#download1').offsetTop;
  if (isVisible) {
    document.getElementById('download1').classList.add('slideLeft');
  } else {
    document.getElementById('download1').classList.remove('slideLeft');
  }
});


document.addEventListener('scroll', function(e) {
  var top = window.pageYOffset + window.innerHeight,
    isVisible = top > document.querySelector('#download2').offsetTop;
  if (isVisible) {
    document.getElementById('download2').classList.add('slideRight');
  } else {
    document.getElementById('download2').classList.remove('slideRight');
  }
});

document.addEventListener('scroll', function(e) {
  var top = window.pageYOffset + window.innerHeight,
    isVisible = top > document.querySelector('#downloads').offsetTop;
  if (isVisible) {
    document.getElementById('downloads').classList.add('fade');
  } else {
    document.getElementById('downloads').classList.remove('fade');
  }
});


document.addEventListener('scroll', function(e) {
  var top = window.pageYOffset + window.innerHeight,
    isVisible = top > document.querySelector('#features').offsetTop;
  if (isVisible) {
    document.getElementById('features').classList.add('fade');
  } else {
    document.getElementById('features').classList.remove('fade');
  }
});
document.addEventListener('scroll', function(e) {
  var top = window.pageYOffset + window.innerHeight,
    isVisible = top > document.querySelector('#organize-text').offsetTop;
  if (isVisible) {
    document.getElementById('organize-text').classList.add('fade');
  } else {
    document.getElementById('organize-text').classList.remove('fade');
  }
});


$(document).ready(function() {
  var previousScroll = 0;

  $(window).scroll(function() {
    var currentScroll = $(this).scrollTop();
    if (currentScroll < previousScroll) {
      //Direction: Down
      $("#nav").fadeOut();
    } else {
      //Direction: Up
      $("#nav").fadeIn();
    }

    previousScroll = currentScroll;

    if (currentScroll == 0) {
      $("#nav").css("position", "static");
    } else {
      $("#nav").css("position", "fixed");
    }
  });
});
