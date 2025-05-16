import { Handler } from '@netlify/functions';
import { Pool } from 'pg';

// Create a new pool for serverless functions
// Each function invocation gets a new pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Neon PostgreSQL
  },
  // Optimize for serverless environment
  max: 1, // Use a single connection for serverless functions
  idleTimeoutMillis: 120000, // Close idle connections after 2 minutes
  connectionTimeoutMillis: 10000, // Connection timeout after 10 seconds
});

const handler: Handler = async (event) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Test database connection
    const client = await pool.connect();
    try {
      // Simple query to test connection
      const result = await client.query('SELECT NOW() as current_time');
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Database connection successful',
          timestamp: result.rows[0].current_time,
          database: 'Neon PostgreSQL',
        }),
      };
    } finally {
      // Release the client back to the pool
      client.release();
    }
  } catch (error) {
    console.error('Database connection error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Database connection failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};

export { handler };