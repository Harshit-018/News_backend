const express = require('express');
const dbConnection = require('./connectors/dbConnection');
const assingment = express();
const Author_MODEL = require('./models/Authors');
const News_MODEL = require('./models/News');
const bcrypt = require('bcrypt');

assingment.use(express.json());

assingment.post('/authors', async(req,res) {
    try {
        const { name, email, password, Pnumber, address, articlesPublished } = req.body;
        let encryptpass = await bcrypt.hash(password, 12);

        const newAuthor = new Author_MODEL({ name, email, password:encryptpass, Pnumber, address, articlesPublished });
        await newAuthor.save();
        res.json({success: true, data: 'New Author added'});
    } catch (error) {
        res.status(400).json({ success: false, error: error.message});
    }
});

assingment.post('/news', async(req,res) {
    try {
        const { headline, description, location, author } = req.body;

        const newNews = new News_MODEL({ headline, description, location, author });
        await newNews.save();
        res.json({success: true, data: 'New News added'});
    } catch (error) {
        res.status(400).json({ success: false, error: error.message});
    }
});

assingment.get('/totalAuthor', async (req, res) => {
    try {
        const authors = await Author_MODEL.find();
        res.json({ success: true, data: authors});
    } catch (error) {
        res.status(400).json({ success: false, error: error.message});
    }
});

assingment.get('/allNews', async (req, res) => {
    try {
        const news = await News_MODEL.find();
        res.json({ success: true, data: news});
    } catch (error) {
        res.status(400).json({ success: false, error: error.message});
    }
});

assingment.put('/updateAuthor', async (req, res) => {
    try {
        const {name} = req.body;
        const updatename = await Author_MODEL.findOneAndUpdate(
            {name: name},
            {name: name},
        );
        res.json({success: true, message: "Updated Successfully.."});
    } catch (error) {
        res.status(400).json({success: false, error: error.message});
    }
});

assingment.get('/particularNews', async (req, res) => {
    try {
        const {author} = req.body;
        const news = await News_MODEL.findOne(
            {author: author},
            {headline: 1, description: 1}
        );
        res.json({ success: true, data: news});
    } catch (error) {
        res.status(400).json({ success: false, error: error.message});
    }
});

assingment.get('/particularLocationNews', async (req, res) => {
    try {
        const {location} = req.body;
        const news = await News_MODEL.find(
            {location: location},
            {headline: 1, description: 1}
        );
        res.json({ success: true, data: news});
    } catch (error) {
        res.status(400).json({ success: false, error: error.message});
    }
});

assingment.delete('/deleteNews', async (req, res) => {
    try {
        const { author } = req.body;

        await News_MODEL.findOneAndDelete({ author });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message});
    }
});


dbConnection();
// creating server
let port = 4000;
assingment.listen(port, () => console.log(`Server is running at ${port}`));