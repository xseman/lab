package main

import (
	"fmt"
)

type User struct {
	Name     string
	Surnname string
}

// nope, constants cannot be structs
// const MyUser = User{Name: "foo", Surnname: "bar"}
// const MyUser = struct{Foo string}{"foo"}
var MyUser = User{Name: "foo", Surnname: "bar"}

func Foo() { fmt.Println("foo") }

// nope, functions too
// const FOO = Foo

const (
	FOO = "FOO"
	BAR = 0
)

func main() {
	// FOO()

	// MyUser := struct {
	// 	Foo string
	// 	Bar int
	// }{"foo", 0}

	fmt.Printf("%+v \n", MyUser)

	fmt.Println(FOO)
	fmt.Println(BAR)
}
