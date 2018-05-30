#!/bin/bash -e
# Requires docker 17.05 or higher

# Build docker image to build copay
docker build -t decred/copay .
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
