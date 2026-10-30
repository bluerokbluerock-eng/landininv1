FROM nginx:alpine

ENV PORT=8080

COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY index.html styles.css script.js /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
