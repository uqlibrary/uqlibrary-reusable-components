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

CMD \
    # set up the environment for the Cachet dashboard
    apikey="4gXCp64TRek9IpKOArCC" && \
    dashboardHostname="http://cattle1.library.uq.edu.au:8081" && \
    dashboardElementName="Primo" && \

    statusCodeSuccess=1 && \
    statusCodeFailure=4 && \
    integerRegex='^[0-9]+$' && \

    # per https://docs.cachethq.io/docs/update-a-component
    dashboardGetIdUrl="$dashboardHostname/api/v1/components?name=$dashboardElementName" && \

    dashboardPrimoId=$(curl -s -H "Content-Type: application/json;" -H 'X-Cachet-Token: "$apikey"' "$dashboardGetIdUrl" | python -c 'import sys, json; obj=json.load(sys.stdin); print obj["data"][0]["id"]') && \

    if [[ ! "$dashboardPrimoId" =~ ^[0-9]+$ ]] ; then echo "error"; fi && \


    # check the primo id is integer
#    if [!0 < $dashboardPrimoId ]; then \
    #if [[ ! $dashboardPrimoId =~ $integerRegex ]] ; \
    #then \
# is there a better way to respond to an error?
    #    echo "error: Dashboard did not return an integer id for Primo" >&2; \
    #    exit 1; \
    #fi && \

    dashboardPrimoUpdateUrl="$dashboardHostname/api/v1/components/$dashboardPrimoId" && \

    # chrome seems to need at least 20 seconds to start up before we can first use it with nigthwatch
    sleep 25 && \

    while :; \

      # run the tests to see is primo is up
      do nightwatch -c tests/nightwatch.json --tag primo --env chrome; \

      if find $APP_HOME/reports/primo -name "CHROME*" -exec grep --quiet 'errors="0" failures="0"' {} +;  \
      then \
          # online - send success to dashboard
          statusCode="$statusCodeSuccess"; \
echo "send success to dashboard"; \
      else \
          # offline - send failure to dashboard
          statusCode="$statusCodeFailure"; \
echo "send failure to dashboard"; \
      fi; \

# awaiting cachet install bug with rancher to be fixed
      result=$(curl -s -X PUT -H 'X-Cachet-Token: "$apikey"' -d '{ status: "$statusCode" }' "$dashboardPrimoUpdateUrl") \

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
