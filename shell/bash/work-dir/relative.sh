#!/bin/bash

# ${0} first argument, path to script itself
# strip last component from file name
cd "$(dirname "$0")" || exit 1

echo "${BASH_SOURCE[0]}"
echo "${BASH_SOURCE}" # same as [0]
echo "${0}" 		  # same as [0]

# $BASH_SOURCE is accesible in v3+

# for portability, use ${BASH_SOURCE[0]} when it is defined, and $0 otherwise
echo "${BASH_SOURCE[0]:-$0}"


# Resources

# - https://stackoverflow.com/questions/24112727/relative-paths-based-on-file-location-instead-of-current-working-directory
# - https://stackoverflow.com/questions/35006457/choosing-between-0-and-bash-source
