#!/bin/sh

CUR_DIR=$(pwd)
SERVE_IMAGE=decred/webwallet

rm -rf dist && mkdir dist && \
docker build -t decred/copay-builder -f Dockerfiles/Dockerfile-builder . && \
docker run --rm -v $CUR_DIR/dist:/dist decred/copay-builder && \
docker build -f Dockerfiles/Dockerfile-production -t $SERVE_IMAGE . &&  \
echo Docker image $SERVE_IMAGE created
