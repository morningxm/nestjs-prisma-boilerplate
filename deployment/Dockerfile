FROM node:20.17.0-alpine

LABEL version="1.0"
LABEL description='This is the base docker image for API based on Nest.js.'

WORKDIR /app

COPY ["package.json", "yarn.lock", "tsconfig.json", "tsconfig.build.json", "./"]
RUN ls
RUN yarn --frozem-lockfile
COPY . .
RUN yarn prisma:generate
RUN yarn build

EXPOSE 5100

CMD ["yarn", "prod"]
