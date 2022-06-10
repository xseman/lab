package main

import "fmt"

// string is just bytes of slices

func main() {
	fmt.Println("a"[0])         // 97
	fmt.Println(string("a"[0])) // a

	chars := "abcdef"
	fmt.Println((chars[(len(chars) - 1)]))       // 102
	fmt.Println(string(chars[(len(chars) - 1)])) // f

	// we can slice a string to grab a substring
	fmt.Println(chars[0:1])           // head - a
	fmt.Println(chars[:1])            // head - a
	fmt.Println(chars[len(chars)-1:]) // tail - f
}

// Related:
// - https://go.dev/blog/slices#strings
