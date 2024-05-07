// app.js
const express = require('express');
const cassandra = require('cassandra-driver');
const app = express();
const port = 3000;
const Uuid = cassandra.types.Uuid;
// Initialize Cassandra Client
const client = new cassandra.Client({
  contactPoints: ['cassandra'],
  localDataCenter: 'datacenter1',
  keyspace: 'examplekeyspace',
});

// Middleware to parse JSON
app.use(express.json());

// Endpoint to write data
app.post('/data', async (req, res) => {
  const { value } = req.body;
  const id = Uuid.random();
  const query = 'INSERT INTO exampletable (id, value) VALUES (?, ?)';
  try {
    await client.execute(query, [id, value], { prepare: true });
    res.json({
          message: 'Data inserted successfully',
          id: id,
          value: value
        });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Failed to insert data');
  }
});
// Endpoint to read data
app.get('/data/:id', async (req, res) => {
  const query = 'SELECT * FROM exampletable WHERE id = ?';
  const result = await client.execute(query, [req.params.id], { prepare: true });
  res.json(result.rows);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});
