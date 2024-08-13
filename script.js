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
                // startAnimation();
             }
        }
    }
}


preloadImages();