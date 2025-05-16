# Netlify Deployment Guide

This document provides instructions for deploying this Vite React application to Netlify.

## Configuration Files

The project has been configured for Netlify deployment with the following files:

1. `netlify.toml` - Main configuration file that defines build settings, redirects, and environment variables
2. `netlify.config.js` - Build plugin configuration for custom build steps

## Deployment Steps

### Option 1: Deploy via Netlify UI

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to your Netlify account
3. Click "New site from Git"
4. Select your repository and branch
5. Build settings will be automatically detected from the `netlify.toml` file
6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI globally:
   ```
   npm install -g netlify-cli
   ```

2. Log in to your Netlify account:
   ```
   netlify login
   ```

3. Initialize your site (if not already done):
   ```
   netlify init
   ```

4. Deploy your site:
   ```
   netlify deploy
   ```

5. For production deployment:
   ```
   netlify deploy --prod
   ```

## Configuration Details

### Build Settings

- **Base directory**: `/` (root of the project)
- **Build command**: `npm run build`
- **Publish directory**: `dist` (Vite's default output directory)

### Redirects

The configuration includes a redirect rule that sends all routes to `index.html`, enabling client-side routing with React Router.

### Cache Control

- Static assets in `/assets/*` are cached with a long expiration time for better performance
- Other files use a more conservative caching policy

### Environment Variables

The configuration sets `NODE_ENV=production` for all deployment contexts. Additional environment variables should be configured in the Netlify UI or using the Netlify CLI.

## Troubleshooting

### Common Issues

1. **Build Failures**: Check the build logs in the Netlify dashboard for specific errors
2. **Routing Issues**: Ensure the redirect rule in `netlify.toml` is correctly configured
3. **Environment Variables**: Verify that all required environment variables are set in the Netlify dashboard

### Getting Help

For more information, refer to the [Netlify documentation](https://docs.netlify.com/).