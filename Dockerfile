FROM node:12.6.0

WORKDIR /user/src/sportsfinder
ARG SECRET
ARG MONGO_URL
ARG EMAIL_PASS
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

ENV SPORTSFINDER_DB_NAME=sportsfinder
ENV CLIENT_URL=https://sportsfinder.xyz
ENV SECRET=${SECRET}
ENV MONGO_URL=${MONGO_URL}
ENV EMAIL_PASS=${EMAIL_PASS}