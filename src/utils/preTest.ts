const fs = require("fs-extra");

// Used to clear test-result folder brfore every run

try{
    fs.ensureDir("test-results");
    fs.emptyDir("test-results");
}
catch(error)
{
    console.log("test-result folder not created" +  error)
}