FROM node:apline as builder
WORKDIR '/app'
COPY ./package.json ./
RUN apk add --update yarn
RUN apk add --update htop
RUN apk add --update curl
COPY ./ ./
RUN yarn start

FROM nginx as server
EXPOSE 80
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html