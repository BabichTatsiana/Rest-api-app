FROM node:13.12-alpine

COPY package*.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

ENTRYPOINT ["npm", "run", "start"]