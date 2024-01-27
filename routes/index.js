const router = require('express').Router();
const fs = require('fs/promises');

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
    const savedNotes = await readFile();
    savedNotes.push(req.body);
  
    await writeFile(savedNotes);
    res.json('New note saved!')
});

router.delete('/api/notes', async (req, res) => {
// read file, remove data from array, then write file with new array
});

module.exports = router;
