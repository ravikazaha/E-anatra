FROM node:20.19.0 AS builder

WORKDIR /home/node/code

RUN npm install -g npm@11.2.0

COPY package-lock.json package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.19.0 AS production

COPY --from=builder /home/node/code/dist ./dist

COPY --from=builder /home/node/code/node_modules /node_modules

EXPOSE 3000

CMD [ "node", "dist/main.js" ]