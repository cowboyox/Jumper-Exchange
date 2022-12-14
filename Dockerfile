FROM node:18.12.1-alpine3.16 as builder

WORKDIR /app

COPY package.json yarn.lock tsconfig.base.json lerna.json ./
COPY packages/ ./packages
COPY .yarn/ ./.yarn

RUN yarn install
RUN yarn build

###

FROM nginx:stable-alpine

COPY --from=builder /app/packages/dapp/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]