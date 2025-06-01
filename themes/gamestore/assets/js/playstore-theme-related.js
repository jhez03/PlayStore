const styleToggle = document.querySelector(".header-mode-switcher");

const setDarkMode = (isDark) => {
  if (isDark) {
    document.documentElement.classList.add("dark-mode-playstore");
    localStorage.setItem("styleMode", "dark");
  } else {
    document.documentElement.classList.remove("dark-mode-playstore");
    localStorage.setItem("styleMode", "light");
  }
};

// Initial state (default to light if not set)
let styleMode = localStorage.getItem("styleMode") || "light";
setDarkMode(styleMode === "dark");

// Toggle the style mode
if (styleToggle) {
  styleToggle.addEventListener("click", () => {
    styleMode = localStorage.getItem("styleMode") === "dark" ? "light" : "dark";
    setDarkMode(styleMode === "dark");
  });
}

// move wp-block-navigation__submenu-icon inside wp-block-navigation-item__content wp-block-navigation-submenu__toggle
// const navigationItems = document.querySelectorAll(".wp-block-navigation-item");
// navigationItems.forEach((item) => {
//   const submenuIcon = item.querySelector(".wp-block-navigation__submenu-icon");
//   if (submenuIcon) {
//     const content = item.querySelector(".wp-block-navigation-item__content");
//     if (content) {
//       content.appendChild(submenuIcon);
//       submenuIcon.classList.add("wp-block-navigation-submenu__toggle");
//     }
//   }
// });
