# Treege consumer

**A React library to consume easily form generated from [Treege](https://github.com/Tracktor/treege)**

- [Installation](#Installation)
- [Usage](#Usage)
    - [Provide tree data](#Provide-tree-data)
    - [Provide options](#Provide-options)
- [Components](#Components)
    - [TreegeForm](#TreegeForm)
- [Providers](#Providers)
    - [TreegeProvider](#TreegeProvider)
- [Features](#Features)
- [Local installation](#local-installation)
- [Available Scripts](#Available-Scripts)
    - [yarn dev](#yarn-dev)
    - [yarn build](#yarn-build)
    - [yarn preview](#yarn-preview)
- [Convention](#Convention)

## Features

- 📦 **[React](https://fr.reactjs.org)** - v18+ with Hooks
- ⚡️ **[Vite](https://vitejs.dev)** - Next Generation Frontend Tooling
- 📐 **[ESLint](https://eslint.org)** - Code analyzer
- 🚀 **[Vitest](https://vitest.dev)** - A Vite native unit test framework. It's fast!
- 🛠️ **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro)** - React DOM testing
  utilities
- 🐶 **[Husky](https://typicode.github.io/husky)** - Modern native git hooks made easy

## Installation

```console
yarn add git+https://github.com/Tracktor/treege-consumer
```

Specific version can be installed

```console
yarn add git+https://github.com/Tracktor/treege-consumer#1.0.0
```

## Usage

### Provide tree data

Give `tree data` to `<TreegeForm>` component.  
Data can be fetched from your API.

```typescript jsx
import tree from "./tree.json";
import { TreegeForm } from "treege-consumer ";

const App = () => {
  const handleSubmit = (data: [string, FormDataEntryValue][]) => {
    console.log(data);
  };

  return <TreegeForm tree={tree} onSubmit={handleSubmit}/>;
};

export default App;
```

### Provide options

Some options can be provided. For example if you want to use place predictions from `address` field.

```typescript jsx
import tree from "./tree.json";
import { TreegeForm, TreegeProvider } from "treege-consumer ";

const App = () => {
  const handleSubmit = (data: [string, FormDataEntryValue][]) => {
    console.log(data);
  };

  return (
    <TreegeProvider options={{googleApiKey: "YOUR_GOOGLE_API_KEY"}}>
      <TreegeForm tree={tree} variant={variant} onSubmit={handleSubmit}/>
    </TreegeProvider>
  );
};

export default App;
```

## Components

### TreegeForm

Render a form based
on [Treege](https://github.com/Tracktor/treege) data

| Props              | Type                       | Default    | Required | Detail                                    |
|--------------------|----------------------------|------------|----------|-------------------------------------------|
| dataFormatOnSubmit | "formData"<br/>  "json"    | "formData" | false    | Data format returned by onSubmit callback |
| tree               | TreeNode<br/>  undefined   | undefined  | false    | Treege data                               |
| variant            | "standard"<br/>  "stepper" | "stepper"  | false    | The variant to use                        |
| onSubmit           | "formData"<br/>  "json"    | "formData" | false    | Callback fired form is validate           |

## Providers

### TreegeProvider

Provide options

| Options                    | Type   | Default | Required | Detail                                                                                                                                                                        |
|----------------------------|--------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| countryAutocompleteService | string | "fr"    | false    | Define country restrictions for autocomplete                                                                                                                                  |
| googleApiKey               | string |         | false    | If you want use some google service like <strong>autocomplete address</strong>, then you want provide [Google Api Key](https://cloud.google.com/docs/authentication/api-keys) |

## Local installation

Clone the repository and install dependencies

```console 
yarn install
```

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the library for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

See the section about [deployment](https://vitejs.dev/guide/static-deploy.html) for more information.

### `yarn preview`

Locally preview production build

## Convention

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Versioning](https://semver.org)
- [Conventional Commits](https://www.conventionalcommits.org)
