import { prefixName } from "@/utils";
import { nameWithoutTreePath, prefixNameWithComplexeTreePath, prefixNameWithSimpleTreePath } from "@/utils/prefixName/test/mock";

describe("prefix name with Tree path", () => {
  test("prefix name without tree path", () => {
    const { name, output } = nameWithoutTreePath;
    const result = prefixName(name);

    expect(result).toEqual(output);
  });

  test("prefix name without tree path", () => {
    const { name, output, treePath } = prefixNameWithSimpleTreePath;
    const result = prefixName(name, treePath);

    expect(result).toEqual(output);
  });

  test("prefix name without complexe tree path", () => {
    const { name, output, treePath } = prefixNameWithComplexeTreePath;
    const result = prefixName(name, treePath);

    expect(result).toEqual(output);
  });
});
