import { Select, InputLabel, OutlinedInput, FormControl, SelectChangeEvent, MenuItem } from "@tracktor/design-system";
// import ControlledToolTip from "@/components/ControlledToolTip/ControlledToolTip";
import { useState } from "react";
import ControlledTooltip from "@/components/ControlledToolTip";
import useDynamicSelect from "@/components/Inputs/DynamicSelect/useDynamicSelect";
import ChangeEventField from "@/types/ChangeEventField";
import Headers from "@/types/Headers";
import TreeNode from "@/types/TreeNode";
import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";

interface DynamicSelectProps {
  node: TreeNode;
  fieldValues?: JsonFormValue[] | unknown;
  onChange?(dataAttribute: ChangeEventField): void;
  errorMessage?: string;
  headers?: Headers;
  disabledChildrenField?: boolean;
}

/**
 * DynamicSelect component
 * @param treeValue
 * @param node
 * @param onChange
 * @param errorMessage
 * @param disabledChildrenField
 * @param headers
 * @constructor
 */
const DynamicSelect = ({ fieldValues, node, onChange, errorMessage, disabledChildrenField, headers }: DynamicSelectProps) => {
  const [singleOption, setSingleOption] = useState<string>("");
  const [multipleOptions, setMultipleOptions] = useState<string[]>([""]);

  const { name, attributes, children } = node;
  const { label, type, isLeaf, parentRef, isDecision, route, required, isMultiple, initialQuery } = attributes;

  const { options } = useDynamicSelect({
    fieldValues,
    headers,
    initialQuery,
    name,
    parentRef,
    route,
  });

  const handleChange = (event: SelectChangeEvent<typeof multipleOptions | typeof singleOption>) => {
    const { value } = event.target;
    if (isMultiple) {
      setMultipleOptions(typeof value === "string" ? value.split(",") : value);
    } else {
      setSingleOption(String(value));
    }

    const selectedOptions = options
      ?.filter((option) => value.includes(String(option.id)))
      .map((option) => ({
        id: option.id,
        isSelected: true,
        label: option.label,
      }));

    onChange?.({
      children,
      event,
      isDecision,
      isLeaf,
      name,
      type,
      value: selectedOptions,
    });
  };

  return (
    <ControlledTooltip parentRef={label} title={name} disabled={disabledChildrenField}>
      <FormControl required={required} fullWidth>
        <InputLabel id={`label-${name}`}>{label}</InputLabel>
        <Select
          labelId={`label-${name}`}
          label={label}
          name={name}
          id={name}
          multiple={isMultiple}
          value={isMultiple ? multipleOptions : singleOption}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          disabled={disabledChildrenField}
          aria-errormessage={errorMessage}
          sx={{ maxWidth: 400 }}
        >
          {options?.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ControlledTooltip>
  );
};

export default DynamicSelect;
