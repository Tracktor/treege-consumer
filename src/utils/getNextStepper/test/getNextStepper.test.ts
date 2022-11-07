import getNextStepper from "@/utils/getNextStepper";
import {
  emptyFields,
  fieldsWithMultipleHiddenAndNextHidden,
  fieldsWithNextFieldHidden,
  fieldsWithNextFieldNoHidden,
  fieldsWithTwoNextFieldHidden,
} from "@/utils/getNextStepper/test/mock";

describe("test get next stepper", () => {
  test("Empty fields Array", () => {
    const { fields, output } = emptyFields;
    const result = getNextStepper(fields);

    expect(result).toEqual(output);
  });

  test("Fields with next text field", () => {
    const { fields, output } = fieldsWithNextFieldNoHidden;
    const result = getNextStepper(fields);

    expect(result).toEqual(output);
  });

  test("Fields with next field hidden", () => {
    const { fields, output } = fieldsWithNextFieldHidden;
    const result = getNextStepper(fields);

    expect(result).toEqual(output);
  });

  test("Fields with two next field hidden", () => {
    const { fields, output } = fieldsWithTwoNextFieldHidden;
    const result = getNextStepper(fields);

    expect(result).toEqual(output);
  });

  test("Fields with multiple hidden fields and next field hidden", () => {
    const { fields, output } = fieldsWithMultipleHiddenAndNextHidden;
    const result = getNextStepper(fields);

    expect(result).toEqual(output);
  });
});
