# NodeJS Authentication Web Token API Example



### Components

  - NodeJS
  - Mongodb
  
### Installation
```sh
cd nodejs-authentication-token-api-example
npm install --save
```

Edit the config.json file:
```javascript
{
    "connectionString": "mongodb://localhost:27017/nodejs_api", //Mongodb
    "secret": "123456789" //Token Secret Security Key
}
```

### Run the Project
```sh
node index.js
```
<img src="https://preview.ibb.co/cRF8tp/node-run.png" alt="NodeJS Authentication Web Token API Example" />


### API Routes
  - api/authentication (POST)
  - api/me (GET)
  - api/list (GET)
  - api/create (POST)
  - api/delete/:id (DELETE)
  - api/update/:id (PATCH)<br/><br/>
** More details can be found in postman json files  (NodeJS Auth Example.postman_collection.json)<br/>

### Header
  - api_url: http://localhost:5000/api
  - token:(api/authentication POST)



<br/><br/>
<hr/>
<div align="center">
<a href="http://www.atknuludag.com" target="_blank"><img width="50" src="http://www.atknuludag.com/wp-content/uploads/2016/08/favicon.png" alt="My blog atknuludag.com" /></a>
<br/>
<i style="font-size: 13px;">Developer by Atakan Yasin Uludağ</i>
</div>
