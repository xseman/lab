#!/bin/bash

cat <<EOF
This is line1
Another line
Finally 3rd line
EOF

# tabs suppresion
cat <<-EOF
	This message is indented
		This message is double indented
EOF
