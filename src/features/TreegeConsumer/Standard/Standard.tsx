import { Box, Stack } from "@tracktor/design-system";
import type { TreeNode } from "@tracktor/types-treege";
import { type CSSProperties, FormEvent, ReactNode, useRef } from "react";
import FormSkeleton from "@/components/Feedback/FormSkeleton/FormSkeleton";
import FormValidation, { RenderFormValidationParams } from "@/components/Form/FormValidation";
import FieldFactory from "@/components/Inputs/FieldFactory";
import { TreegeConsumerProps } from "@/features/TreegeConsumer";
import ChangeEventField from "@/types/ChangeEventField";
import { FieldValues } from "@/types/FieldValues";
import { Headers } from "@/types/Headers";

interface StandardProps {
  fields?: TreeNode[];
  isLastField: boolean;
  readOnly?: boolean;
  headers?: Headers;
  fieldValues?: FieldValues;
  isSubmitting?: boolean;
  style?: CSSProperties;
  formCanBeSubmit: boolean;
  ignoreFields?: string[];
  options?: TreegeConsumerProps["options"];
  handleChangeFormValue?(dataAttribute: ChangeEventField): void;
  onSubmit?(event: FormEvent<HTMLFormElement>): void;
  renderFormValidation?(params: RenderFormValidationParams): ReactNode;
}

const Standard = ({
  fields,
  handleChangeFormValue,
  onSubmit,
  isLastField,
  readOnly,
  headers,
  fieldValues,
  isSubmitting,
  style,
  formCanBeSubmit,
  ignoreFields,
  options,
  renderFormValidation,
}: StandardProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Get the current form element from the event
    const form = event.currentTarget;

    // Check if the form is valid
    if (!form.checkValidity() && !options?.noValidate) {
      // If the form is not valid, we need to find the first invalid field

      // Get all form elements (this is more React-friendly than querySelectorAll)
      // form.elements contains all form controls in DOM order
      const formElements = form.elements;

      // Find the first invalid element
      // We convert to array to use the find method
      const invalidElement = Array.from(formElements).find(
        (element) =>
          // We check only elements that have a checkValidity method
          // (inputs, selects, textareas)
          element instanceof HTMLElement && "checkValidity" in element && !(element as HTMLInputElement).checkValidity(),
      ) as HTMLElement;

      // If we found an invalid element, focus it
      if (invalidElement) {
        invalidElement.focus();
      }

      // Display error messages on all fields
      // Note: reportValidity() doesn't consistently focus the first field
      // across all browsers, that's why we manually focus it above
      form.reportValidity();

      // Stop form submission
      return;
    }

    // If we reach here, the form is valid
    // Call the original submit handler
    onSubmit?.(event);
  };

  return (
    <Box noValidate onSubmit={handleSubmit} component="form" paddingX={15} paddingY={5} style={style} ref={formRef}>
      <Stack spacing={4} direction="column" sx={{ "div:first-of-type hr": { display: "none" } }}>
        {fields ? (
          fields.map((field) => (
            <FieldFactory
              key={field.uuid}
              data={field}
              handleChangeFormValue={handleChangeFormValue}
              readOnly={readOnly}
              headers={headers}
              fieldValues={fieldValues}
              isSubmitting={isSubmitting}
              ignoreFields={ignoreFields}
              options={options}
            />
          ))
        ) : (
          <FormSkeleton />
        )}
      </Stack>
      <FormValidation
        disabled={!formCanBeSubmit}
        isLoading={isSubmitting}
        readOnly={readOnly}
        isLastField={isLastField}
        renderFormValidation={renderFormValidation}
      />
    </Box>
  );
};

export default Standard;
