const express = require('express');
const bodyParser = require('body-parser');
const { setupKeyspace, client } = require('./database');
const createSchema = require('./migrations'); // Adjust this import based on actual file structure

const app = express();
app.use(bodyParser.json());

setupKeyspace().then(() => {
  // Call createSchema after the keyspace has been set up
  createSchema(client).then(() => {
    console.log('Database schema setup completed.');
    // Start the server only after the schema is set up
    const { postOrder, getOrder } = require('./orderController');

    app.post('/orders', postOrder);
    app.get('/orders/:id', getOrder);

    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  }).catch(error => {
    console.error('Error setting up database schema:', error);
  });
}).catch(error => {
  console.error('Failed to start server:', error);
});
