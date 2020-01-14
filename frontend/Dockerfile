FROM "node:latest"

WORKDIR /app

COPY ./app/package.json .

RUN npm install

COPY ./app/public ./public
COPY ./app/src ./src



