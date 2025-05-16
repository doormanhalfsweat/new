/**
 * Database configuration for Neon PostgreSQL
 */
import { Pool } from 'pg';

// Environment variables should be used in production
// This function gets the database URL from environment variables or falls back to a default
const getDatabaseUrl = (): string => {
  // In production, use environment variables
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL environment variable is not set in production');
      // Return a placeholder that will fail gracefully
      return '';
    }
    return process.env.DATABASE_URL;
  }
  
  // For development or if no environment variable is set
  // You can set a default development database URL here if needed
  return process.env.DATABASE_URL || '';
};

// Create a new pool using the connection string
const createPool = () => {
  const databaseUrl = getDatabaseUrl();
  
  if (!databaseUrl) {
    console.error('No database URL available');
    return null;
  }
  
  try {
    return new Pool({
      connectionString: databaseUrl,
      ssl: {
        rejectUnauthorized: false // Required for Neon PostgreSQL
      }
    });
  } catch (error) {
    console.error('Failed to create database pool:', error);
    return null;
  }
};

// Export a singleton pool instance
let pool: Pool | null = null;

export const getPool = (): Pool | null => {
  if (!pool) {
    pool = createPool();
  }
  return pool;
};

// Helper function to execute queries
export const query = async <T>(text: string, params: any[] = []): Promise<T[]> => {
  const client = await getPool()?.connect();
  
  if (!client) {
    throw new Error('Could not connect to the database');
  }
  
  try {
    const result = await client.query(text, params);
    return result.rows as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    client.release();
  }
};