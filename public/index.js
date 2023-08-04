const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fs = require('fs');


router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.use(express.static(__dirname));

app.use('/',router);

app.listen(process.env.port || 3000);


//saveNotes
app.use(express.json());

app.post('/saveNote', (req, res) => {
  const newData =  req.body;
 
  fs.readFile('data/notes.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    try {
      const jsonData = JSON.parse(data);
      jsonData.notes.push(newData);
      fs.writeFile('data/notes.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    } catch (parseError) {
      console.error(parseError);
      res.sendStatus(500);
    }
  });
});



//get notes
app.get('/getNotes', (req, res) => {
  fs.readFile('data/notes.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData.notes);
    } catch (parseError) {
      console.error(parseError);
      res.sendStatus(500);
    }
  });
});




console.log("server rodando!")