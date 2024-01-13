const fs = require("fs");
fs.writeFile(
    "test.txt",
    "Hello World. Welcome to Node.js File System module.",
    (err) => {
      if (err) throw err;
      console.log("File created!");
    }
  );
  fs.readFile("test.txt", (err, data) => {
    if (err) throw err;
    console.log(data.toString());
  });
  fs.appendFile("test.txt", " This is my updated content", (err) => {
    if (err) throw err;
    console.log("File updated!");
  });
  
