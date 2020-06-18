const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = express();
app.use(cors());
app.use(express.json());

const projects = [

];

/**
 * Middleware: interceptador, pode interromper totalmente a requisição, roda antes das rotas, utilizado neste caso para log
 * 
 */


function logRequests(request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;
    console.log(logLabel);
    return next();
}

function validateProjectId(request, response, next) {

    const { id } = request.params;
    if (!isUuid(id)) {
        return response.status(400).json({ error: "Project Id invalid" });
    }
    next();

}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);
app.get('/projects', (req, res) => {

    const { title } = req.query;

    const results = title ? projects.filter(f => f.title.includes(title)) : projects;
    return res.json(results);
});

app.get('/projects/:id', (req, res) => {
    const params = req.parms

    console.log(params);

    return res.json(['Projeto 1', 'Projeto 2']);
});

app.post('/projects', /*validateProjectId,*/ (req, res) => {
    const { title, owner } = req.body;

    const project = { id: uuid(), title, owner };
    projects.push(project)

    return res.json(project);
});
app.put('/projects/:id', /*validateProjectId,*/ (req, res) => {

    const { id } = req.params;

    const projectIndex = projects.findIndex(f => f.id === id);

    if (projectIndex < 0) {
        return res.status(400).json({ error: "Project Not Found" });
    }
    const { title, owner } = req.body;

    const project = {
        id,
        title,
        owner
    };

    projects[projectIndex] = project;

    return res.json(project);
});
app.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    const projectIndex = projects.findIndex(f => f.id === id);

    if (projectIndex < 0) {
        return res.status(400).json({ error: "Project Not Found" });
    }

    projects.splice(projectIndex, 1);

    return res.status(204).send();

});
app.listen(3333, () => {
    //Roda antes de iniciar o server.
    console.log('backend started😁😁');
});


//node src/index.js