#!/bin/bash -e

# Build docker image to build copay
docker build . \
	-f ./Dockerfile-build \
	-t decred/copay-build
if [ $? != 0 ]; then
	echo 'docker build failed'
	exit 1
fi

# Prepare build output dir
rm -rf docker-build
mkdir docker-build

# Build copay in docker image
docker run --rm \
	-v $(pwd)/docker-build:/docker-build \
	decred/copay-build:latest
if [ $? != 0 ]; then
	echo 'docker run failed'
	exit 1
fi

# Build docker image to serve copay
docker build . \
	-f ./Dockerfile-serve \
	-t decred/copay
if [ $? != 0 ]; then
	echo 'docker build failed'
	exit 1
fi

echo ""
echo "==================="
echo "  Build complete"
echo "==================="
echo ""
echo "You can now run copay with the following command:"
echo "    docker run -d --rm -p <local port>:80 decred/copay:latest"
echo ""

# Remove build output dir
rm -rf docker-build
