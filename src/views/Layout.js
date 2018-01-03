var m = require("mithril")

module.exports = {
    queryData: function(){
        console.log( 'hey' );
        var docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName : "Movies",
            KeyConditionExpression: "#yr = :yyyy",
            ExpressionAttributeNames:{
                "#yr": "year"
            },
            ExpressionAttributeValues: {
                ":yyyy":1985
            }
        };

        docClient.query(params, function(err, data) {
            if (err) {
                document.getElementById('textarea').innerHTML += "Unable to query. Error: " + "\n" + JSON.stringify(err, undefined, 2);
            } else {
                // document.getElementById('textarea').innerHTML += "Querying for movies from 1985: " + "\n" + JSON.stringify(data, undefined, 2);
                console.log( data );
                return data.Items;
            }
        });
    },
    oninit: this.queryData,
    view: function(vnode) {
        return m("main.layout", [
            m("nav.menu", [
                m("a[href='/list']", {oncreate: m.route.link}, "Users")
            ]),
            m("section", vnode.children),
            m("input#queryData", {value:"Query",type:"button", onclick: this.queryData}),
            // m("textarea#textarea", {readonly:true, style:"width:400px;height:800px;"})
        ])
    }
}
