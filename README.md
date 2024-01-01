# Amplify NextJS Boilerplate

This is a boilerplate repository for using Amplify with NextJS. It includes Auth, Data, Storage, and Function categories, as well as server side NextJS api routes.

See [live demo](https://main.d2dpy7s07blbf1.amplifyapp.com/) to see what you get out-of-the-box.

## Development

## Configuring environment variables

Create a .env file by copying the example. Then follow the instructions in the comments on how to set values for each environment variable.

```bash
cp .env.example .env
```

## Set up the database

Deploy necessary resources to your AWS account via

```bash
npm run sandbox
```

This will create an `amplifyconfiguration.json` file at the root of your project, which contains all configuration necessary to interact with the deployed resources.

## Testing the Website

### Install dependencies

```bash
npm install
```

### Start the development server

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/notify](http://localhost:3000/api/notify). This endpoint can be edited in `pages/api/notify.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Deploy on Amplify

Deploy to AWS Amplify with one click

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/johnpc/amplify-next-boilerplate)
