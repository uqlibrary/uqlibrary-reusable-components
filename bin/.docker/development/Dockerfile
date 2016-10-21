# version 0 from https://github.com/Microsoft/generator-docker
FROM node
WORKDIR /src
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
COPY . /src
RUN npm install
