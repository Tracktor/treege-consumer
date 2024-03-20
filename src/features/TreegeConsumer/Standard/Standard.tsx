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
}

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
}: StandardProps) => (
  <Box onSubmit={handleSubmit} component="form" paddingX={15} style={style}>
    <Stack paddingY={5} spacing={3} direction="column">
      {fields ? (
        fields.map((field, index) => {
          const initialValuesValue = initialValues && initialValues[field.name];

          return (
            <FieldFactory
              key={field.name}
              data={field}
              onChange={handleChange}
              autoFocus={index === 0}
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
    {isLastField && !readOnly && <FormValidation />}
  </Box>
);

export default Standard;
