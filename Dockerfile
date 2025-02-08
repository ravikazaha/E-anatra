FROM node AS builder

WORKDIR /home/node/code

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node

COPY --from=builder /home/node/code/dist ./dist

COPY --from=builder /home/node/code/node_modules ./node_modules

EXPOSE 3000

CMD [ "node", "dist/main.js" ]