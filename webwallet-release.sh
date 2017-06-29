#!/bin/bash

RELEASE=$(jq -r '.version' app-template/decred/appConfig.json)
COMMIT_HASH=$(git rev-parse HEAD)

RELEASE=${RELEASE:-$COMMIT_HASH}

RELEASE_BUNDLE=webwallet-$RELEASE.tar.gz

echo Building $RELEASE
npm run clean-all && \
npm run apply:decred  && \
npm run final:www && \
tar czf $RELEASE_BUNDLE www

echo
echo Release bundle is in $RELEASE_BUNDLE
