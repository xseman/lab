package main

import (
	"net/http"
	"os"
	"time"
)

func main() {
	client := http.Client{
		Timeout: 2 * time.Second,
	}

	resp, err := client.Get("http://app:8080/health")
	if err != nil || resp.StatusCode != http.StatusOK {
		os.Exit(1)
	}

	os.Exit(0)
}
