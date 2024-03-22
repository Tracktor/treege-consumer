import getValueFromTree from "@/utils/getValueFromTree/getValueFromTree";
import { mockFormValuesIsArray, mockFormValuesIsObject } from "@/utils/getValueFromTree/test/mock";

describe("test getValueFromTree", () => {
  test("test getValueFromTree", () => {
    const { fomValues, key, output } = mockFormValuesIsArray;
    const result = getValueFromTree(fomValues, key);

    expect(result).toEqual(output);
  });

  test("test getValueFromTree", () => {
    const { fomValues, key, output } = mockFormValuesIsObject;
    const result = getValueFromTree(fomValues, key);

    expect(result).toEqual(output);
  });
});
