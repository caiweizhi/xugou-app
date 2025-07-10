# 使用 Node.js 20 作为基础镜像
FROM node:20

# 安装 cron 和 curl
RUN apt-get update && apt-get install -y cron curl && rm -rf /var/lib/apt/lists/*

# 安装 pnpm
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /app

# 复制源代码
COPY . .

# 清理可能存在的依赖文件
RUN rm -rf node_modules bun.lockb frontend/node_modules backend/node_modules

# 安装依赖
RUN pnpm install

RUN pnpm run build

# 创建 crontab 文件
RUN echo '* * * * * curl "http://localhost:8080/__scheduled?cron=*+*+*+*+*" > /proc/1/fd/1 2>&1' | crontab -

# 创建启动脚本
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'echo "Starting cron daemon..."' >> /start.sh && \
    echo 'service cron start' >> /start.sh && \
    echo 'echo "Starting application..."' >> /start.sh && \
    echo 'pnpm run preview' >> /start.sh && \
    chmod +x /start.sh

# 暴露端口
EXPOSE 8080

# 启动服务
CMD ["/start.sh"]