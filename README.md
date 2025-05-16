# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/e62b3ea0-7c26-4985-8aab-c9c91484fb6a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e62b3ea0-7c26-4985-8aab-c9c91484fb6a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Neon PostgreSQL (Serverless PostgreSQL database)

## How can I deploy this project?

### Deploy with Lovable

Simply open [Lovable](https://lovable.dev/projects/e62b3ea0-7c26-4985-8aab-c9c91484fb6a) and click on Share -> Publish.

### Deploy with Netlify

This project is optimized for Netlify deployment. You can deploy it in several ways:

1. **Via Netlify UI**:
   - Push your code to a Git repository
   - Connect your repository to Netlify
   - Netlify will automatically detect the build settings from `netlify.toml`

2. **Via Netlify CLI**:
   ```sh
   # Install Netlify CLI globally
   npm install -g netlify-cli
   
   # Login to your Netlify account
   netlify login
   
   # Deploy your site
   npm run netlify:deploy
   ```

For detailed deployment instructions, see the [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) file.

## Database Setup and Configuration

This project uses Neon.tech PostgreSQL as the serverless database. Follow these steps to set up your database:

1. Create an account on [Neon.tech](https://neon.tech)
2. Create a new project
3. Get your connection string in the format:
   ```
   postgresql://username:password@endpoint-pooler.region.aws.neon.tech/dbname?sslmode=require
   ```
4. Add this connection string to your `.env` file locally (see `.env.example`)
5. For Netlify deployment, add the `DATABASE_URL` environment variable in the Netlify UI

### Database Security

**IMPORTANT**: Never commit your database credentials to your repository. The connection string in the `netlify.toml` file is only a placeholder and should be replaced with environment variables in the Netlify UI.

For detailed database setup instructions, see the [DATABASE_SETUP.md](./DATABASE_SETUP.md) file.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
