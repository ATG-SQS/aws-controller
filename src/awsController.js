var express = require('express')
    , http = require('http')
    ,_     = require('underscore');
var app = express();

var AWS = require('aws-sdk')
//AWS.config.update({accessKeyId: 'AKIAIQZNAE6PBV6RJESQ', secretAccessKey: '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', region: 'us-west-2'})


http.createServer(app).listen(5000, function(){
    console.log('Express server listening on port ' + 5000);
});

app.get('/', function (req, res) {
res.send('Service Available');
});

app.get('/config/setAccessKey/:text', function(req, rsp){
    "use strict";
    AWS.config.update({accessKeyId: req.params.text})
});

app.get('config/setSecretKey/:text', function(req, rsp) {
    "use strict";
    AWS.config.update({secretAccessKey: req.params.text})
});

app.get('/createECSInstance', function(req, rsp){
    "use strict";

    var ec2 = new AWS.EC2();


    var params = {
        ImageId: 'ami-cb584dfb',  // amazon linux ami ecs optimized
        InstanceType: 't2.micro',
        MinCount: 1, MaxCount: 1
    };

    ec2.runInstances(params, function(err, data) {
        if (err) { rsp.status("Could not create instance").send(err); return; }

        var instanceID = data.Instances[0].InstanceID;
        rsp.send("Created instance", instanceID );

        });

});


