## Toptal calories Project

### General Remarks

This project is built using [rails-api](http://edgeguides.rubyonrails.org/api_app.html) as the backend, using a postgresql database. And a boilerplate of [react](https://github.com/facebookincubator/create-react-app/) as the client.

It is currently reachable online at [this url](top-calories-client.herokuapp.com).

### Running locally

The project can be run locally following these steps in two separate terminal tabs:

Inside the rails folder (calories_rails_api):
1. `$ bundle install`
2. `$ rake db:setup`
2. `$ rails test`
3. `$ rails s -p 3001`

Inside the react folder (calories_react_client):
1. `$ npm install`
2. `$ npm test`
3. `$ npm start`

The result should be the rails server and the node server running.
In your browser you can now navigate to `localhost:3000` and see the application live locally.

### Postman client

Additionally from the tests done in the rails api, the endpoints can be tested using the following postman client [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/07c79744bd142a27f71d).

To use the postman client you first need to obtain an `auth_token` using the `Sessions#create` endpoint. Once you have it, you can pass it in the `Authorization` header in every request.  
