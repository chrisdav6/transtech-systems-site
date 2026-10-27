(function () {
  'use strict';

  const lightbox = document.getElementById('ttsCsLightbox');

  if (!lightbox) return;

  const imageElement = lightbox.querySelector('.tts-cs__lightbox-image');
  const captionElement = lightbox.querySelector('.tts-cs__lightbox-caption');
  const closeButton = lightbox.querySelector('.tts-cs__lightbox-close');
  const previousButton = lightbox.querySelector('.tts-cs__lightbox-prev');
  const nextButton = lightbox.querySelector('.tts-cs__lightbox-next');

  const galleryLinks = Array.from(
    document.querySelectorAll('[data-lightbox-group="case-study"]'),
  );

  if (!galleryLinks.length) return;

  let currentIndex = 0;
  let previousFocus = null;

  function showImage(index) {
    currentIndex = (index + galleryLinks.length) % galleryLinks.length;

    const link = galleryLinks[currentIndex];
    const image = link.querySelector('img');

    imageElement.src = link.href;
    imageElement.alt = image ? image.alt : '';
    captionElement.textContent = image ? image.alt : '';

    const multipleImages = galleryLinks.length > 1;
    previousButton.hidden = !multipleImages;
    nextButton.hidden = !multipleImages;
  }

  function openLightbox(index) {
    previousFocus = document.activeElement;

    showImage(index);

    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    imageElement.src = '';
    document.body.style.overflow = '';

    if (previousFocus) {
      previousFocus.focus();
    }
  }

  galleryLinks.forEach(function (link, index) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      openLightbox(index);
    });
  });

  closeButton.addEventListener('click', closeLightbox);

  previousButton.addEventListener('click', function () {
    showImage(currentIndex - 1);
  });

  nextButton.addEventListener('click', function () {
    showImage(currentIndex + 1);
  });

  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (lightbox.hidden) return;

    if (event.key === 'Escape') {
      closeLightbox();
      return;
    }

    if (event.key === 'ArrowLeft' && galleryLinks.length > 1) {
      showImage(currentIndex - 1);
    }

    if (event.key === 'ArrowRight' && galleryLinks.length > 1) {
      showImage(currentIndex + 1);
    }

    if (event.key === 'Tab') {
      const focusable = [
        closeButton,
        ...(previousButton.hidden ? [] : [previousButton]),
        ...(nextButton.hidden ? [] : [nextButton]),
      ];

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
