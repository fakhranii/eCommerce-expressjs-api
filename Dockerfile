FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app/

EXPOSE 8000

CMD ["npm", "run", "start:dev"] 

