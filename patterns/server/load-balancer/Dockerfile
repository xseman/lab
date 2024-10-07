FROM docker.io/golang:alpine AS builder

WORKDIR /app

COPY . .

RUN go build -o app app.go
RUN go build -o health health.go


FROM scratch

WORKDIR /app

COPY --from=builder /app/app .
COPY --from=builder /app/health /health

EXPOSE 8080

CMD ["./app"]
