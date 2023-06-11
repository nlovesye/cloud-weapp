FROM node:16

LABEL maintainer=nlovesye.github.com

# 创建一个工作目录
WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 10000

VOLUME [ "/app/public" ]

CMD ["node", "dist/server.bundle.js"]