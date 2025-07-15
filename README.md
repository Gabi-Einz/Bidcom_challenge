## Bidcom challenge
Link Tracker is a system to mask URLs and can get analityc of the amount of times that the link was called.

## Features
- Create mask by link
- Invalidate mask
- Get mask stats
- Redirect link

## Pre-Requisites  
Install docker  
Install docker-compose  
Use node v20.12.0
Install nestjs: npm install -g @nestjs/cli
Free ports: 3000 and 3306   

## How do you run the app?  
``` 
1- Rename ".env.example" file to ".env".  
2- chmod 711 ./up_dev.sh
3- ./up_dev.sh
```

## How do you use the app?  
1- import "XXX.json" file using client like Thunder Client or Postman. Also, you can use swagger API (http://localhost:3000/api)  
2- In order to test the APIs, the API execution order is:
    1. API POST /auth/singUp (this API create an user)
    2. API POST /auth/login (this API create an access token that you can use to consume mask APIs)
    3. Now you can consume any Mask APIs..

## Areas to improve
- add unit tests and integration tests 
- a seed migration would be useful to have an already working app with data
- encrypt password input and save it in a new field.
- deploy the application in some cloud platform like Heroku.
- add CI/CD pipeline to automatize deployment.

## Techs
- NestJs
- NodeJs
- TypeORM
- MariaDb

## Decision made
- I used authentication and authorization  implementation in order to secure the APIs
- Clean Architecture: to be able to handle further changes in the future in a proper way.
- TypeORM: Because it is the already integrated ORM in the Nest Framework and it is the most popular ORM so it is easy to find fixes and people that know how to use it
- Docker: To make portable

## Route

- Local: [API Swagger](http://localhost:3000/api)