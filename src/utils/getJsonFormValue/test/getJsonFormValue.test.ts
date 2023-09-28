import getJsonFormValue from "@/utils/getJsonFormValue";
import {
  formWithCheckboxFields,
  formWithDecisionFields,
  formWithRadioFields,
  formWithSelectFields,
  formWithSwitchFields,
  formWithTextFields,
} from "@/utils/getJsonFormValue/test/mock";

describe("test getJsonFormValue", () => {
  test("Text", () => {
    const { fields, formValue, output } = formWithTextFields;
    const result = getJsonFormValue(formValue, fields);

    expect(result).toEqual(output);
  });

  // Select & Radio have the same logic
  test("Select", () => {
    const { fields, formValue, output } = formWithSelectFields;
    const result = getJsonFormValue(formValue, fields);

    expect(result).toEqual(output);
  });

  test("Radio", () => {
    const { fields, formValue, output } = formWithRadioFields;
    const result = getJsonFormValue(formValue, fields);

    expect(result).toEqual(output);
  });

  // Switch & Checkbox have the same logic
  test("Switch", () => {
    const { fields, formValue, output } = formWithSwitchFields;
    const result = getJsonFormValue(formValue, fields);

    console.log(result);

    expect(result).toEqual(output);
  });

  test("Checkbox", () => {
    const { fields, formValue, output } = formWithCheckboxFields;
    const result = getJsonFormValue(formValue, fields);

    expect(result).toEqual(output);
  });

  // Decision
  test("Decision", () => {
    const { fields, formValue, output } = formWithDecisionFields;
    const result = getJsonFormValue(formValue, fields);

    expect(result).toEqual(output);
  });
});
