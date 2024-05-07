// app/orderController.js
const { setupKeyspace, client } = require('./database');
const { v4: uuidv4 } = require('uuid');

async function postOrder(req, res) {
  const { user, shop, products } = req.body;
  const id = uuidv4();
  const createdAt = new Date();
  const query = 'INSERT INTO examplekeyspace.orders (id, user, shop, products, created_at) VALUES (?, ?, ?, ?, ?)';
  const params = [id, user, shop, JSON.stringify(products), createdAt];

  try {
    await client.execute(query, params, { prepare: true });
    res.status(201).json({ message: 'Order created', id });
  } catch (err) {
    console.error('Error creating order', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getOrder(req, res) {
  const { id } = req.params;
  const query = 'SELECT * FROM examplekeyspace.orders WHERE id = ?';

  try {
    const result = await client.execute(query, [id], { prepare: true });
    if (result.rowLength === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching order', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { postOrder, getOrder };
