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

# wait 30 seconds to be sure that chrome has started
# then, endlessly loop on:
#  - run nightwatch

#  - parse the file in reports/primo for:
#     errors="0" failures="0"
#  - success if found, failure if not
#  - call dashboard appropriately (TBD)

#  - sleep and wait for the next run

CMD sleep 30 && \
    while :; \
      do nightwatch -c tests/nightwatch.json --tag primo --env chrome; \

      if find $APP_HOME/reports/primo -name "CHROME*" -exec grep --quiet 'errors="0" failures="0"' {} +;  \
      then \
echo "send success to dashboard"; \
      else \
echo "send failure to dashboard"; \
      fi; \

      sleep 1; \
    done;

# build instructions:
# cd /Users/uqldegro/github/uqlibrary-reusable-components/uqlibrary-reusable-components/bin/.docker/development/tests
# docker build -t uqlibrary/nightwatch-test:latest  .

# to run, simply:
# docker-compose up

# kill:
# use Ctrl-C
# and remember to clean up with:
# docker-compose rm
