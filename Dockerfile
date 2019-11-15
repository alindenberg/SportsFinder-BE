FROM node:12.6.0

WORKDIR /user/src/sportsfinder
ARG SECRET
ARG MONGO_URL
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

ENV SPORTSFINDER_DB_NAME=sportsfinder
ENV SECRET=${SECRET}
ENV MONGO_URL=${MONGO_URL}