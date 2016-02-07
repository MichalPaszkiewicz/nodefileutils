var fs = require("fs");

var file = process.argv[2];
var size = parseInt(process.argv[3]);

if(file == null || file == undefined){
    console.log("arg 3 must be the file name containing the JSON array you are splitting");
}

if(size <= 0){
    console.log("arg 4 must be an integer greater than 1.");
}

var objects = JSON.parse(fs.readFileSync(file,"utf-8"));

console.log("splitting file to files with " + size + " objects per file.");

var objectContainer = [];
var counter = 0;

for(var i = 0; i < objects.length; i++){
    objectContainer.push(objects[i]);
    
    if(objectContainer.length == size || i == objects.length - 1){
        var textJSON = JSON.stringify(objectContainer);
        var fileName = ("0000" + counter).substr(-4,4);
        console.log("creating " + fileName + ".json with " + objectContainer.length + " objects");
        fs.writeFileSync(fileName + ".json", textJSON);
        counter++;
        objectContainer = [];
    }
}
