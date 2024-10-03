var Connection = require('tedious').Connection;  
var config = {  
    server: 'CABIN',  // Update me
    authentication: {
        type: 'default',
        options: {
            userName: 'sports', // Update me
            password: 'sports@123'  // Update me
        }
    },
    options: {
        // encrypt: true,
        database: 'SPORTS'  // Update me
    }
}; 

var connection = new Connection(config);  

connection.on('connect', function(err) {  
    if (err) {  
        console.error('Connection failed:', err);  
    } else {  
        console.log("Connected");  
        executeStatement();  
    }  
});  

connection.connect();

var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  

function executeStatement() {  
    var request = new Request("SELECT * FROM Category", function(err) {  
        if (err) {  
            console.log(err);  
        }  
    });  
    
    var result = "";  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
            if (column.value === null) {  
                console.log('NULL');  
            } else {  
                result += column.value + " ";  
            }  
        });  
        console.log(result);  
        result = "";  
    });  

    request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
    });  

    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    
    connection.execSql(request);  
}
