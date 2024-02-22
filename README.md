# Mitratech Challenge

This was meant to be a monorepo implementation but didn't have enough time to complete it :S

## Getting Started

To install all of its dependencies and start each app, follow the instructions below.

To run the backend, cd into the `MitratechChallenge.API` directory and run:

```bash
npm i
npm run build
npm start
```

To run the frontend, cd into the `MitratechChallenge.UI` directory and run:

```bash
npm install
ng serve
```

## Testing

To execute UTs run the following command inside each app directory

```bash
npm run test
```

To execute E2E tests follow the instructions bellow:

- Build and start `MitratechChallenge.API`

```bash
  npm i
  npm run build
  npm start
```

- Start `MitratechChallenge.UI`

```bash
ng serve
```

- cd into `MitratechChallenge.Automation` and run:

```bash
npm i
  npm cypress run
```
