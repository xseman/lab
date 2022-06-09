package main

import (
	"fmt"
)

// Go's return values may be named.
// If so, they are treated as variables defined at the top of the function.
func Foo() (foo int) {
	foo++
	return foo

	// We can also just call return, which is same behaviour
	// return
}

func main() {
	foo := Foo()
	fmt.Println(foo)
}
