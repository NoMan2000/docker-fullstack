FROM node:alpine

WORKDIR '/app'
COPY ./package.json ./
RUN apk add --update yarn
RUN apk add --update htop
RUN apk add --update curl
RUN yarn

COPY ./ ./
CMD ["yarn", "start"]