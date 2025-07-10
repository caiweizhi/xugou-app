package main

import (
	"fmt"
	"os"

	"github.com/xugou/agent/cmd/agent"
)

func main() {
	if err := agent.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
