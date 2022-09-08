#!/bin/bash

# bash v4.0+
declare -A MAP=(
	[foo]=bar
	[baz]=qux
	[corge]=grault
)

# get value
echo "${MAP[foo]}"
echo "${MAP[baz]}"

# values
echo "${MAP[@]}"
# keys
echo "${!MAP[@]}"

# print key=value, simple loop
for key in "${!MAP[@]}"; do
	echo "${key}=${MAP[${key}]}"
done

# bash v5.1
echo "${MAP[@]@K}"

# Length
echo ${#MAP[@]}

# To delete from an associative array, use "unset" with similar syntax to assigning
unset "MAP[foo]"
echo ${#MAP[@]}
echo "${MAP[foo]}"

# You need to unset and re-declare to get a cleared associative array
unset MAP
declare -A MAP
echo "${MAP[foo]}"
