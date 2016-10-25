FROM node:latest

USER root

ENV APP_HOME /usr/src/app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY . $APP_HOME
RUN npm install -g nightwatch --ignore-scripts --unsafe-perm --loglevel info

RUN groupadd -r docker && useradd -r -g docker docker

RUN chown -R docker:docker $APP_HOME
USER docker

CMD sleep 30 && nightwatch -c tests/nightwatch.json --tag primo --env chrome


# build instructions
# cd /Users/uqldegro/github/uqlibrary-reusable-components/uqlibrary-reusable-components/bin/.docker/development/tests
# docker build -t uqlibrary/nightwatch-test:latest  .
