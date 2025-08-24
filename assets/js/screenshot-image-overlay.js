// Grab elements
  const figures = document.querySelectorAll(".screenshots-grid figure");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-image");
  const lightboxCaption = document.querySelector(".lightbox-caption");
  const closeBtn = document.querySelector(".lightbox .close");
  const prevBtn = document.querySelector(".lightbox .prev");
  const nextBtn = document.querySelector(".lightbox .next");

  let currentIndex = 0;

  // Open lightbox
  function openLightbox(index) {
    lightbox.style.display = "flex";
    document.body.classList.add("no-scroll");

    currentIndex = index;
    const img = figures[index].querySelector("img");
    const caption = figures[index].querySelector("figcaption");

    lightboxImg.src = img.src;
    lightboxCaption.textContent = caption ? caption.textContent : "";
    lightbox.classList.add("active");
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.classList.remove("no-scroll");
    lightbox.classList.remove("active");
  }

  // Navigate images with swipe animation for touchscreens
 function animateImage(newIndex, direction) {
  const outOffset = direction === "left" ? "-25%" : "25%";  // where current leaves
  const inOffset  = direction === "left" ? "25%"  : "-25%"; // where new one comes from

  // Preload the new image
  const newImg = new Image();
  const imgEl = figures[newIndex].querySelector("img");
  const captionEl = figures[newIndex].querySelector("figcaption");
  newImg.src = imgEl.src;

  newImg.onload = () => {
    // Animate current image out (short nudge + fade)
    lightboxImg.style.transform = `translateX(${outOffset})`;
    lightboxImg.style.opacity = "0";

    setTimeout(() => {
      // Swap AFTER preload
      currentIndex = newIndex;
      lightboxImg.src = newImg.src;
      lightboxCaption.textContent = captionEl ? captionEl.textContent : "";

      // Reset new image just off-screen on the opposite side
      lightboxImg.style.transition = "none";
      lightboxImg.style.transform = `translateX(${inOffset})`;
      lightboxImg.style.opacity = "0";

      void lightboxImg.offsetWidth; // force reflow

      // Animate new image into place
      lightboxImg.style.transition = "transform 0.25s ease, opacity 0.25s ease";
      lightboxImg.style.transform = "translateX(0)";
      lightboxImg.style.opacity = "1";
    }, 120); // small delay so old image finishes its exit
  };
}


function showPrev() {
  const newIndex = (currentIndex - 1 + figures.length) % figures.length;
  animateImage(newIndex, "right");
}

function showNext() {
  const newIndex = (currentIndex + 1) % figures.length;
  animateImage(newIndex, "left");
}

  // Add event listeners
  figures.forEach((figure, index) => {
    figure.addEventListener("click", () => openLightbox(index));
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "Escape") closeLightbox();
  });

  // Optional: close if clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
