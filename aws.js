var AWS = require("aws-sdk");
var uuid = require("uuid");

var bucketName = 'node-sdk-sample' + uuid.v4();
var keyName = 'hello_world.txt';
var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();

AWS.config.getCredentials(function(err){
    if(err) console.log(err.stack);
    else {
        console.log("Access key: ",AWS.config.credentials.accessKeyId);
        console.log("Secret access key: ", AWS.config.credentials.secretAccessKey);
    }
})

bucketPromise.then(
    function(data){
        var objectParams = {Bucket: bucketName, Key: keyName, Body: 'Hello World'};
        var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
        uploadPromise.then(
            function(data) {
                console.log("Successfully uploaded data to" + bucketName + "/" + keyName);
            });
}).catch(
    function(err) {
        console.error(err, err.stack);
    }
);

AWS.config.getCredentials(function(err){
    if(err) console.log(err.stack);
    else {
        console.log("Access key :", AWS.config.credentials.accessKeyId);
        console.log("Secret access key :", AWS.config.credentials.secretAccessKey);
    }
});