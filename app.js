const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const device = require('express-device');
app.use(device.capture());

router.get('/',function(req,res){
  //res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
  res.sendFile(path.join(__dirname+ '/' + req.device.type.toLowerCase() +'/home.html'));
});

router.get('/product',function(req,res){
    res.sendFile(path.join(__dirname+ '/' + req.device.type.toLowerCase() +'/product.html'));
});

router.get('/contact',function(req,res){
  //res.sendFile(path.join(__dirname+'/sitemap.html'));
  res.sendFile(path.join(__dirname+ '/' + req.device.type.toLowerCase() +'/contact.html'));
});

//add the router
app.use(express.static(__dirname + '/View'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');