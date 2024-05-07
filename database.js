const cassandra = require('cassandra-driver');
let client = new cassandra.Client({
  contactPoints: ['cassandra'],
  localDataCenter: 'datacenter1',
});

const keyspace = 'examplekeyspace';

const setupKeyspace = async () => {
  const query = `
    CREATE KEYSPACE IF NOT EXISTS ${keyspace} WITH replication = {
      'class': 'SimpleStrategy',
      'replication_factor': '1'
    };
  `;
  try {
    await client.execute(query);
    console.log(`Keyspace '${keyspace}' created or already exists.`);
    client = new cassandra.Client({
      contactPoints: ['cassandra'],
      localDataCenter: 'datacenter1',
      keyspace: keyspace
    });
    await client.connect();
    console.log(`Connected to Cassandra with keyspace '${keyspace}'.`);
    return client;
  } catch (error) {
    console.error('Error setting up keyspace:', error);
    throw error;
  }
};

module.exports = { setupKeyspace, client };
