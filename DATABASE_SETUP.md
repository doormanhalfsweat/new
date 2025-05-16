# Neon PostgreSQL Database Setup

## Connection Information

This project uses Neon.tech PostgreSQL as the database. The connection string format is:

```
postgresql://neondb_owner:password@endpoint-pooler.region.aws.neon.tech/neondb?sslmode=require
```

## Security Warning

**IMPORTANT**: Never commit database credentials to your repository. The connection string in the `netlify.toml` file is only a placeholder and should be replaced with environment variables in the Netlify UI.

## Setting Up Environment Variables in Netlify

1. Log in to your Netlify dashboard
2. Select your site
3. Go to **Site settings** > **Build & deploy** > **Environment**
4. Add the following environment variable:
   - Key: `DATABASE_URL`
   - Value: Your Neon PostgreSQL connection string

## Local Development

For local development, create a `.env` file in the root of your project with the following content:

```
DATABASE_URL=postgresql://neondb_owner:password@endpoint-pooler.region.aws.neon.tech/neondb?sslmode=require
```

Make sure to add `.env` to your `.gitignore` file to prevent accidentally committing it.

## Using the Database in Your Application

The database connection is configured in `src/lib/db.ts`. Import the necessary functions to execute queries:

```typescript
import { query } from '@/lib/db';

// Example usage
async function getUsers() {
  try {
    const users = await query<User>('SELECT * FROM users');
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
```

## Neon PostgreSQL Features

- **Serverless**: Scales to zero when not in use
- **Branching**: Create database branches for development and testing
- **Connection Pooling**: Efficiently manages database connections

## Troubleshooting

If you encounter connection issues:

1. Verify your connection string is correct
2. Ensure SSL is enabled (`sslmode=require`)
3. Check that your IP is allowed in Neon's connection settings
4. Verify that the environment variables are correctly set in Netlify