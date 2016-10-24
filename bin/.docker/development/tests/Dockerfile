# intially copied from https://github.com/uqlibrary/fez/blob/master/.docker/development/backend/fpm/Dockerfile
#FROM uqlibrary/docker-fpm56-fez:21
FROM node:latest

# tried from https://github.com/blueimp/nightwatch/blob/master/Dockerfile

# from https://github.com/mycargus/docker-grid-nightwatch/blob/master/Dockerfile
USER root

ENV APP_HOME /usr/src/app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY . $APP_HOME
RUN npm install -g nightwatch --ignore-scripts --unsafe-perm --loglevel info

RUN groupadd -r docker && useradd -r -g docker docker

RUN chown -R docker:docker $APP_HOME
USER docker

CMD nightwatch -c tests/nightwatch.json --tag primo --env chrome
