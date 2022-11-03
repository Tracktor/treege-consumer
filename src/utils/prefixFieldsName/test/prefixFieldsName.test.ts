import { prefixFieldsName } from "@/utils";
import { fieldsArrayUndefined, fieldsNameWithoutTreePath, fieldsNameWithTreePath } from "@/utils/prefixFieldsName/test/mock";

describe("prefix children name with Tree path", () => {
  test("Field Array undefined return []", () => {
    const { fieldsArray, output } = fieldsArrayUndefined;
    const result = prefixFieldsName(fieldsArray);

    expect(result).toEqual(output);
  });

  test("prefix children name without tree path", () => {
    const { fieldsArray, output } = fieldsNameWithoutTreePath;
    const result = prefixFieldsName(fieldsArray);

    expect(result).toEqual(output);
  });

  test("prefix children name with tree path", () => {
    const { fieldsArray, output, treePath } = fieldsNameWithTreePath;
    const result = prefixFieldsName(fieldsArray, treePath);

    expect(result).toEqual(output);
  });
});
