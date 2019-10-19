FROM node
ADD . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
RUN npm install -g nodemon
CMD [ "nodemon", "src/index.js" ]
