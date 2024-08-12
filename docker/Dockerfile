# 1. Build stage
FROM node:18 AS builder

WORKDIR /app

# npm을 사용할 경우 package-lock.json을 함께 복사
COPY package.json package-lock.json ./
RUN npm install --production

COPY . .

RUN npm run build

# 2. Production stage
FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Dockerfile
ENV NODE_PATH=src
