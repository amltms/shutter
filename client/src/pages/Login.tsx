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
import Spinner from '../components/utilities/Spinner';

const LoginContainer = styled(motion.div)`
	display: flex;
	form {
		height: 100%;
	}

	@media (max-width: 1100px) {
		form {
			padding: 3rem;
			width: 100%;
		}
	}

	p {
		text-align: center;
	}
`;

const Background = styled.img`
	object-fit: cover;
	width: 100%;
	overflow: hidden;
	filter: brightness(70%);
`;

export const Login = () => {
	const [imageLoaded, setImageLoaded] = useState(false);
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
		<LoginContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
			{!imageLoaded ? (
				<Spinner />
			) : (
				<Form onSubmit={onSubmit}>
					<h2>LOGIN</h2>
					<InputContainer name={'email'} icon={<MdOutlineAlternateEmail />} formData={formData} setFormData={setFormData} />
					<InputContainer name={'password'} icon={<MdLockOutline />} formData={formData} setFormData={setFormData} />
					<p>
						Don't have an account? <Link to={'/register'}>Sign up</Link>
					</p>
					<SubmitButton />
				</Form>
			)}
			<Background src={`${process.env.PUBLIC_URL}/bg.jpg`} onLoad={() => setImageLoaded(true)} />
		</LoginContainer>
	);
};
