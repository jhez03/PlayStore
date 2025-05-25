FROM wordpress:6.5.3-php8.1-fpm

LABEL maintainer="Jeswin Libay"


RUN chown -R www-data:www-data /var/www/html
