package main

import (
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
	todo := Todo{
		User: "Foo",
		List: []Entry{
			{Name: "foo", Done: false},
			{Name: "bar", Done: false},
		},
	}

	tmpl := template.Must(template.ParseFiles("template.html"))
	if err := tmpl.Execute(os.Stdout, todo); err != nil {
		panic(err)
	}
}

// Related:
// - https://www.calhoun.io/intro-to-templates-p3-functions/
// - https://blog.gopheracademy.com/advent-2017/using-go-templates/
