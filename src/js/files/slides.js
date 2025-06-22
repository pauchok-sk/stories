export default function slides() {
  const achieveSlider = document.querySelector(".s-achieve__slider");

  if (achieveSlider) {
    const swiper = new Swiper(achieveSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 30,
      autoplay: {
        delay: 3000
      },
      scrollbar: {
        el: ".s-achieve .slider-scrollbar",
        draggable: true,
      },
      breakpoints: {
        1366: {
          slidesPerView: "auto",
          spaceBetween: 150,
        },
        768: {
          slidesPerView: "auto",
          spaceBetween: 70,
        },
      },
    });
  }
}
