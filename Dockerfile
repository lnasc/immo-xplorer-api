FROM node:10.15.3-alpine
WORKDIR /app
COPY . .
ENTRYPOINT ["npm", "start"]
