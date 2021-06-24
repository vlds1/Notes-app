const { Router } = require('express')
const config = require('config')
const Note = require('../models/Note')
const auth = require('../middlewares/auth.middleware')
const router = Router()


// POST for creating a note
router.post('/create', auth, async (req, res) => {
    try {
        const { title } = req.body

        const note = new Note({title, owner: req.user.userId})
        await note.save()

        res.status(201).json({note})
    } catch (error) {
        res.status(500).json({ message: 'Somthing went wrong' })
    }
})

// this GET req need to get all user's notes
router.get('/notes', auth, async (req, res) => {
    try {
        const notes = await Note.find({ owner: req.user.userId }) // owner of a notes
        res.json(notes)
    } catch (error) {
        res.status(500).json({ message: 'Somthing went wrong' })
    }
})

// this GET req need to get note by id
router.get('/:id', async (req, res) => {
    try {
        
        const note = await Note.findById(req.params.id)

    } catch (error) {
        res.status(500).json({ message: 'Somthing went wrong' })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        
        const note = await Note.findOneAndDelete({_id: req.params.id})
        res.json(note)
    } catch (error) {
        res.status(500).json({ message: 'Somthing went wrong' })
    }
})

module.exports = router