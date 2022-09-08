#!/bin/bash

for cmd in {curl,}; do
    if ! command -v "${cmd}" >/dev/null; then
        echo >&2 "This script requires '${cmd}' to be installed."
        exit 1
    fi
done
