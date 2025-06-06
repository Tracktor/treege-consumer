# Treege consumer

[![npm version](https://badge.fury.io/js/treege-consumer.svg)](https://badge.fury.io/js/treege-consumer)

**A React library to consume easily form generated from [Treege](https://github.com/Tracktor/treege)**

- [Installation](#Installation)
- [Usage](#Usage)
  - [Provide tree data](#Provide-tree-data)
  - [Provide options](#Provide-options)
- [Components](#Components)
  - [TreegeConsumer](#TreegeConsumer)
  - [TreegeViewer](#TreegeViewer)

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
      onSubmit={handleSubmit}
      options={{ googleApiKey: "YOUR_API_KEY" }}/>
  );
};

export default App;
```

## Components

### TreegeConsumer

Render a form based
on [Treege](https://github.com/Tracktor/treege) data

| Props                | Type                                                                                                                   | Default   | Required | Detail                                 |
|----------------------|------------------------------------------------------------------------------------------------------------------------|-----------|----------|----------------------------------------|
| tree                 | [TreeNode](src/types/TreeNode.ts)                                                                                      | undefined | false    | Treege data                            |
| theme                | "light"<br/>  "dark" <br/> ThemeOptions                                                                                | "light"   | false    | Theme color mode                       |
| onSubmit             | `data: JsonFormValue[];`<br/>`formData: [string, FormDataEntryValue][];`<br/>`fieldValues: FieldValues;`               | undefined | false    | Callback fired form is validate        |
| options              | "countryAutocompleteService"<br/>"googleApiKey" <br/>"prefixResponseImageUriAutocomplete"                              | undefined | false    | Consumer options                       |
| style                | CSSProperties                                                                                                          | undefined | false    | Custom form style                      |
| initialValues        | { [key: string]: unknown; }                                                                                            | undefined | false    | Set initial value to form              |
| ignoreFields         | string[]                                                                                                               | undefined | false    | Ignored fields to render               |
| debug                | boolean                                                                                                                | undefined | false    | Debug in console on form submit        |
| readOnly             | boolean                                                                                                                | undefined | false    | Read only mode                         |
| disabledSubmitButton | boolean                                                                                                                | undefined | false    | Disable submit button                  |
| isSubmitting         | boolean                                                                                                                | undefined | false    | Disable submit button while submitting |
| renderFormValidation | function({ disabled, isLoading }: [RenderFormValidationParams](src/types/RenderFormValidationParams.ts)): ReactElement | undefined | false    | Custom form validation renderer        |

#### Options

| Options                            | Type               | Default | Required | Detail                                                                                                                                                                        |
|------------------------------------|--------------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| countryAutocompleteService         | string or string[] |         | false    | Define country restrictions for autocomplete                                                                                                                                  |
| googleApiKey                       | string             |         | false    | If you want use some google service like <strong>autocomplete address</strong>, then you want provide [Google Api Key](https://cloud.google.com/docs/authentication/api-keys) |
| prefixResponseImageUriAutocomplete | string             |         | false    | Prefix response image uri for autocomplete image                                                                                                                              |
| licenseMuiX                        | string             |         | false    | License MUI X to enable pro and premium feature                                                                                                                               |
| adapterLocale                      | string             |         | false    | Adapter local for locale format                                                                                                                                               |
| disablePastDateRangePicker         | boolean            |         | false    | Disable past for date range picker                                                                                                                                            |
| disablePastDatePicker              | boolean            |         | false    | Disable past for date picker                                                                                                                                                  |
| noValidate                         | boolean            |         | false    | Indicate that the form is not to be validated on submit                                                                                                                       |


### TreegeViewer

Display values from form based on [Treege](https://github.com/Tracktor/treege)

| Props                     | Type                                                                                                                                        | Default   | Required | Detail                                                                 |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|-----------|----------|------------------------------------------------------------------------|
| values                    | {<br/>label: string;<br/>name: string;<br/>type: string;<br/>tag?: string;<br/>value: string; &#124; { label: string; value: string }<br/>} | undefined | true     | Object of data                                                         |
| renderFields              | function(input: JsonFormValue): ReactElement \| undefined                                                                                   | undefined | false    | Custom fields rendering                                                |
| excludedFields            | string[]                                                                                                                                    | undefined | false    | Excluded fields                                                        |
| collapse                  | boolean                                                                                                                                     | undefined | false    | Enable collapse or note                                                |
| collapseVisibleItemNumber | number                                                                                                                                      | 4         | false    | Number of visible item before collapse. Works only if collapse is true |
| collapseStyle             | CSSProperties                                                                                                                               | undefined | false    | Custom collapse style                                                  |
| collapseSx                | SxProps                                                                                                                                     | undefined | false    | Custom collapse sx                                                     |
| style                     | CSSProperties                                                                                                                               | undefined | false    | Container style                                                        |
| sx                        | SxProps                                                                                                                                     | undefined | false    | Container sx                                                           |

## Provider

### Provide options

You can provide options to the consumer by using the `TreegeConsumerProvider` provider.

```typescript jsx
import tree from "./tree.json";
import { TreegeConsumer, TreegeConsumerProvider } from "treege-consumer ";

const App = () => {
  const handleSubmit = (data: [string, FormDataEntryValue][]) => {
    console.log(data);
  };

  return (
    <TreegeConsumerProvider licenseMuiX={"YOUR_LICENCE"}>
      <TreegeConsumer
        tree={tree}
        onSubmit={handleSubmit}
        options={{googleApiKey: "YOUR_API_KEY"}}/>
    </TreegeConsumerProvider>
  );
};

export default App;
```
## Type Definitions

This library uses type definitions from [@tracktor/types-treege](https://www.npmjs.com/package/@tracktor/types-treege)
