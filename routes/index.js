const router = require('express').Router();
const fs = require('fs/promises');
const uuid = require('../helpers/uuid');

//make get, post, and delete methods for router
const readFile = async function () {
    const data = await fs.readFile('./db/db.json', 'utf8')
    return JSON.parse(data);
};

const writeFile = async function (data) {
    try {
        return await fs.writeFile('./db/db.json', JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
};


router.get('/api/notes', async (req, res) => {
    res.json(await readFile());
});

router.post('/api/notes', async (req, res) => {
    console.info(`${req.method} request received to add a new review`);

    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title, 
            text, 
            id: uuid()};
        

        const savedNotes = await readFile();
        savedNotes.push(newNote);

        await writeFile(savedNotes);
        res.json('New note saved!')
    } else {
        res.status(500).json('Error in posting review');
    }
});

router.delete('/api/notes', async (req, res) => {
    // read file, remove data from array, then write file with new array
});

module.exports = router;
