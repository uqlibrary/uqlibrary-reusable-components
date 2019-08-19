#!/bin/bash

# start debugging/tracing commands, -e - exit if command returns error (non-zero status)
set -e

echo "Check Java version is 8"
# can't run jdk_switcher in script
# jdk_switcher use oraclejdk8
version=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | sed '/^1\./s///' | cut -d'.' -f1)
echo "Java version is $version"
if [[ "$version" != "8" ]]; then
  echo "Java 8 is required"
  exit 1
fi

printf "Node "; node -v;
printf "(Before npm i -g) npm v"; npm -v

printf "\n\n--- Install dependencies ---\n"
npm install -g gulp-cli bower nightwatch npm@6
npm install
