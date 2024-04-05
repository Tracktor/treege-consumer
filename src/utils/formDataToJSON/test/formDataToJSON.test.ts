import formDataToJSON from "@/utils/formDataToJSON";
import {
  formWithTextFields,
  formWithDecision,
  formWithSelectFields,
  formWithRadioFields,
  formWithSwitchFields,
  formWithCheckboxFields,
  formWithDecisionFields,
  formWithTagFields,
  formWithTextFieldsUndefined,
  formWithDateRangeFields,
  formWithSelectFieldsUndefined,
} from "@/utils/formDataToJSON/test/mock";

describe("test formDataToJSON", () => {
  test("Text", () => {
    const { fields, fieldValues, output } = formWithTextFields;
    const result = formDataToJSON(fieldValues, fields);

    expect(result).toEqual(output);
  });

  // Select & Radio have the same logic
  test("Select", () => {
    const { fields, fieldValues, output } = formWithSelectFields;
    const result = formDataToJSON(fieldValues, fields);

    expect(result).toEqual(output);
  });

  test("Radio", () => {
    const { fields, fieldValues, output } = formWithRadioFields;
    const result = formDataToJSON(fieldValues, fields);

    expect(result).toEqual(output);
  });

  // Switch & Checkbox have the same logic
  test("Switch", () => {
    const { fields, fieldValues, output } = formWithSwitchFields;
    const result = formDataToJSON(fieldValues, fields);

    expect(result).toEqual(output);
  });

  test("Checkbox", () => {
    const { fields, fieldValues, output } = formWithCheckboxFields;
    const result = formDataToJSON(fieldValues, fields);

    expect(result).toEqual(output);
  });

  // Decision
  test("Decision", () => {
    const { fields, fieldValues, output } = formWithDecisionFields;
    const result = formDataToJSON(fieldValues, fields);

    expect(result).toEqual(output);
  });

  // Tag
  test("Tag", () => {
    const { fields, fieldValues, output } = formWithTagFields;
    const result = formDataToJSON(fieldValues, fields);

    expect(result).toEqual(output);
  });

  // Text field value undefined
  test("Value undefined", () => {
    const { fields, fieldValues, output } = formWithTextFieldsUndefined;
    const result = formDataToJSON(fieldValues, fields);

    expect(result).toEqual(output);
  });

  // Select field value undefined
  test("Select undefined", () => {
    const { fields, fieldValues, output } = formWithSelectFieldsUndefined;
    const result = formDataToJSON(fieldValues, fields);

    expect(result).toEqual(output);
  });

  // Switch undefined
  test("Select undefined", () => {
    const { fields, fieldValues, output } = formWithSelectFieldsUndefined;
    const result = formDataToJSON(fieldValues, fields);

    expect(result).toEqual(output);
  });

  test("Date Range", () => {
    const { fields, fieldValues, output } = formWithDateRangeFields;
    const result = formDataToJSON(fieldValues, fields);

    expect(result).toEqual(output);
  });

  test("decision", () => {
    const { fields, fieldValues, output } = formWithDecision;
    const result = formDataToJSON(fieldValues, fields);

    expect(result).toEqual(output);
  });
});
