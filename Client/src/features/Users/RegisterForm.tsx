import React, { FC, useContext } from 'react';
import { Form as FForm, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import { Button, Form, Header } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { history } from '../../app/layout/history';
import { UserFormValue } from '../../app/models/User';
import { RootStoreContext } from '../../app/store';
import ErrorMessage from '../../app/common/form/ErrorMessage';

const validate = combineValidators({
	email: isRequired('email'),
	userName: isRequired('userName'),
	displayName: isRequired('displayName'),
	password: isRequired('password')
});

const RegisterForm: FC = () => {
	const {
		userStore: { register }
	} = useContext(RootStoreContext);

	const handleLogin = async (values: UserFormValue) => {
		try {
			await register(values);
			history.push('/activities');
		} catch (error) {
			return { [FORM_ERROR]: error };
		}
	};

	return (
		<FForm
			onSubmit={handleLogin}
			validate={validate}
			render={({
				handleSubmit,
				submitting,
				form,
				submitError,
				invalid,
				pristine,
				dirtySinceLastSubmit
			}) => (
				<Form onSubmit={handleSubmit} error>
					<Header
						as="h2"
						content="Register to TodoApp"
						color="teal"
						textAlign="center"
					/>
					<Field
						name="displayName"
						component={TextInput}
						placeholder="Display Name"
					/>
					<Field
						name="userName"
						component={TextInput}
						placeholder="UserName"
					/>
					<Field
						name="email"
						component={TextInput}
						placeholder="Email"
					/>
					<Field
						name="password"
						component={TextInput}
						placeholder="Password"
						type="password"
					/>
					{submitError && !dirtySinceLastSubmit && (
						<ErrorMessage error={submitError} />
					)}
					{JSON.stringify(form, null, 2)}
					<Button
						loading={submitting}
						disabled={
							(invalid && !dirtySinceLastSubmit) || pristine
						}
						color="teal"
						content="Register"
						fluid
					/>
				</Form>
			)}
		/>
	);
};

export default RegisterForm;
