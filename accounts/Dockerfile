FROM node:latest
ENV ACCOUNTS_PORT 10202

WORKDIR /app
ADD . /app

RUN npm install

EXPOSE $ACCOUNTS_PORT

CMD ["./wait-for-it.sh", "redis:6379", "--", "node", "index.js"]
