package main

import (
	"bytes"
	"fmt"
	"html/template"
	"os"
)

type Entry struct {
	Name string
	Done bool
}

type Todo struct {
	User string
	List []Entry
}

func main() {
	entry := "Name: {{ .Name}} Done: {{ .Done }}"

	tmpl, err := template.New("todos").Parse(entry)
	if err != nil {
		panic(err)
	}

	todoEntry := Entry{Name: "Foo", Done: false}
	if err := tmpl.Execute(os.Stdout, todoEntry); err != nil {
		panic(err)
	}

	// use buffer to store output
	var out bytes.Buffer
	if err := tmpl.Execute(&out, todoEntry); err != nil {
		panic(err)
	}

	fmt.Println(out.String())
}

// Related:
// - https://gobyexample.com/text-templates
