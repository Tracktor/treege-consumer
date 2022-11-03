import prefixFieldsArrayName from "@/utils/prefixFieldsArrayName";
import { fieldsArrayUndefined, fieldsNameWithoutTreePath, fieldsNameWithTreePath } from "@/utils/prefixFieldsArrayName/test/mock";

describe("test Prefix Fields name with Tree path", () => {
  test("Field Array undefined return []", () => {
    const { fieldsArray, output } = fieldsArrayUndefined;
    const result = prefixFieldsArrayName(fieldsArray);

    expect(result).toEqual(output);
  });

  test("prefix children name without tree path", () => {
    const { fieldsArray, output } = fieldsNameWithoutTreePath;
    const result = prefixFieldsArrayName(fieldsArray);

    expect(result).toEqual(output);
  });

  test("prefix children name with tree path", () => {
    const { fieldsArray, output, treePath } = fieldsNameWithTreePath;
    const result = prefixFieldsArrayName(fieldsArray, treePath);

    expect(result).toEqual(output);
  });
});
