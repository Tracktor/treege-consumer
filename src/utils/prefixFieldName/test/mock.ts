type Mock = { name: string; treePath?: string; output: string };

const nameWithoutTreePath: Mock = { name: "username", output: "username" };

const prefixNameWithSimpleTreePath: Mock = { name: "username", output: "Sales.username", treePath: "/Sales" };

const prefixNameWithComplexeTreePath: Mock = {
  name: "username",
  output: "Company.structure.sales.username",
  treePath: "/Company/structure/sales",
};

export { nameWithoutTreePath, prefixNameWithSimpleTreePath, prefixNameWithComplexeTreePath };
