import React, { FC } from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Label, Select } from "semantic-ui-react";
import { Form } from "semantic-ui-react";

type Props = FieldRenderProps<string, HTMLElement> & FormFieldProps;

const SelectInput: FC<Props> = ({
  input,
  width,
  options,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <Select
        value={input.value}
        onChange={(_, data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default SelectInput;
