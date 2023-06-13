# Dockerfile for the Nginx container.
FROM wunderio/silta-nginx:latest

COPY . /app/web

# New line to trigger image rebuild.
