// Assuming 'client' is passed correctly
async function createSchema(client) {
  const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS examplekeyspace.orders  (
      id UUID PRIMARY KEY,
      user TEXT,
      shop TEXT,
      products TEXT,
      created_at TIMESTAMP
    );
  `;

  try {
    await client.execute(createOrdersTable);
    console.log('Orders table created or already exists');
  } catch (err) {
    console.error('Error creating orders table', err);
    throw err; // Rethrow or handle as needed
  }
}

module.exports = createSchema;
