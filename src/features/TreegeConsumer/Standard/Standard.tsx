import { Box, Stack } from "@tracktor/design-system";
import { type CSSProperties, FormEvent, ReactNode } from "react";
import FormSkeleton from "@/components/Feedback/FormSkeleton/FormSkeleton";
import FormValidation from "@/components/Form/FormValidation";
import FieldFactory from "@/components/Inputs/FieldFactory";
import ChangeEventField from "@/types/ChangeEventField";
import { FieldValues } from "@/types/FieldValues";
import { Headers } from "@/types/Headers";
import { RenderFormValidationParams } from "@/types/RenderFormValidationParams";
import TreeNode from "@/types/TreeNode";

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
  handleChangeFormValue?(dataAttribute: ChangeEventField): void;
  handleSubmit?(event: FormEvent<HTMLFormElement>): void;
  renderFormValidation?(params: RenderFormValidationParams): ReactNode;
}

const Standard = ({
  fields,
  handleChangeFormValue,
  handleSubmit,
  isLastField,
  readOnly,
  headers,
  fieldValues,
  isSubmitting,
  style,
  formCanBeSubmit,
  ignoreFields,
  renderFormValidation,
}: StandardProps) => (
  <Box onSubmit={handleSubmit} component="form" paddingX={15} paddingY={5} style={style}>
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

export default Standard;
