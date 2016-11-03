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

CMD sleep 30 && \
    # chrome seems to need at least 20 seconds to start up

    # set up the environment for the Cachet dashboard
    apikey="4gXCp64TRek9IpKOArCC" && \
    dashboardHostname="http://cattle1.library.uq.edu.au:8081" && \
    dashboardElementName="Primo" && \

    statusCodeSuccess=1 && \
    statusCodeFailure=4 && \
    integerRegex='^[0-9]+$' && \

    dashboardGetIdUrl="$dashboardHostname/api/v1/components?name=$dashboardElementName" && \

    # per https://docs.cachethq.io/docs/update-a-component
# curl -H "Content-Type: application/json;" -H 'X-Cachet-Token: 4gXCp64TRek9IpKOArCC' -s http://cattle1.library.uq.edu.au:8081/api/v1/components?name=Primo | python -c 'import sys, json; obj=json.load(sys.stdin); print obj["data"][0]["id"]'
    dashboardPrimoId=$(curl -H "Content-Type: application/json;" -H 'X-Cachet-Token: "$apikey"' -s "$dashboardGetIdUrl" | python -c 'import sys, json; obj=json.load(sys.stdin); print obj["data"][0]["id"]') && \

    # check the primo id is integer
# is there a better way to handle an error?
    if !$dashboardPrimoId =~ $integerRegex; then echo "error: Dashboard did not return an id for Primo" >&2; exit 1; fi && \

    dashboardPrimoUpdateUrl="$dashboardHostname/api/v1/components/$dashboardPrimoId" && \

    while :; \
          do nightwatch -c tests/nightwatch.json --tag primo --env chrome; \

#      if [find $APP_HOME/reports/primo -name "CHROME*" -exec grep --quiet 'errors="0" failures="0"' {} +]  \
#      then \
          # online - send success to dashboard
#          $statusCode=$statusCodeSuccess; \
#      else \
          # offline - send failure to dashboard
#          $statusCode=$statusCodeFailure; \
#      fi; \
#      $(curl -X PUT -H "X-Cachet-Token: $apikey" -d "{ status: $statusCode }" "$dashboardPrimoUpdateUrl") \

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
