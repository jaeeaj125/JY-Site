const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/jy-site');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
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

const seedDB = async () => {
    await Project.deleteMany({})
    for (let i = 0; i < 20; i++) {
        const project = new Project({
            name: 'Pneumatic Line Tracking Car',
            title: 'Mechanical Design',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo autem porro labore maxime, a pariatur eos error perspiciatis, harum repellendus ipsa voluptas quod ipsam quis ratione recusandae dolores fugit eveniet! Magni alias impedit aspernatur delectus totam amet numquam, nemo accusamus provident vero officia commodi qui nam assumenda architecto, distinctio eaque suscipit culpa! Dolorem accusamus perferendis doloremque eius soluta, aliquid dolore? Commodi facere debitis rem magnam eos numquam mollitia nostrum similique qui reiciendis quos laboriosam culpa omnis placeat, ab assumenda rerum harum distinctio veniam ut. Vitae voluptatibus nihil hic laborum aut."
        })
        await project.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})