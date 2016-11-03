FROM node:latest

USER root

ENV APP_HOME /usr/src/app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY . $APP_HOME
RUN npm install -g nightwatch python curl --ignore-scripts --unsafe-perm --loglevel info

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

# set up the environment for the Cachet dashboard
RUN apikey="4gXCp64TRek9IpKOArCC"
RUN dashboardHostname="http://cattle1.library.uq.edu.au:8081"
RUN dashboardElementName="Primo"
RUN dashboardGetIdUrl="$dashboardHostname/api/v1/components?name=$dashboardElementName"

RUN re='^[0-9]+$'
RUN statusCodeSuccess=1
RUN statusCodeFailure=4

CMD sleep 30 && \
    dashboardPrimoId=$(curl -H "Content-Type: application/json;" -H 'X-Cachet-Token: "$apikey"' -s '"$dashboardGetIdUrl" | python -c 'import sys, json; obj=json.load(sys.stdin); print obj["data"][0]["id"]') && \
    # per https://docs.cachethq.io/docs/update-a-component
    dashboardPrimoUpdateUrl="$dashboardHostname/api/v1/components/$dashboardPrimoId" && \
echo "dashboardPrimoUpdateUrl=$dashboardPrimoUpdateUrl" && \

    # check the primo id is integer
    #if !$dashboardPrimoId =~ $re ; then; \
# is there a better way to handle an error?
    #   echo "error: Dashboard did not return an id for Primo" >&2; exit 1 \
    #fi && \

    while :; do ; \
      nightwatch -c tests/nightwatch.json --tag primo --env chrome; \

      if find $APP_HOME/reports/primo -name "CHROME*" -exec grep --quiet 'errors="0" failures="0"' {} +;  \
      then \
          # online - send success to dashboard
          $(curl -X PUT -H "X-Cachet-Token: $apikey" -d "{ status: $statusCodeSuccess }" "$dashboardPrimoUpdateUrl") \
      else \
          # offline - send failure to dashboard
          $(curl -X PUT -H "X-Cachet-Token: $apikey" -d "{ status: $statusCodeFailure }" "$dashboardPrimoUpdateUrl") \
      fi; \

      sleep 1; \
    done;

# sample build instructions:
# cd /Users/uqldegro/github/uqlibrary-reusable-components/uqlibrary-reusable-components/bin/.docker/development/tests
# docker build -t uqlibrary/nightwatch-test:latest .
# (note there is a period at the end)

# to run, simply:
# docker-compose up

# kill:
# use Ctrl-C
# and remember to clean up with:
# docker-compose rm

# to get into ssh session:
# docker run -it -v /Users/uqldegro/github/uqlibrary-reusable-components/uqlibrary-reusable-components/bin/.docker/development:/usr/src/app node:latest bash
