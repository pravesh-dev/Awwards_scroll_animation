function smoothScroll() {
  const lenis = new Lenis();

  lenis.on("scroll", (e) => {
    // console.log(e);
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}
smoothScroll();


const canvas = document.querySelector("#my_canvas");
const context = canvas.getContext("2d");

const frames = {
  currentIndex: 0,
  maxIndex: 1345,
};

let images = [];
let imageLoaded = 0;

function preloadImages() {
  for (var i = 1; i <= frames.maxIndex; i++) {
    const imageUrl = `./Frames/frame_${i.toString().padStart(4, "0")}.jpg`;
    const img = new Image();
    img.src = imageUrl;

    img.onload = function () {
      imageLoaded++;
      if (imageLoaded === frames.maxIndex) {
        loadImages(frames.currentIndex);
        startAnimation();
      }
    };
    images.push(img);
  }
}

function loadImages(index) {
  if (index >= 0 && index <= frames.maxIndex) {
    const img = images[index];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const scale = Math.max(scaleX, scaleY);

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

    frames.currentIndex = index;
  }
}

function startAnimation() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",
      end: "bottom bottom",
      scrub: 4,
    },
  });

  function updateFrame(index) {
    return {
        currentIndex: index,
        ease: 'linear',
        onUpdate: function () {
          loadImages(Math.floor(frames.currentIndex));
        },
      }
  }

  tl.to(frames, updateFrame(100), 'first')
    .to('.animate1', {opacity: 0, ease: 'linear',}, 'first')
    
    .to(frames, updateFrame(200), 'second')
    .to('.animate2', {opacity: 1, ease: 'linear',}, 'second')

    .to(frames, updateFrame(300), 'third')
    .to('.animate2', {opacity: 1, ease: 'linear',}, 'third')

    .to(frames, updateFrame(400), 'fourth')
    .to('.animate2', {opacity: 0, ease: 'linear',}, 'fourth')

    .to(frames, updateFrame(500), 'fifth')
    .to('.animate3', {opacity: 1, ease: 'linear',}, 'fifth')

    .to(frames, updateFrame(600), 'sixth')
    .to('.animate3', {opacity: 1, ease: 'linear',}, 'sixth')

    .to(frames, updateFrame(700), 'seventh')
    .to('.animate3', {opacity: 0, ease: 'linear',}, 'seventh')

    .to(frames, updateFrame(800), 'eight')
    .to('.panel', {x: 0, ease: 'expo',}, 'eight')

    .to(frames, updateFrame(900), 'ninth')
    .to('.panel', {x: 0, ease: 'expo',}, 'ninth')

    .to(frames, updateFrame(1000), 'tenth')
    .to('.panel', {opacity: 0, ease: 'linear',}, 'tenth')
}

window.addEventListener("resize", () => {
  loadImages(Math.floor(frames.currentIndex));
});

preloadImages();
