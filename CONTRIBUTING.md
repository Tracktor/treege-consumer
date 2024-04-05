# Contributing

- [Features](#Features)
- [Local installation](#local-installation)
- [Sending a Pull Request](#Sending-a-Pull-Request)
- [Available Scripts](#Available-Scripts)
    - [yarn dev](#yarn-run-dev)
    - [yarn build](#yarn-run-build)
    - [yarn preview](#yarn-run-preview)
- [Convention](#Convention)

## Features

- 📦 **[React](https://fr.reactjs.org)** - v18+ with Hooks
- ⚡️ **[Vite](https://vitejs.dev)** - Next Generation Frontend Tooling
- 💨️ **[Yarn](https://yarnpkg.com/)** - Yarn is package manager
- 📐 **[ESLint](https://eslint.org)** - Code analyzer
- 🚀 **[Vitest](https://vitest.dev)** - A Vite native unit test framework. It's fast!
- 🛠️ **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro)** - React DOM testing
  utilities
- 🐶 **[Husky](https://typicode.github.io/husky)** - Modern native git hooks made easy

## Local installation

Clone the repository and install dependencies with [yarn](https://yarnpkg.com/)

```bash 
yarn install
```

## Sending a Pull Request

1. Clone the repository and create a new branch: `git checkout
  ``` bash
git clone https://github.com/Tracktor/treege-consumer.git
```

2. Synchronize your local master branch with the upstream one:
```bash
git checkout master
git pull upstream master
```

3. Install the dependencies with [yarn](https://yarnpkg.com/) :
```bash
yarn install
```
4. Create a new branch:
```bash
git checkout -b my-branch-name
```
5. Make changes, commit and push :
```bash
git push -u origin HEAD
```
6. Go to the [repository](https://github.com/Tracktor/design-system) and make a Pull Request.

## Available Scripts

In the project directory, you can run:

### `yarn run example`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn run build`

Builds the library for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

See the section about [deployment](https://vitejs.dev/guide/static-deploy.html) for more information.

### `yarn run preview`

Locally preview production build

## Convention

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Versioning](https://semver.org)
- [Conventional Commits](https://www.conventionalcommits.org)
