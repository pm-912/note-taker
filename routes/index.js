const router = require('express').Router();
const fs = require('fs/promises');
const uuid = require('../helpers/uuid');

// Function to pull saved data from the db.json file
const readFile = async function () {
    const data = await fs.readFile('./db/db.json', 'utf8')
    return JSON.parse(data);
};

// Function to create a file with supplied (data)
const writeFile = async function (data) {
    try {
        return await fs.writeFile('./db/db.json', JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
};

// Handles any GET request for data
router.get('/api/notes', async (req, res) => {
    res.json(await readFile());
});

//Handles any POST request for adding new notes
router.post('/api/notes', async (req, res) => {
    console.info(`${req.method} request received to add a new note`);
    try {
        const { title, text } = req.body;
        if (title && text) {
            // If the note had a title and text, this adds
            // a unique id to it with the uuid function
            const newNote = {
                title,
                text,
                id: uuid()
            };
            const savedNotes = await readFile();
            // Adds the new note to the array of notes,
            // then writes the file with the new data
            savedNotes.push(newNote);
            await writeFile(savedNotes);
            res.json('New note saved!');
        } else {
            res.status(500).json('Error in posting note');
        }
    } catch (err) {
        console.err(err)
    }
});

// Handles any DELETE requests
router.delete('/api/notes/:id', async (req, res) => {
    try { 
        const { id } = req.params;
        if (id) {
            // If the note that is trying to be deleted has an
            // id, then filter the current saved notes and save any that DON'T match the one trying to be deleted
            const savedNotes = await readFile();
            const newNotes = savedNotes.filter((data) => data.id !== id);
            // Then write the file with the new array
            await writeFile(newNotes);
            res.json('Note deleted');
        } else {
            res.status(500).json('Error in deleting note');
        }
    } catch (err) {
        console.err(err)
    }
});

module.exports = router;