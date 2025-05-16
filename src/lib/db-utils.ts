/**
 * Database utility functions for common operations
 */
import { query } from './db';

// Define types for your database entities
interface User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
}

interface Notice {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

/**
 * User-related database operations
 */
export const userDb = {
  // Get all users
  getAll: async (): Promise<User[]> => {
    try {
      return await query<User>('SELECT * FROM users ORDER BY created_at DESC');
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  // Get user by ID
  getById: async (id: number): Promise<User | null> => {
    try {
      const users = await query<User>('SELECT * FROM users WHERE id = $1', [id]);
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      return null;
    }
  },

  // Create a new user
  create: async (name: string, email: string): Promise<User | null> => {
    try {
      const users = await query<User>(
        'INSERT INTO users (name, email, created_at) VALUES ($1, $2, NOW()) RETURNING *',
        [name, email]
      );
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }
};

/**
 * Notice-related database operations
 */
export const noticeDb = {
  // Get all notices
  getAll: async (): Promise<Notice[]> => {
    try {
      return await query<Notice>('SELECT * FROM notices ORDER BY created_at DESC');
    } catch (error) {
      console.error('Error fetching notices:', error);
      return [];
    }
  },

  // Get recent notices with limit
  getRecent: async (limit: number = 5): Promise<Notice[]> => {
    try {
      return await query<Notice>(
        'SELECT * FROM notices ORDER BY created_at DESC LIMIT $1',
        [limit]
      );
    } catch (error) {
      console.error('Error fetching recent notices:', error);
      return [];
    }
  },

  // Create a new notice
  create: async (title: string, content: string): Promise<Notice | null> => {
    try {
      const notices = await query<Notice>(
        'INSERT INTO notices (title, content, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *',
        [title, content]
      );
      return notices.length > 0 ? notices[0] : null;
    } catch (error) {
      console.error('Error creating notice:', error);
      return null;
    }
  }
};