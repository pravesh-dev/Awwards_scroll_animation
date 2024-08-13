const canvas = document.querySelector('#my_canvas');
const context = canvas.getContext('2d');

const frames = {
  currentIndex: 0,
  maxIndex: 1345,
};

let images = [];
let imageLoaded = 0;

function preloadImages() {
    for(var i = 1; i <= frames.maxIndex; i++){
        const imageUrl = `./Frames/frame_${i.toString().padStart(4, '0')}.jpg`;
        const img = new Image;
        img.src = imageUrl;

        img.onload = function () {
             imageLoaded++;
             if(imageLoaded === frames.maxIndex){
                loadImages(frames.currentIndex);
                startAnimation();
             }
        }
        images.push(img);
    }
}

function loadImages(index) {
    if(index >= 0 && index <= frames.maxIndex){
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
        context.imageSmoothingEnabled = true
        context.imageSmoothingQuality = 'high'
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        frames.currentIndex = index;
    }
}

function startAnimation(){
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.parent',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 4,
    }
});

tl.to(frames, {
    currentIndex: frames.maxIndex,
    onUpdate: function () {
        loadImages(Math.floor(frames.currentIndex));
    }
})
}

preloadImages();