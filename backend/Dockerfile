FROM golang:1.12.6


RUN mkdir /go/src/work

WORKDIR /go/src/work

COPY ./src/go.mod .
COPY ./src/go.sum .
ENV GO111MODULE=on
RUN go mod download

COPY ./src/ .

RUN go build -o /main

ENTRYPOINT ["/main"]
EXPOSE 8080