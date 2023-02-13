git sFROM node:16-alpine AS builder

ARG GITHUB_TOKEN

WORKDIR /app

RUN apk update && \
    apk add --no-cache bash openssh-client git
RUN git config --global url."https://${GITHUB_TOKEN}:x-oauth-basic@github.com/".insteadOf "https://github.com/"
RUN git config --global --add url."https://${GITHUB_TOKEN}:x-oauth-basic@github.com/".insteadOf "git@github.com/"
RUN git config --global --add url."https://${GITHUB_TOKEN}:x-oauth-basic@github.com/".insteadOf "ssh://git@github.com/"

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./
RUN yarn build

FROM node:16-alpine

ARG GITHUB_TOKEN
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

RUN apk update && \
    apk add --no-cache bash openssh-client git
RUN git config --global url."https://${GITHUB_TOKEN}:x-oauth-basic@github.com/".insteadOf "https://github.com/"
RUN git config --global --add url."https://${GITHUB_TOKEN}:x-oauth-basic@github.com/".insteadOf "git@github.com/"
RUN git config --global --add url."https://${GITHUB_TOKEN}:x-oauth-basic@github.com/".insteadOf "ssh://git@github.com/"

COPY package.json yarn.lock ./
RUN yarn install --prod

COPY config ./config/
COPY --from=builder /app/dist/ /app/dist

ENV NODE_OPTIONS "--max_old_space_size=16384"

CMD ["node", "/app/dist/main.js"]
