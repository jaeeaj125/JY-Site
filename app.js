const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Schema = mongoose.Schema;
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');


const dbUrl = 'mongodb://localhost:27017/jy-site';

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database Connected!')
});

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Project = mongoose.model('Project', projectSchema);

const app = express();
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', ejsMate)

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

const port = 3000;

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/projects', async (req, res) => {
    const projects = await Project.find({});
    res.render('projects/index', { projects })
})

app.get('/projects/new', (req, res) => {
    res.render('projects/new')
})

app.post('/projects', async (req, res) => {
    const project = await new Project(req.body.project);
    await project.save()
    res.redirect('/projects')
})

app.get('/projects/:id', async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    res.render('projects/show', { project })
})

app.get('/projects/:id/edit', async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    res.render('projects/edit', { project })
})

app.put('/projects/:id', async (req, res) => {
    console.log('Submit edit form!')
    const { id } = req.params;
    const campground = await Project.findByIdAndUpdate(id, { ...req.body.project });
    res.redirect(`/projects/${id}`)
})

app.delete('/projects/:id', async (req, res) => {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    res.redirect('/projects')
})

app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})