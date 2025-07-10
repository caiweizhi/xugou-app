import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // __dirname 指向 vite.config.ts 文件所在的目录
    },
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          // 将 lucide-react 图标单独打包
          'lucide-icons': ['lucide-react'],
          // 将主要的 React 相关库打包
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // 将 UI 组件库打包
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select'],
        },
      },
      // 限制并发处理的文件数量
      maxParallelFileOps: 3,
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
    // 增加文件监听限制
    chunkSizeWarningLimit: 1000,
    // 使用 esbuild 进行压缩（更快）
    minify: 'esbuild',
    // 减少构建时的内存使用
    target: 'esnext',
    sourcemap: false,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true,
        // 如果后端 API 不包含 /api 前缀，可以重写路径
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      // 如果需要代理其他路径，可以添加更多配置
    },
    // 如果需要指定前端开发服务器端口
    port: 5173,
  },
});
