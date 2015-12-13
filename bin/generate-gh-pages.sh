#!/bin/bash -e
#
# @license
# Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
# This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
# The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
# The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
# Code distributed by Google as part of the polymer project is also
# subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
#

# This script pushes a demo-friendly version of uqlibrary-reusable-components and its
# dependencies to gh-pages.

# Run in a clean directory passing in a GitHub org and repo name
org="uqlibrary"
repo="uqlibrary-reusable-components"

branch=${3:-"master"} # default to master when branch isn't specified

# make folder (same as input, no checking!)
mkdir $repo
git clone git@github.com:$org/$repo.git --single-branch

# switch to gh-pages branch
pushd $repo >/dev/null
git checkout --orphan gh-pages

# remove all non-relevant content
git rm -rf .gitignore
git rm -rf gulpfile.js
git rm -rf template.aws.json
git rm -rf wct.conf.js

git rm -rf applications
git rm -rf backup
git rm -rf bin
git rm -rf test

# use bower to install runtime deployment
bower cache clean $repo # ensure we're getting the latest from the desired branch.
bower install

# redirect by default to the elements folder
echo "<META http-equiv="refresh" content=\"0;URL=elements\">" >index.html

# send it all to github
git add -A .
git commit -am 'seed gh-pages'
git push -u origin gh-pages --force

popd >/dev/null