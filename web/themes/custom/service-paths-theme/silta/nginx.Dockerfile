# Dockerfile for building nginx.
FROM wunderio/silta-nginx:v0.1

COPY . /var/www/html/web

# New line to trigger image rebuild.
