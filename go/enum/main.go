package main

import "fmt"

type Level int

type ColorRegistry struct {
	RED   string
	GREEN string
	BLUE  string
}

func NewColorRegistry() *ColorRegistry {
	return &ColorRegistry{
		RED:   "red",
		GREEN: "green",
		BLUE:  "blue",
	}
}

var Colors = NewColorRegistry()

// more idiomatic way
const (
	UNSPECIFIED Level = iota // 0
	TRACE                    // 1
	INFO                     // 2
	WARNING                  // 3
	ERROR                    // 4
)

func main() {
	fmt.Println(UNSPECIFIED) // 0
	fmt.Println(TRACE)       // 1

	// good usage, but can be changed
	fmt.Println(Colors.BLUE)  // blue
	fmt.Println(Colors.GREEN) // green

	Colors.GREEN = "foo"
	fmt.Println(Colors.GREEN) // foo
}

// Reference:
// - https://yourbasic.org/golang/iota/
// - https://stackoverflow.com/questions/14426366/what-is-an-idiomatic-way-of-representing-enums-in-go
