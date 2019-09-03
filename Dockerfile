FROM node:10-alpine

LABEL "repository"="https://github.com/bdougie/loglify"
LABEL "homepage"="https://github.com/bdougie/loglify"
LABEL "maintainer"="Brian Douglas"
LABEL "com.github.actions.name"="Logs for Netlify"
LABEL "com.github.actions.description"="Connect the deployment process of Netlify to the GitHub Deployments API."
LABEL "com.github.actions.icon"="rocket"
LABEL "com.github.actions.color"="white"

COPY package*.json ./
RUN npm ci
COPY . .

ENTRYPOINT ["node", "/index.js"]
