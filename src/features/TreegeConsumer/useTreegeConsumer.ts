import { FormEvent, MouseEvent as ReactMouseEvent, useCallback, useEffect, useState } from "react";
import type { TreegeConsumerProps } from "@/features/TreegeConsumer";
import fieldMessageTypes from "@/features/TreegeConsumer/constants/fieldMessageTypes";
import type { ChangeEventField } from "@/features/TreegeConsumer/type";
import type { TreeNode } from "@/types/TreeNode";
import formDataToJSON, { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";
import getFieldsFromTreePoint from "@/utils/getFieldsFromTreePoint";
import getFieldsFromTreeRest from "@/utils/getFieldsFromTreeRest";
import getNextStepper from "@/utils/getNextStepper";

export interface useTreegeConsumerParams {
  dataFormatOnSubmit?: "formData" | "json";
  onSubmit?(data: JsonFormValue[] | [string, FormDataEntryValue][]): void;
  tree?: TreeNode;
  variant: TreegeConsumerProps["variant"];
}

const useTreegeConsumer = ({ dataFormatOnSubmit = "json", tree, variant, onSubmit }: useTreegeConsumerParams) => {
  const [activeFieldIndex, setActiveFieldIndex] = useState<number>(0);
  const [fields, setFields] = useState<TreeNode[]>([]);
  const [isLastField, setIsLastField] = useState<boolean>(false);
  const [firstFieldIndex, setFirstFieldIndex] = useState<number>(0);
  const isStepper = variant === "stepper";
  const isStandard = variant === "standard";

  const handleChange = useCallback(
    (dataAttribute: ChangeEventField): void => {
      const { value, name, hasMessage, type, isDecision, children } = dataAttribute;
      const isSelectField = fieldMessageTypes.includes(type || "");
      const isAutoStep = isSelectField && !hasMessage;

      if (isDecision) {
        setFields((prevState) => {
          const decisionSelected = children?.find((child) => child.name === value);
          const indexDecisionField = prevState?.findIndex((item) => item.name === name);
          const treeRest = prevState?.[indexDecisionField]?.childrenTreeRest;
          const childrenTreeRestDecision = getFieldsFromTreeRest(treeRest);
          const decisionChildrenSelected = getFieldsFromTreePoint({
            currentTree: decisionSelected?.children[0] || null,
            treePath: prevState?.[indexDecisionField]?.treePath,
          });
          const noChildren = !decisionChildrenSelected?.length && !childrenTreeRestDecision?.length;

          // Remove all field after decision
          const initialField = prevState.slice(0, indexDecisionField + 1);

          // if the decision & treeDecision don't have children
          if (noChildren) {
            setIsLastField(true);

            if (isStepper && isAutoStep) {
              // AUTO NEXT STEP
              setActiveFieldIndex((prevFieldIndex) => prevFieldIndex + 1);
            }
            // return Initial Field when decision & treeDecision don't have Children
            return initialField;
          }

          const newFields = [...initialField, ...decisionChildrenSelected, ...childrenTreeRestDecision];

          const lastField = newFields.at(-1);
          const lastFieldIsLeaf = !!lastField?.attributes?.isLeaf && !lastField.treePath;

          if (isStandard) {
            setIsLastField(lastFieldIsLeaf);
          }

          if (isStepper && isAutoStep) {
            // AUTO NEXT STEP
            setActiveFieldIndex((prevFieldIndex) => {
              const restNewFields = newFields.slice(prevFieldIndex + 1);
              const stepper = getNextStepper(restNewFields) + 1;

              return prevFieldIndex + stepper;
            });
          }

          return newFields;
        });
      }

      // AUTO NEXT STEP
      if (isStepper && !isDecision) {
        if (isAutoStep) {
          setActiveFieldIndex((prevFieldIndex) => prevFieldIndex + 1);
        }
      }
    },
    [isStepper, isStandard],
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      if (isStepper && !isLastField) {
        setActiveFieldIndex((prevActiveFieldIndex) => {
          const restNewFields = fields.slice(prevActiveFieldIndex + 1);
          const stepper = getNextStepper(restNewFields) + 1;
          const nextIndex = prevActiveFieldIndex + stepper;
          const hasNextField = fields?.[nextIndex] !== undefined;

          if (hasNextField) {
            return nextIndex;
          }

          setIsLastField(true);
          return nextIndex;
        });
      }

      if (!isLastField) return;

      const data = dataFormatOnSubmit === "formData" ? [...formData] : formDataToJSON([...formData], fields);

      onSubmit?.(data);
    },
    [dataFormatOnSubmit, fields, isLastField, isStepper, onSubmit],
  );

  const handlePrev = useCallback(
    (_: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
      setIsLastField(false);

      setActiveFieldIndex((prevState) => {
        // Revert fields array to DECREMENT stepper !!
        const restNewFields = fields.slice(0, prevState).reverse();
        const stepper = getNextStepper(restNewFields) + 1;
        return prevState - stepper;
      });
    },
    [fields],
  );

  // Set initial field
  useEffect(() => {
    if (!tree) return;

    const initialFields = getFieldsFromTreePoint({ currentTree: tree });
    setFields(initialFields);

    // Check if the first fields is Hidden
    const stepper = getNextStepper(initialFields);
    if (isStepper && stepper) {
      setActiveFieldIndex(stepper);
      setFirstFieldIndex(stepper);
    }

    // If last initial fields in standard variant has no children
    if (isStandard && initialFields && initialFields[initialFields.length - 1].children.length === 0) {
      setIsLastField(true);
    }
  }, [isStandard, isStepper, tree, variant]);

  return { activeFieldIndex, fields, firstFieldIndex, handleChange, handlePrev, handleSubmit, isLastField };
};

export default useTreegeConsumer;
