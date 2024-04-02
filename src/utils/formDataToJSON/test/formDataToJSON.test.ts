import formDataToJSON from "@/utils/formDataToJSON";
import {
  formWithCheckboxFields,
  formWithDecisionFields,
  formWithRadioFields,
  formWithSelectFields,
  formWithSelectFieldsUndefined,
  formWithSwitchFields,
  formWithTagFields,
  formWithTextFields,
  formWithTextFieldsUndefined,
  formWithDateRangeFields,
} from "@/utils/formDataToJSON/test/mock";

const TreeDec = {
  fields: [
    {
      attributes: {
        depth: 0,
        isDecision: true,
        isLeaf: false,
        isRoot: true,
        label: "decision",
        type: "select",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            label: "1",
            value: "1",
          },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: false,
                label: "text1",
                type: "text",
              },
              children: [
                {
                  attributes: {
                    depth: 3,
                    isLeaf: true,
                    label: "f",
                    type: "text",
                  },
                  children: [],
                  name: "f",
                },
              ],
              name: "text1",
            },
          ],
          name: "decision:1",
        },
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            label: "2",
            value: "2",
          },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: false,
                label: "text2",
                type: "text",
              },
              children: [
                {
                  attributes: {
                    depth: 3,
                    isLeaf: true,
                    label: "f",
                    type: "text",
                  },
                  children: [],
                  name: "ff",
                },
              ],
              name: "text2",
            },
          ],
          name: "decision:2",
        },
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            label: "3",
            value: "3",
          },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: false,
                label: "text3",
                type: "text",
              },
              children: [
                {
                  attributes: {
                    depth: 3,
                    isLeaf: true,
                    label: "f",
                    type: "text",
                  },
                  children: [],
                  name: "fff",
                },
              ],
              name: "text3",
            },
          ],
          name: "decision:3",
        },
      ],
      name: "decision",
    },
    {
      attributes: {
        depth: 2,
        isLeaf: false,
        label: "text1",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 3,
            isLeaf: true,
            label: "f",
            type: "text",
          },
          children: [],
          name: "f",
        },
      ],
      name: "text1",
    },
    {
      attributes: {
        depth: 3,
        isLeaf: true,
        label: "f",
        type: "text",
      },
      children: [],
      name: "f",
    },
  ],
  formValue: {
    decision: "1",
    f: "1",
    text1: "1",
  },
  output: [
    {
      label: "decision",
      name: "decision",
      type: "select",
      value: {
        label: "1",
        value: "1",
      },
    },
    {
      label: "f",
      name: "f",
      type: "text",
      value: "1",
    },
    {
      label: "text1",
      name: "text1",
      type: "text",
      value: "1",
    },
  ],
};

describe("test formDataToJSON", () => {
  test("decision", () => {
    const { fields, formValue, output } = TreeDec;
    const result = formDataToJSON(formValue, fields);
    console.log(result);
    expect(result).toEqual(output);
  });
  // test("Text", () => {
  //   const { fields, formValue, output } = formWithTextFields;
  //   const result = formDataToJSON(formValue, fields);
  //
  //   expect(result).toEqual(output);
  // });
  //
  // // Select & Radio have the same logic
  // test("Select", () => {
  //   const { fields, formValue, output } = formWithSelectFields;
  //   const result = formDataToJSON(formValue, fields);
  //
  //   expect(result).toEqual(output);
  // });
  //
  // test("Radio", () => {
  //   const { fields, formValue, output } = formWithRadioFields;
  //   const result = formDataToJSON(formValue, fields);
  //
  //   expect(result).toEqual(output);
  // });
  //
  // // Switch & Checkbox have the same logic
  // test("Switch", () => {
  //   const { fields, formValue, output } = formWithSwitchFields;
  //   const result = formDataToJSON(formValue, fields);
  //
  //   expect(result).toEqual(output);
  // });
  //
  // test("Checkbox", () => {
  //   const { fields, formValue, output } = formWithCheckboxFields;
  //   const result = formDataToJSON(formValue, fields);
  //
  //   expect(result).toEqual(output);
  // });
  //
  // // Decision
  // test("Decision", () => {
  //   const { fields, formValue, output } = formWithDecisionFields;
  //   const result = formDataToJSON(formValue, fields);
  //
  //   expect(result).toEqual(output);
  // });
  //
  // // Tag
  // test("Tag", () => {
  //   const { fields, formValue, output } = formWithTagFields;
  //   const result = formDataToJSON(formValue, fields);
  //
  //   expect(result).toEqual(output);
  // });
  //
  // // Text field value undefined
  // test("Value undefined", () => {
  //   const { fields, formValue, output } = formWithTextFieldsUndefined;
  //   const result = formDataToJSON(formValue, fields);
  //
  //   expect(result).toEqual(output);
  // });
  //
  // // Select field value undefined
  // test("Select undefined", () => {
  //   const { fields, formValue, output } = formWithSelectFieldsUndefined;
  //   const result = formDataToJSON(formValue, fields);
  //
  //   expect(result).toEqual(output);
  // });
  //
  // // Switch undefined
  // test("Select undefined", () => {
  //   const { fields, formValue, output } = formWithSelectFieldsUndefined;
  //   const result = formDataToJSON(formValue, fields);
  //
  //   expect(result).toEqual(output);
  // });
  //
  // test("Date Range", () => {
  //   const { fields, formValue, output } = formWithDateRangeFields;
  //   const result = formDataToJSON(formValue, fields);
  //
  //   expect(result).toEqual(output);
  // });
});
