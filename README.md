## Nestjs template

## Features
- Get users
- Get one user
## Prerequisites  
Install docker  
Install docker-compose  
Use node v20.12.0
Install nestjs: npm install -g @nestjs/cli
Free ports: 3000, 5432 and 6379   

## Installation  

Execute the next commands:  
1- Download project: git clone https://github.com/Gabi-Einz/TaskManagement.git  
2- Switch to develop branch: git checkout develop  
3- Copy and paste ".env" file in the root folder of the project.  
4- Install dependencies: npm install  
5- Create redis and postgresql instances: docker-compose up -d  
6- Verify if redis and postgresql containers is ok: docker ps  
7- Execute migrations: npx prisma migrate dev --name init  
8- Execute SQL queries, insert mock users in postgresql database using file "_User__202504100054.sql"  

## How to run the APP?
```
npm run start 

chmod 711 ./up_dev.sh
./up_dev.sh
```
## How to run the tests?
```
chmod 711 ./up_test.sh
./up_test.sh
```
## How to use?  
1- import "thunder-collection_postman_TaskManagement.json" file using client like postman.  

## Areas to improve
- Error handling could be improved
- a seed migration would be useful to have an already working app with data

## Errors to be fixed

-Docker app is not running correctly

## Techs
- NestJs
- NodeJs
- Prisma
- Postgres
- Redis

## Decision made
- Clean Architecture: to be able to handle further changes in the future in a proper way.

## Route

- API swagger: