import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";

// DOM ready (in case your block appears multiple times)
document.addEventListener("DOMContentLoaded", () => {
	var swiperHero = new Swiper(".partner-swiper", {
		loop: true,
		autoplay: {
			delay: 2000,
			disableOnInteraction: false,
		},
		slidesPerView: "auto",
		speed: 1500,
		grabCursor: true,
		mousewheelControl: true,
		keyboardControl: true,
	});
});
