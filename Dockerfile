FROM wordpress:latest

LABEL maintainer="Jeswin Libay"


RUN chown -R www-data:www-data /var/www/html
