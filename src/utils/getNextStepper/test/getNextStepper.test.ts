import getNextStepper from "@/utils/getNextStepper";
import { emptyFields, fieldsWithNextFieldNoHidden } from "@/utils/getNextStepper/test/mock";

describe("test get next stepper", () => {
  test("Empty fields Array", () => {
    const { fields, output } = emptyFields;
    const result = getNextStepper(fields);

    expect(result).toEqual(output);
  });

  test("Simple rest field", () => {
    const { fields, output } = fieldsWithNextFieldNoHidden;
    const result = getNextStepper(fields);

    expect(result).toEqual(output);
  });
});
