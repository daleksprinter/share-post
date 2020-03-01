FROM "node:latest" as builder

WORKDIR /app

COPY ./app/package.json .
RUN npm install

COPY ./app/public ./public
COPY ./app/src ./src

RUN npm run build


FROM "nginx:alpine"
RUN apk --no-cache add ca-certificates
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
