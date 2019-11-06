FROM node:12.6.0

WORKDIR /user/src/sportsfinder
COPY package*.json ./
RUN npm install
RUN npm run build
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

ENV SPORTSFINDER_MONGO_URI=mongodb://mongo:27017
ENV SPORTSFINDER_MONGO_DB=sportsfinder