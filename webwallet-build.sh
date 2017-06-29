#!/bin/bash

. $HOME/.nvm/nvm.sh && \
npm run apply:decred && \
node_modules/.bin/cordova telemetry off && \
npm run final:www
