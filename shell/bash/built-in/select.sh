#!/bin/bash

select item in {a..f}; do
	echo "${item}"
done

# custom width
COLUMNS=40

select item in XXXXXXX{a..f}; do
	echo "${item}"
done

# checkbox like select
declare -A SELECTABLE=(
	[foo]=false
	[bar]=false
	[baz]=false
	[qux]=false
)

select key in "${!SELECTABLE[@]}"; do
	SELECTABLE[${key}]=true
	echo "${SELECTABLE[@]@K}"
done
