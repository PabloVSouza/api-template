FROM node:lts-alpine AS devDependencies
# ADD https://www.google.com /time.now
WORKDIR /app
COPY package.json yarn.* tsconfig.json ./
COPY ./src ./src
RUN yarn install --production=false --frozen-lockfile

FROM node:lts-alpine AS dependencies
WORKDIR /app
COPY package.json yarn.* ./
COPY ./src ./src
RUN yarn install --production=true --frozen-lockfile

FROM node:lts-alpine AS build
WORKDIR /app
COPY --from=devDependencies /app/ .
COPY . .
RUN yarn build

FROM node:lts-alpine AS runtime
COPY --chown=node:node --from=dependencies /app/node_modules /home/node/app/node_modules/
COPY --chown=node:node --from=build /app/node_modules/.prisma /home/node/app/node_modules/.prisma/
COPY --chown=node:node --from=build /app/database.db /home/node/app/database.db
COPY --from=build --chown=node:node /app/dist /home/node/app/dist/
CMD [ "node", "/home/node/app/dist/main.js" ]