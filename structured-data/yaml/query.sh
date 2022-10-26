#!/usr/bin/env bash

sample=('[]' '[0]' '[1]' '[1:2]' '[1:]' '[3]')

for i in "${sample[@]}"; do
	echo "Sample: $i"
	yq sample.yml ".slice${i}"
done
