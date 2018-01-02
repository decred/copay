#!/bin/bash -e

# Setup
rm -rf docker-build
mkdir docker-build

# Build copay
docker build . \
        -f ./Dockerfile-build \
        -t decred/copay-build

docker run --rm \
        -v $(pwd)/docker-build:/root/build \
        decred/copay-build:latest

# Build docker image to serve copay
docker build . \
        -f ./Dockerfile-serve \
        -t decred/copay-serve

echo ""
echo "==================="
echo "  Build complete"
echo "==================="
echo ""
echo "You can now run copay with the following command:"
echo "    docker run -d --rm -p <local port>:80 decred/copay-serve:latest"
echo ""

# Cleanup
rm -rf docker-build
