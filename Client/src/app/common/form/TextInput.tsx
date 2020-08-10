import React, { FC } from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Label } from "semantic-ui-react";
import { Form } from "semantic-ui-react";

type Props = FieldRenderProps<string, HTMLElement> & FormFieldProps;

const TextInput: FC<Props> = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <input {...input} placeholder={placeholder} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
