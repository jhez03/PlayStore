const gulp = require("gulp");
const browserSync = require("browser-sync").create();

const proxyDomain = "https://playstore.localhost"; // Use the domain served via Traefik

gulp.task("serve", function () {
  browserSync.init({
    proxy: proxyDomain,
    open: false,
    notify: false,
    files: ["**/*.php", "**/*.css", "**/*.js"],
  });

  gulp.watch("**/*.php").on("change", browserSync.reload);
  gulp.watch("**/*.css").on("change", browserSync.reload);
  gulp.watch("**/*.js").on("change", browserSync.reload);
});
