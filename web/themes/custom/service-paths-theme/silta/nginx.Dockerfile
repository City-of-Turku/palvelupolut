# Dockerfile for building nginx.
FROM wunderio/silta-nginx:v0.2

COPY . /var/www/html/web

