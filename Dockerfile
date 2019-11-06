FROM node:12.6.0

WORKDIR /user/src/sportsfinder
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

ENV SPORTSFINDER_MONGO_URI=mongodb://mongo:27017
ENV SPORTSFINDER_DB_NAME=sportsfinder