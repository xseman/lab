#!/bin/sh

docker compose up --build --scale app="$(nproc)"
