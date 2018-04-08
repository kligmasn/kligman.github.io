var hei = document.documentElement.clientHeight;
var wid = document.documentElement.clientWidth;
var topSplash = (hei - (wid* .05))/2;
$(".splash").css("width", wid * .05);
$(".splash").css("height", wid * .05);
$(".splash").css("left", wid * .475);
$(".splash").css("top", topSplash);

var el = document.querySelectorAll('div.el');

var aTimeline = anime.timeline({
  loop: 1
});
aTimeline.add({
  targets: el,
  scale: {
    value: 2,
    duration: 1000
  },
  rotate: {
    value: '3turn',
    duration: 1500
  }
});
aTimeline.add({
  targets: el,
  borderRadius: {
    value: 0,
    duration: 1000
  },
  height: hei * .1,
  width: wid * .3,
  opacity: [1, 0]
});
aTimeline.add({
  targets: document.querySelectorAll('h1#name'),
  opacity: [0, 1]
});
