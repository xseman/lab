package main

import "fmt"

func main() {
	foo := Foo()
	fmt.Println(foo)
}

// Go's return values may be named.
// If so, they are treated as variables defined at the top of the function.
func Foo() (foo int) {
	foo++
	return foo
}
