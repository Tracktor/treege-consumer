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
  handleChangeFormValue?(dataAttribute: ChangeEventField): void;
  handleSubmit?(event: FormEvent<HTMLFormElement>): void;
  isLastField: boolean;
  readOnly?: boolean;
  headers?: Headers;
  fieldValues?: FieldValues;
  isLoadingFormValidation?: boolean;
  style?: CSSProperties;
  formCanBeSubmit: boolean;
  ignoreFields?: string[];
}

const Standard = ({
  fields,
  handleChangeFormValue,
  handleSubmit,
  isLastField,
  readOnly,
  headers,
  fieldValues,
  isLoadingFormValidation,
  style,
  formCanBeSubmit,
  ignoreFields,
}: StandardProps) => (
  <Box onSubmit={handleSubmit} component="form" paddingX={15} style={style}>
    <Stack paddingY={5} spacing={3} direction="column">
      {fields ? (
        fields.map((field) => (
          <FieldFactory
            key={field.uuid}
            data={field}
            handleChangeFormValue={handleChangeFormValue}
            readOnly={readOnly}
            headers={headers}
            fieldValues={fieldValues}
            isLoadingFormValidation={isLoadingFormValidation}
            ignoreFields={ignoreFields}
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
