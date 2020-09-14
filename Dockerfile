FROM node:14
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm install -g serve
RUN npm run build

# bundle app source
EXPOSE 5000

CMD [ "serve", "-s", "build" ]

# docker build -t atlantisstorm/calculator .
# docker run -p 5000:5000 -d atlantisstorm/calculator