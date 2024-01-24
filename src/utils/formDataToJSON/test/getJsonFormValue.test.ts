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
} from "@/utils/formDataToJSON/test/mock";

describe("test formDataToJSON", () => {
  test("Text", () => {
    const { fields, formValue, output } = formWithTextFields;
    const result = formDataToJSON(formValue, fields);

    expect(result).toEqual(output);
  });

  // Select & Radio have the same logic
  test("Select", () => {
    const { fields, formValue, output } = formWithSelectFields;
    const result = formDataToJSON(formValue, fields);

    expect(result).toEqual(output);
  });

  test("Radio", () => {
    const { fields, formValue, output } = formWithRadioFields;
    const result = formDataToJSON(formValue, fields);

    expect(result).toEqual(output);
  });

  // Switch & Checkbox have the same logic
  test("Switch", () => {
    const { fields, formValue, output } = formWithSwitchFields;
    const result = formDataToJSON(formValue, fields);

    expect(result).toEqual(output);
  });

  test("Checkbox", () => {
    const { fields, formValue, output } = formWithCheckboxFields;
    const result = formDataToJSON(formValue, fields);

    expect(result).toEqual(output);
  });

  // Decision
  test("Decision", () => {
    const { fields, formValue, output } = formWithDecisionFields;
    const result = formDataToJSON(formValue, fields);

    expect(result).toEqual(output);
  });

  // Tag
  test("Tag", () => {
    const { fields, formValue, output } = formWithTagFields;
    const result = formDataToJSON(formValue, fields);

    expect(result).toEqual(output);
  });

  // Text field value undefined
  test("Value undefined", () => {
    const { fields, formValue, output } = formWithTextFieldsUndefined;
    const result = formDataToJSON(formValue, fields);

    expect(result).toEqual(output);
  });

  // Select field value undefined
  test("Select undefined", () => {
    const { fields, formValue, output } = formWithSelectFieldsUndefined;
    const result = formDataToJSON(formValue, fields);

    expect(result).toEqual(output);
  });

  // Switch undefined
  test("Select undefined", () => {
    const { fields, formValue, output } = formWithSelectFieldsUndefined;
    const result = formDataToJSON(formValue, fields);

    expect(result).toEqual(output);
  });
});
