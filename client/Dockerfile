FROM node:19.5.0-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install -g @angular/cli
RUN npm install
EXPOSE 4200
EXPOSE 5000
EXPOSE 5001
CMD ["ng", "serve", "--host", "0.0.0.0"]
