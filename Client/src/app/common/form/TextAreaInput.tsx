import React, { FC } from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Label } from "semantic-ui-react";
import { Form } from "semantic-ui-react";

type Props = FieldRenderProps<string, HTMLElement> & FormFieldProps;

const TextAreaInput: FC<Props> = ({
  input,
  width,
  rows,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <textarea {...input} rows={rows} placeholder={placeholder} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextAreaInput;
