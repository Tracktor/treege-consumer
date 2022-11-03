import prefixFieldName from "@/utils/prefixFieldName";
import { nameWithoutTreePath, prefixNameWithComplexeTreePath, prefixNameWithSimpleTreePath } from "@/utils/prefixFieldName/test/mock";

describe("test prefix name with Tree path", () => {
  test("prefix name without tree path", () => {
    const { name, output } = nameWithoutTreePath;
    const result = prefixFieldName(name);

    expect(result).toEqual(output);
  });

  test("prefix name without tree path", () => {
    const { name, output, treePath } = prefixNameWithSimpleTreePath;
    const result = prefixFieldName(name, treePath);

    expect(result).toEqual(output);
  });

  test("prefix name without complexe tree path", () => {
    const { name, output, treePath } = prefixNameWithComplexeTreePath;
    const result = prefixFieldName(name, treePath);

    expect(result).toEqual(output);
  });
});
