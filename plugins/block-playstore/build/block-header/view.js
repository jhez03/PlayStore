/******/ (() => { // webpackBootstrap
/*!**********************************!*\
  !*** ./src/block-header/view.js ***!
  \**********************************/
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log("Hello World! (from create-block-block-playstore block)");
/* eslint-enable no-console */
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const overlay = document.getElementById("hamburger-overlay");
  const closeBtn = document.getElementById("hamburger-close");
  // Open hamburger menu
  hamburger.addEventListener("click", () => {
    overlay.classList.remove("hidden");
  });

  // Close hamburger menu
  closeBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
    closeAllSubmenus(); // optional: collapse submenus when closing
  });

  // ESC key to close menu and submenus
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      overlay.classList.add("hidden");
      closeAllSubmenus();
    }
  });

  // Handle clicks on submenu toggles using event delegation
  document.addEventListener("click", function (e) {
    const toggle = e.target.closest(".playstore-submenu-toggle");
    const menuItem = e.target.closest(".menu-item-has-children");
    // Toggle submenu
    if (toggle && menuItem) {
      e.preventDefault();
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";

      // Close all other submenus
      document.querySelectorAll('.playstore-submenu-toggle[aria-expanded="true"]').forEach(btn => {
        btn.setAttribute("aria-expanded", "false");
        btn.closest(".menu-item-has-children")?.querySelector(".sub-menu")?.classList.remove("visible");
      });

      // Open this one if it wasn't already
      toggle.setAttribute("aria-expanded", (!isExpanded).toString());
      const submenu = menuItem.querySelector(".sub-menu");
      submenu?.classList.toggle("visible", !isExpanded);
    }

    // Click outside any menu closes all
    if (!e.target.closest(".menu-item-has-children")) {
      closeAllSubmenus();
    }
  });
  function closeAllSubmenus() {
    document.querySelectorAll(".playstore-submenu-toggle").forEach(toggle => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.closest(".menu-item-has-children")?.querySelector(".sub-menu")?.classList.remove("visible");
    });
  }
});
/******/ })()
;
//# sourceMappingURL=view.js.map