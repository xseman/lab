package main

import (
	"encoding/json"
	"fmt"
	"log"
)

type User struct {
	Name     string
	Surnname string
}

type UserUnexported struct {
	name     string
	surnname string
}

func main() {
	foo := User{Name: "test", Surnname: "test"}
	bar := UserUnexported{name: "test", surnname: "test"}

	exported, err := json.Marshal(&foo)
	if err != nil {
		log.Fatal(err)
	}

	unexported, err := json.Marshal(&bar)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(string(exported))
	fmt.Println(string(unexported))
}
