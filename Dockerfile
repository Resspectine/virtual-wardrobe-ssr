FROM node:16.10.0-alpine3.14 as builder

WORKDIR /app

ENV NODE_OPTIONS "--max-old-space-size=4096"

COPY package.json package-lock.json ./
ENV APP_ENV=production
RUN npm install

COPY . .

ENV NODE_ENV=production

RUN npm run build


CMD ["npm", "start"]
