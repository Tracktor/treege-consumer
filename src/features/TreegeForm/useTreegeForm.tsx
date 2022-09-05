import type { SelectChangeEvent } from "design-system";
import { returnFound } from "find-and";
import { ChangeEvent, FormEvent, MouseEvent as ReactMouseEvent, useCallback, useEffect, useState } from "react";
import type { TreegeFormProps } from "@/features/TreegeForm/TreegeForm";
import type { TreeNode } from "@/types/TreeNode";

export interface useTreegeFormParams {
  dataFormatOnSubmit?: "formData" | "json";
  onSubmit?(data: { [k: string]: FormDataEntryValue } | [string, FormDataEntryValue][]): void;
  tree?: TreeNode;
  variant: TreegeFormProps["variant"];
}

const useTreegeForm = ({ dataFormatOnSubmit = "formData", tree, variant, onSubmit }: useTreegeFormParams) => {
  const [activeFieldIndex, setActiveFieldIndex] = useState<number>(0);
  const [fields, setFields] = useState<TreeNode[]>();
  const [isLastField, setIsLastField] = useState<boolean>(false);

  const resetNextFieldsFromTreeName = useCallback((name: string): void => {
    setIsLastField(true);
    setFields((prevState) => {
      const lastField = prevState && prevState[prevState.length - 1];

      if (lastField?.name === name) {
        return prevState;
      }

      const fieldsLength = prevState?.length || 0;
      const indexTarget = prevState?.findIndex((item) => item.name === name) || 0;
      const numberFieldsToRemoveFromEnd = fieldsLength - (indexTarget + 1);

      return prevState?.slice(0, Math.abs(numberFieldsToRemoveFromEnd) * -1); // Remove fields from the end
    });
  }, []);

  const setNextFieldsFromTargetName = useCallback(
    (fieldsFromPoint: TreeNode[] | undefined, name: string): void => {
      if (!fieldsFromPoint) {
        return;
      }

      setFields((prevFields) => {
        if (!prevFields) {
          return fieldsFromPoint;
        }

        const selectedFieldIndex = prevFields.findIndex((item) => item.name === name);
        const fieldsSelectedBeforeIndex = prevFields?.slice(0, selectedFieldIndex + 1);
        const nextFields = [...fieldsSelectedBeforeIndex, ...fieldsFromPoint];
        const lastField = nextFields && nextFields[nextFields.length - 1];
        const lastFieldIsLeaf = lastField?.attributes?.isLeaf || false;
        const allValueHasNoChildren = lastField?.children.every((item) => item.children.length === 0) || false;

        setActiveFieldIndex((prevFieldIndex) => prevFieldIndex + 1);

        if (variant === "standard") {
          setIsLastField(lastFieldIsLeaf || allValueHasNoChildren);
        }

        return [...fieldsSelectedBeforeIndex, ...fieldsFromPoint];
      });
    },
    [variant]
  );

  const getNextFieldsFromTreePoint = useCallback((currentTree: TreeNode, accumulator?: TreeNode[]): undefined | TreeNode[] => {
    if (!currentTree) {
      return undefined;
    }

    const children = returnFound(currentTree, { name: currentTree.children[0]?.name });

    if (currentTree.attributes?.isDecision || !children) {
      return accumulator?.length ? accumulator : [currentTree];
    }

    const nextResult = [...(accumulator || [currentTree]), children];

    return getNextFieldsFromTreePoint(children, nextResult);
  }, []);

  const handleChange = useCallback(
    (event: SelectChangeEvent | ChangeEvent<HTMLInputElement>): void => {
      const { value, name } = event.target || {};
      const { children } = returnFound(tree, { name: value }) || {};
      const isEmptyChildren = Array.isArray(children) && children.length === 0;

      if (isEmptyChildren) {
        setActiveFieldIndex((prevFieldIndex) => prevFieldIndex + 1);
        resetNextFieldsFromTreeName(name);
        return;
      }

      const nestedChildren = children?.[0];
      const fieldsFromPoint = getNextFieldsFromTreePoint(nestedChildren);

      setNextFieldsFromTargetName(fieldsFromPoint, name);
    },
    [getNextFieldsFromTreePoint, resetNextFieldsFromTreeName, setNextFieldsFromTargetName, tree]
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      if (variant === "stepper" && !isLastField) {
        setActiveFieldIndex((prevActiveFieldIndex) => {
          const nextIndex = prevActiveFieldIndex + 1;
          const hasNextField = fields?.[nextIndex] !== undefined;

          if (hasNextField) {
            return nextIndex;
          }

          setIsLastField(true);
          return nextIndex;
        });
      }

      if (!isLastField) return;

      const data = dataFormatOnSubmit === "formData" ? [...formData] : Object.fromEntries(formData);

      onSubmit?.(data);
    },
    [dataFormatOnSubmit, fields, isLastField, onSubmit, variant]
  );

  const handlePrev = useCallback((_: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLastField(false);
    setActiveFieldIndex((prevState) => prevState - 1);
  }, []);

  // Set initial field
  useEffect(() => {
    if (!tree) return;

    const initialFields = getNextFieldsFromTreePoint(tree);

    setFields(initialFields);

    // If last initial fields in standard variant has no children
    if (variant === "standard" && initialFields && initialFields[initialFields.length - 1].children.length === 0) {
      setIsLastField(true);
    }
  }, [getNextFieldsFromTreePoint, tree, variant]);

  return { activeFieldIndex, fields, handleChange, handlePrev, handleSubmit, isLastField };
};

export default useTreegeForm;
