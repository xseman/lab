package main

import (
	"log"
	"net/http"
)

func appHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("App request received")
	log.Println("Cookies:", r.Cookies())
	// log.Printf("%#v\n", r.Header)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Hello from Go!"))
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Health request received")

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("OK"))
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /app", appHandler)
	mux.HandleFunc("GET /health", healthHandler)

	server := &http.Server{
		Handler: mux,
		Addr:    ":8080",
	}

	log.Println("Server starting on port http://localhost:8080")
	log.Fatal(server.ListenAndServe())
}
