require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');
const app = require('./api');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3009;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => console.log('ouvindo porta', port));
