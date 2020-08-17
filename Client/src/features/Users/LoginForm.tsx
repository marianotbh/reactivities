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
	password: isRequired('password')
});

const LoginForm: FC = () => {
	const {
		userStore: { login }
	} = useContext(RootStoreContext);

	const handleLogin = async (values: UserFormValue) => {
		try {
			await login(values);
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
						content="Login to TodoApp"
						color="teal"
						textAlign="center"
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
						<ErrorMessage
							error={submitError}
							text="Invalid email or password"
						/>
					)}
					<Button
						loading={submitting}
						disabled={
							(invalid && !dirtySinceLastSubmit) || pristine
						}
						color="teal"
						content="Login"
						fluid
					/>
				</Form>
			)}
		/>
	);
};

export default LoginForm;
