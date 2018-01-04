// src/models/Items
var m = require('mithril');
var Items = {
    setUpDynamoDB: function(){
        AWS.config.update({
          region: "us-west-2",
          endpoint: 'http://localhost:8888',
          // accessKeyId default can be used while using the downloadable version of DynamoDB.
          // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
          accessKeyId: "AKIAI3H6R2NVF7GG7Q5A",
          // secretAccessKey default can be used while using the downloadable version of DynamoDB.
          // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
          secretAccessKey: "fakeSecretAccessKey"
        });
        return new AWS.DynamoDB.DocumentClient();
    },
    params: {
        TableName : "Movies",
        KeyConditionExpression: "#yr = :yyyy",
        ExpressionAttributeNames:{
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            ":yyyy":1986
        }
    },
    items: [],
    getItems: function(){
        return Items.setUpDynamoDB().query( Items.params ).promise()
        .then( function( result ){
            Items.items = result.Items;
            // Because this is a third party library
            m.redraw();
        });
    }
}

module.exports = Items;
