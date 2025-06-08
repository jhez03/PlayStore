import Swiper from "swiper/bundle";

// DOM ready (in case your block appears multiple times)
document.addEventListener("DOMContentLoaded", () => {
	var swiperHero = new Swiper(".partner-swiper", {
		loop: true,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
		},
		freeMode: true,
		slidesPerView: "auto",
		speed: 3500,
		grabCursor: true,
		mousewheelControl: true,
		keyboardControl: true,
	});
});
