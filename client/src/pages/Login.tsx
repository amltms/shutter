import { useState } from 'react';
import { MdOutlineAlternateEmail, MdLockOutline } from 'react-icons/md';
import styled from 'styled-components';
import { useAppDispatch } from '../app/hooks';
import { login } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { SubmitButton } from '../components/form/SubmitButton';
import { Form } from '../components/form/Form';
import { InputContainer } from '../components/form/InputContainer';
import { motion } from 'framer-motion';

const FormContainer = styled(motion.div)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	backdrop-filter: blur(20px);
	background-color: rgba(0, 0, 0, 0.7);
	position: absolute;
	height: 100%;
	p {
		text-align: center;
	}

	@media (max-width: 1100px) {
		width: 100%;
	}
`;

export const Login = () => {
	const dispatch = useAppDispatch();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		dispatch(login(formData));
	};

	return (
		<FormContainer initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
			<Form onSubmit={onSubmit}>
				<h2>LOGIN</h2>
				<InputContainer name={'email'} icon={<MdOutlineAlternateEmail />} formData={formData} setFormData={setFormData} />
				<InputContainer name={'password'} icon={<MdLockOutline />} formData={formData} setFormData={setFormData} />
				<p>
					Don't have an account? <Link to={'/register'}>Sign up</Link>
				</p>
				<SubmitButton />
			</Form>
		</FormContainer>
	);
};
