import getFieldsFromTreeRest from "@/utils/getFieldsFromTreeRest";
import { restFieldsArrayWithDecision, simpleRestFieldsArray } from "@/utils/getFieldsFromTreeRest/test/mock";

describe("test getFieldsFromTreePoint tree input output fieldArray", () => {
  test("Simple rest field", () => {
    const { restFieldsArray, output } = simpleRestFieldsArray;
    const result = getFieldsFromTreeRest(restFieldsArray);

    expect(result).toEqual(output);
  });

  test("Rest field with decision", () => {
    const { restFieldsArray, output } = restFieldsArrayWithDecision;
    const result = getFieldsFromTreeRest(restFieldsArray);
    console.log(JSON.stringify(result));
    expect(result).toEqual(output);
  });
});
