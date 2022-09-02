const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const middleware = require('./middlewares/login');
const validateToken = require('./middlewares/validateJWT');

// ...

const app = express();

app.use(express.json());

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const apiRoutes = express.Router();
app.use(apiRoutes);

apiRoutes.post('/login', middleware.validateLogin, routes.login);
apiRoutes.post('/user', routes.createUser);
apiRoutes.get('/user', validateToken, routes.getUser);
apiRoutes.get('/user/:id', validateToken, routes.getUserById);
apiRoutes.delete('/user/me', validateToken, routes.deleteUser);

apiRoutes.post('/categories', validateToken, routes.createCategory);
apiRoutes.get('/categories', validateToken, routes.getCategory);

apiRoutes.get('/post/search', validateToken, routes.searchPost);
apiRoutes.post('/post', validateToken, routes.createPost);
apiRoutes.get('/post', validateToken, routes.getPost);
apiRoutes.get('/post/:id', validateToken, routes.getPostId);
apiRoutes.put('/post/:id', validateToken, routes.editPost);
apiRoutes.delete('/post/:id', validateToken, routes.deletePost);

module.exports = app;
