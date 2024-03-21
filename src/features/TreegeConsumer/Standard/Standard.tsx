import { Box, Stack } from "@tracktor/design-system";
import { type CSSProperties, FormEvent } from "react";
import FormSkeleton from "@/components/Feedback/FormSkeleton/FormSkeleton";
import FieldFactory from "@/components/FieldFactory";
import FormValidation from "@/components/FormValidation";
import FieldValues from "@/types/FieldValues";
import Headers from "@/types/Headers";
import TreeNode from "@/types/TreeNode";

interface StandardProps {
  fields?: TreeNode[];
  initialValues?: {
    [key: string]: unknown;
  };
  handleChange?(value: any): void;
  handleSubmit?(event: FormEvent<HTMLFormElement>): void;
  isLastField: boolean;
  readOnly?: boolean;
  headers?: Headers;
  fieldValues?: FieldValues;
  isLoadingFormValidation?: boolean;
  style?: CSSProperties;
  formCanBeSubmit: boolean;
}

// if field is initialized, autofocus become false
// useRef
// isFocusInitialized ? false : true

const Standard = ({
  fields,
  initialValues,
  handleChange,
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
        fields.map((field) => {
          const initialValuesValue = initialValues && initialValues[field.name];

          return (
            <FieldFactory
              key={field.name}
              data={field}
              onChange={handleChange}
              // autoFocus={isAutoFocus}
              defaultValue={initialValuesValue}
              readOnly={readOnly}
              headers={headers}
              fieldValues={fieldValues}
              isLoadingFormValidation={isLoadingFormValidation}
            />
          );
        })
      ) : (
        <FormSkeleton />
      )}
    </Stack>
    {isLastField && !readOnly && <FormValidation formCanBeSubmit={formCanBeSubmit} />}
  </Box>
);

export default Standard;
