# Treege consumer

[![npm version](https://badge.fury.io/js/treege-consumer.svg)](https://badge.fury.io/js/treege-consumer)

**A React library to consume easily form generated from [Treege](https://github.com/Tracktor/treege)**

- [Installation](#Installation)
- [Usage](#Usage)
  - [Provide tree data](#Provide-tree-data)
  - [Provide options](#Provide-options)
- [Components](#Components)
  - [TreegeConsumer](#TreegeConsumer)
  - [TreegeConsumerResponse](#TreegeConsumerResponse)

## Installation

**npm:**
```bash
npm install treege-consumer
```
**bun:**
```bash
bun add treege-consumer
```
**yarn**:
```bash
yarn add treege-consumer
```
**pnpm**:
```bash
pnpm add treege-consumer
```

## Usage

### Provide tree data

Give `tree data` to `<TreegeForm>` component.  
Data can be fetched from your API.

```typescript jsx
import tree from "./tree.json";
import { TreegeConsumer } from "treege-consumer ";

const App = () => {
  const handleSubmit = (data: [string, FormDataEntryValue][]) => {
    console.log(data);
  };

  return <TreegeConsumer tree={tree} onSubmit={handleSubmit}/>;
};

export default App;
```

### Provide options

Some options can be provided. For example if you want to use place predictions from `address` field.

```typescript jsx
import tree from "./tree.json";
import { TreegeConsumer } from "treege-consumer ";

const App = () => {
  const handleSubmit = (data: [string, FormDataEntryValue][]) => {
    console.log(data);
  };

  return (
    <TreegeConsumer
      tree={tree}
      variant={variant}
      onSubmit={handleSubmit}
      options={{googleApiKey: "YOUR_API_KEY"}}/>
  );
};

export default App;
```

## Components

### TreegeConsumer

Render a form based
on [Treege](https://github.com/Tracktor/treege) data

| Props         | Type                                                                                                     | Default   | Required | Detail                          |
|---------------|----------------------------------------------------------------------------------------------------------|-----------|----------|---------------------------------|
| tree          | TreeNode<br/>  undefined                                                                                 | undefined | false    | Treege data                     |
| variant       | "standard"<br/>  "stepper"                                                                               | "stepper" | false    | The variant to use              |
| theme         | "light"<br/>  "dark" <br/> ThemeOptions                                                                  | "light"   | false    | Theme color mode                |
| onSubmit      | `data: JsonFormValue[];`<br/>`formData: [string, FormDataEntryValue][];`<br/>`fieldValues: FieldValues;` | undefined | false    | Callback fired form is validate |
| options       | "countryAutocompleteService"<br/>"googleApiKey" <br/>"prefixResponseImageUriAutocomplete"                | undefined | false    | Consumer options                |
| style         | CSSProperties                                                                                            | undefined | false    | Custom form style               |
| initialValues | { [key: string]: unknown; }                                                                              | undefined | false    | Set initial value to form       |
| ignoreFields  | string[]                                                                                                 | undefined | false    | Ignored fiels to render         |

#### Options

| Options                            | Type   | Default | Required | Detail                                                                                                                                                                        |
|------------------------------------|--------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| countryAutocompleteService         | string | "fr"    | false    | Define country restrictions for autocomplete                                                                                                                                  |
| googleApiKey                       | string |         | false    | If you want use some google service like <strong>autocomplete address</strong>, then you want provide [Google Api Key](https://cloud.google.com/docs/authentication/api-keys) |
| prefixResponseImageUriAutocomplete | string |         | false    | Prefix response image uri for autocomplete image                                                                                                                              |


### TreegeConsumerResponse

Render values from form based on [Treege](https://github.com/Tracktor/treege)

| Props        | Type                                                                                                                                        | Default   | Required | Detail                  |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------|-----------|----------|-------------------------|
| values       | {<br/>label: string;<br/>name: string;<br/>type: string;<br/>tag?: string;<br/>value: string; &#124; { label: string; value: string }<br/>} | undefined | true     | Object of data          |
| renderInputs | function(input: JsonFormValue): ReactElement \| undefined                                                                                   | undefined | false    | Custom inputs rendering |
| ignoreFields | string[]                                                                                                                                    | undefined | false    | Ignored fiels to render |
