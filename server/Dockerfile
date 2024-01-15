FROM ubuntu:latest

WORKDIR /home/node/app

USER root

RUN apt-get update -y \
    && apt-get install -y curl

RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash - \
    && apt-get install -y nodejs

RUN apt-get update && apt-get install -y procps

RUN npm install -g @nestjs/cli

RUN npm rebuild bcrypt --update-binary

CMD ["tail", "-f", "/dev/null"]
