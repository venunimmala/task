/**
 * Dummy Virtualization Server Implementation
 */
var express = require('express');
var bodyParser = require('body-parser')
var virtCollection = require('./src/virts')
var path = require('path');
var virtualizations = new virtCollection();
var app = express();
app.use(bodyParser.json());

const fetch = require('node-fetch');

// plain text or html
fetch('src/static/index.html')
    .then(request => res.html())
    .then(body => console.log(body));

// json
fetch('/virtualizations')
    .then(response => res.json())
    .then(json => console.log(json));

/*app.get('/', function (request, response) {
    response.json({virtualizationList: virtualizations.getVirts()});
});*/

/**
 * HTTP PUT /virtualizations/:virtualizationID
 * Param: :virtualizationID is the unique identifier of the virt you want to update
 * Returns: the updated virt in a JSON format
 * Error: 404 HTTP code if it can't find the virt
 */
app.put('/sv/v1/virtualizations/:virtualizationID', function (request, response) {
    try {
        virtualizations.update(request.params.virtualizationID, request.body);
        response.sendStatus(200);
    } catch (exeception) {
        response.sendStatus(404);
    }

});


app.listen(8090, function () {
    console.log('Dummy server listening on port 8090!');
    
});