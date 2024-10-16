FROM nginx:latest

RUN apt-get update && apt-get install -y \
    curl \
    wget \
    vim \
    certbot python3-certbot-nginx \
    && apt-get clean

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d
#COPY nginx2.conf /etc/nginx/nginx2

# (Optional) Copy SSL certificates (if you're using SSL)
COPY ssl/hires.ohminsights.ca.crt /etc/nginx/ssl/hires.ohminsights.ca.crt
COPY ssl/hires.ohminsights.ca.key /etc/nginx/ssl/hires.ohminsights.ca.key

WORKDIR /usr/src/app