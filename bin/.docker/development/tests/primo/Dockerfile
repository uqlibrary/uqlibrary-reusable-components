# intially copied from https://github.com/uqlibrary/fez/blob/master/.docker/development/backend/fpm/Dockerfile
# incorporated from https://github.com/blueimp/nightwatch/blob/master/Dockerfile
FROM uqlibrary/docker-fpm56-fez:21

COPY bootstrap.sh /opt/bootstrap.sh

RUN chmod +x /opt/bootstrap.sh

# from https://github.com/blueimp/nightwatch/blob/master/Dockerfile
RUN apk --no-cache add \
    # Install NodeJS:
    nodejs-lts \
    # Install tini, a tiny but valid init for containers:
    tini \
  && npm install -g \
    # Install Nightwatch.js:
    nightwatch@'<1.0' \
  # Clean up obsolete files:
  && rm -rf \
    /tmp/* \
    /root/.npm

ENTRYPOINT ["/opt/bootstrap.sh"]