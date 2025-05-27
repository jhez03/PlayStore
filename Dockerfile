FROM wordpress:6.8.1-php8.2-fpm

LABEL maintainer="Jeswin Libay"


RUN chown -R www-data:www-data /var/www/html
