function scrollToInfo() {
  const infoSection = document.getElementById('info');
  if (infoSection) {
    infoSection.scrollIntoView({ behavior: 'smooth' });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const gameconsoleImg = document.getElementById('gameconsole-img');
  const winSound = document.getElementById('win-sound');
  if (gameconsoleImg && winSound) {
    gameconsoleImg.addEventListener('click', function() {
      winSound.currentTime = 0;
      winSound.play();
    });
  }

  const galleryScroll = document.getElementById('gallery-scroll');
  const galleryNext = document.getElementById('gallery-next');
  if (galleryScroll && galleryNext) {
    galleryNext.addEventListener('click', function() {
      const card = galleryScroll.querySelector('.gallery-card');
      if (card) {
        galleryScroll.scrollBy({
          left: card.offsetWidth + 32,  
          behavior: 'smooth'
        });
      }
    });
  }
});
