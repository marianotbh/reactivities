import React, { FC } from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Label } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import { DateTimePicker } from "react-widgets";

type Props = FieldRenderProps<Date, HTMLElement> & FormFieldProps;

const DateInput: FC<Props> = ({
  input,
  width,
  placeholder,
  time = true,
  date = true,
  meta: { touched, error },
  id: _,
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <DateTimePicker
        placeholder={placeholder}
        value={input.value || null}
        onChange={input.onChange}
        onBlur={input.onBlur}
        onKeyDown={(e) => e.preventDefault()}
        date={date}
        time={time}
        {...rest}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
