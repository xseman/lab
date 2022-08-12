#!/bin/bash

docker run --name test -d busybox sh -c "while true; do $(echo date); sleep 1; done"
echo "$(date)"

echo "Sleeping 5s"
sleep 5s

echo "Logs until 2s"
docker logs -f --until=2s test

echo "Removing image..."
docker rm -f test
