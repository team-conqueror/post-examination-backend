FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
COPY build/ ./


RUN ls -l

RUN npm install

COPY entrypoint.sh entrypoint.sh

EXPOSE 4000

ENTRYPOINT ["sh", "entrypoint.sh"]
