package agent

import (
	"fmt"

	"github.com/spf13/cobra"
)

var (
	// 版本信息，可以在编译时通过 -ldflags 设置
	Version   = "0.1.0"
	GitCommit = "unknown"
	BuildDate = "unknown"
)

func init() {
	versionCmd := &cobra.Command{
		Use:   "version",
		Short: "显示版本信息",
		Long:  `显示 Xugou Agent 的版本信息、构建日期和 Git 提交哈希`,
		Run:   runVersion,
	}

	rootCmd.AddCommand(versionCmd)
}

func runVersion(cmd *cobra.Command, args []string) {
	fmt.Println("Xugou Agent 版本信息:")
	fmt.Printf("版本: %s\n", Version)
	fmt.Printf("Git 提交: %s\n", GitCommit)
	fmt.Printf("构建日期: %s\n", BuildDate)
}
