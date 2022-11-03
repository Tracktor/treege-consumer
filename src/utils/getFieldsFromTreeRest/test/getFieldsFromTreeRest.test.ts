import { getFieldsFromTreeRest } from "@/utils";
import { restFieldsArrayWithDecision, simpleRestFieldsArray } from "@/utils/getFieldsFromTreeRest/test/mock";

describe("getFieldsFormTreePoint tree input output fieldArray", () => {
  test("Simple rest field", () => {
    const { restFieldsArray, output } = simpleRestFieldsArray;
    const result = getFieldsFromTreeRest(restFieldsArray);

    expect(result).toEqual(output);
  });

  test("Rest field with decision", () => {
    const { restFieldsArray, output } = restFieldsArrayWithDecision;
    const result = getFieldsFromTreeRest(restFieldsArray);

    expect(result).toEqual(output);
  });
});
