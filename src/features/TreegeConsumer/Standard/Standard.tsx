import { Box, Stack } from "@tracktor/design-system";
import { type CSSProperties, FormEvent } from "react";
import FormSkeleton from "@/components/Feedback/FormSkeleton/FormSkeleton";
import FormValidation from "@/components/Form/FormValidation";
import FieldFactory from "@/components/Inputs/FieldFactory";
import ChangeEventField from "@/types/ChangeEventField";
import { FieldValues } from "@/types/FieldValues";
import Headers from "@/types/Headers";
import TreeNode from "@/types/TreeNode";

interface StandardProps {
  fields?: TreeNode[];
  handleFormValue?(dataAttribute: ChangeEventField): void;
  handleSubmit?(event: FormEvent<HTMLFormElement>): void;
  isLastField: boolean;
  readOnly?: boolean;
  headers?: Headers;
  fieldValues?: FieldValues;
  isLoadingFormValidation?: boolean;
  style?: CSSProperties;
  formCanBeSubmit: boolean;
}

const Standard = ({
  fields,
  handleFormValue,
  handleSubmit,
  isLastField,
  readOnly,
  headers,
  fieldValues,
  isLoadingFormValidation,
  style,
  formCanBeSubmit,
}: StandardProps) => (
  <Box onSubmit={handleSubmit} component="form" paddingX={15} style={style}>
    <Stack paddingY={5} spacing={3} direction="column">
      {fields ? (
        fields.map((field) => (
          <FieldFactory
            key={field.uuid}
            data={field}
            onChange={handleFormValue}
            readOnly={readOnly}
            headers={headers}
            fieldValues={fieldValues}
            isLoadingFormValidation={isLoadingFormValidation}
          />
        ))
      ) : (
        <FormSkeleton />
      )}
    </Stack>
    {isLastField && !readOnly && <FormValidation formCanBeSubmit={formCanBeSubmit} />}
  </Box>
);

export default Standard;
