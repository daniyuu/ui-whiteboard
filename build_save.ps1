#!/bin/bash
$tag = $args[0]
if ([string]::IsNullOrEmpty($tag)) {
  Write-Host "please input the tag"
  exit 1
}

yarn build

Write-Output "build docker image with tag: whiteboard/ui:$tag"

if (!(Test-Path -path .\build -PathType Container)) {
  New-Item -ItemType Directory -Path .\build
}

docker build --no-cache -t whiteboard/ui:$tag .
docker tag whiteboard/ui:$tag
docker save -o ./build/whiteboard-$tag.tgz whiteboard/ui:$tag
 