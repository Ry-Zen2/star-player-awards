# Serve the app as static files via nginx
FROM nginx:alpine

# Custom nginx config with smart caching (see nginx.conf below)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy everything in your repo to nginx web root
COPY . /usr/share/nginx/html
