export default function slides() {
  const achieveSlider = document.querySelector(".s-achieve__slider");

  if (achieveSlider) {
    const swiper = new Swiper(achieveSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 30,
      autoplay: {
        delay: 3000,
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

  const teamSlider = document.querySelector(".s-team__slider");

  if (teamSlider) {
    const swiper = new Swiper(teamSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 20,
      autoplay: {
        delay: 3500,
      },
      scrollbar: {
        el: ".s-team .slider-scrollbar",
        draggable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: "auto",
          spaceBetween: 40,
        },
      },
    });
  }

  const starsSlider = document.querySelector(".s-stars__slider");

  if (starsSlider) {
    const swiper = new Swiper(starsSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 20,
      autoplay: {
        delay: 3200,
      },
      scrollbar: {
        el: ".s-stars .slider-scrollbar",
        draggable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: "auto",
          spaceBetween: 30,
        },
      },
    });
  }

  const partnersSlider = document.querySelector(".s-partners__slider");

  if (partnersSlider) {
    const centerSlide = Math.floor(partnersSlider.querySelectorAll(".swiper-slide").length);
    const swiper = new Swiper(partnersSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 30,
      autoplay: {
        delay: 3000,
      },
      centerSlides: true,
      initialSlide: centerSlide,
      loop: true,
      breakpoints: {
        768: {
          slidesPerView: "auto",
          spaceBetween: 50,
        },
      },
    });
  }
}
