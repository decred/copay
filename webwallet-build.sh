#!/bin/bash

npm run apply:decred && \
node_modules/.bin/cordova telemetry off && \
npm run final:www && \
rsync -rad www/ /dist/
