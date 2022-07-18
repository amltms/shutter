import { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../app/hooks';
import { register } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { MdAccountBox, MdLockOutline, MdOutlineAlternateEmail } from 'react-icons/md';
import { SubmitButton } from '../components/form/SubmitButton';
import { Form } from '../components/form/Form';
import { InputContainer } from '../components/form/InputContainer';
import { motion } from 'framer-motion';

const RegisterContainer = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	z-index: 100;
`;

const FormContainer = styled(motion.div)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	backdrop-filter: blur(20px);
	background-color: rgba(0, 0, 0, 0.7);
	border-radius: 4rem;
	@media (max-width: 1000px) {
		border-radius: 0;
		height: 100%;
		width: 100%;
	}
`;

const NameContainer = styled.div`
	display: flex;
	@media (max-width: 1000px) {
		flex-direction: column;
	}
`;

export const Register = () => {
	const dispatch = useAppDispatch();
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		dispatch(register(formData));
	};

	return (
		<RegisterContainer>
			<FormContainer initial={{ opacity: 0, y: 150 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
				<Form onSubmit={onSubmit}>
					<h2>SIGN UP</h2>
					<p>
						Already a member? <Link to={`/login`}>Login</Link>
					</p>
					<NameContainer>
						<InputContainer name={'firstName'} icon={<MdAccountBox />} formData={formData} setFormData={setFormData} />
						<InputContainer name={'lastName'} icon={<MdAccountBox />} formData={formData} setFormData={setFormData} />
					</NameContainer>
					<InputContainer name={'email'} icon={<MdOutlineAlternateEmail />} formData={formData} setFormData={setFormData} />
					<InputContainer name={'password'} icon={<MdLockOutline />} formData={formData} setFormData={setFormData} />
					<SubmitButton />
				</Form>
			</FormContainer>
		</RegisterContainer>
	);
};
