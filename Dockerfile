FROM node:10.12-alpine

COPY package.json /usr/html/
COPY .env /usr/html/
COPY src/ /usr/html/src

WORKDIR /usr/html/
RUN mkdir /usr/html/logs

RUN yarn build

EXPOSE 1989

# start application, linting & unit specs must pass for this to run
CMD ["yarn", "start:production"]
