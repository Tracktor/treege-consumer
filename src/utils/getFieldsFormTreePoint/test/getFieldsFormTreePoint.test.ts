import { getFieldsFormTreePoint } from "@/utils";
import {
  complexeTreeWithDecision,
  simpleTreeMock,
  treeWithChildrenAndDecisionInTree,
  treeWithDecisionAndChildrens,
  treeWithDecisionAndTree,
  treeWithManyTreeChildren,
  treeWithManyTreeChildrenWithoutOne,
  treeWithTreeAndChildrenInMainTreeMock,
  treeWithTreeMock,
} from "@/utils/getFieldsFormTreePoint/test/mock";

describe("getFieldsFormTreePoint tree input output fieldArray", () => {
  test("Simple Tree ", () => {
    const { tree, output } = simpleTreeMock;
    const result = getFieldsFormTreePoint({ currentTree: tree });

    expect(result).toEqual(output);
  });

  test("Tree With Tree", () => {
    const { tree, output } = treeWithTreeMock;
    const result = getFieldsFormTreePoint({ currentTree: tree });

    expect(result).toEqual(output);
  });

  test("Tree With Tree and children in main tree", () => {
    const { tree, output } = treeWithTreeAndChildrenInMainTreeMock;
    const result = getFieldsFormTreePoint({ currentTree: tree });

    expect(result).toEqual(output);
  });

  test("Tree with main tree children", () => {
    const { tree, output } = treeWithManyTreeChildren;
    const result = getFieldsFormTreePoint({ currentTree: tree });

    expect(result).toEqual(output);
  });

  test("Tree with many Tree children without one", () => {
    const { tree, output } = treeWithManyTreeChildrenWithoutOne;
    const result = getFieldsFormTreePoint({ currentTree: tree });

    expect(result).toEqual(output);
  });

  // Test decision
  test("Tree with decision and children", () => {
    const { tree, output } = treeWithDecisionAndChildrens;
    const result = getFieldsFormTreePoint({ currentTree: tree });

    expect(result).toEqual(output);
  });

  test("Tree with decision and tree", () => {
    const { tree, output } = treeWithDecisionAndTree;
    const result = getFieldsFormTreePoint({ currentTree: tree });

    expect(result).toEqual(output);
  });

  test("Tree with children and decision in tree", () => {
    const { tree, output } = treeWithChildrenAndDecisionInTree;
    const result = getFieldsFormTreePoint({ currentTree: tree });

    expect(result).toEqual(output);
  });

  test("Complexe Tree with decision", () => {
    const { tree, output } = complexeTreeWithDecision;
    const result = getFieldsFormTreePoint({ currentTree: tree });

    expect(result).toEqual(output);
  });
});
