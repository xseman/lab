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

FOO="FOO"

# save to variable
PATCH=$(cat <<EOF
{
	"foo": {
		"bar": {
			"baz": {
				"qux": "${FOO}"
			}
		}
	}
}
EOF
)

echo "${PATCH}"

# save to variable, with read
read -r -d '' READ <<EOF
foo:
	bar:
		baz:
			qux: ${FOO}
EOF

echo "${READ}"
