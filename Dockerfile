# Do the npm install in the full image
FROM mhart/alpine-node AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --prod
COPY . .

ARG ENVIRONMENT=production
ENV NODE_ENV $ENVIRONMENT
RUN yarn build

# And then copy over node_modules, etc from that stage to the smaller base image
FROM mhart/alpine-node:base
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public

ARG ENVIRONMENT=production
ENV NODE_ENV $ENVIRONMENT
COPY --from=builder /app/.$ENVIRONMENT.env ./.$ENVIRONMENT.env

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
