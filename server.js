
const express = require('express');
const path = require('path');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

// middleware 
app.use(express.static('public'));
app.use(express.json());
app.use(routes);


// Loads the notes.html file when the user 
// goes to the /notes endpoint
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));