import getFormValueFromName from "@/utils/getFormValueFromName/getFormValueFromName";
import { mockFormValuesIsArray, mockFormValuesIsObject } from "@/utils/getFormValueFromName/test/mock";

describe("test getFormValueFromName", () => {
  test("test getFormValueFromName", () => {
    const { fomValues, key, output } = mockFormValuesIsArray;
    const result = getFormValueFromName(fomValues, key);

    expect(result).toEqual(output);
  });

  test("test getFormValueFromName", () => {
    const { fomValues, key, output } = mockFormValuesIsObject;
    const result = getFormValueFromName(fomValues, key);

    expect(result).toEqual(output);
  });
});
