#!/bin/bash

tag=$1
if [ -z $tag ]; then
  echo "please input the tag"
  exit 1
fi

echo "build docker image with tag: whiteboard/ui:$tag"
yarn build
mkdir build

docker build --no-cache -t whiteboard/ui:$tag .
docker tag whiteboard/ui:$tag
docker save -o ./build/whiteboard-$tag.tgz whiteboard/ui:$tag
