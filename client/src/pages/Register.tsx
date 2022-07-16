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
import Spinner from '../components/utilities/Spinner';

const RegisterContainer = styled(motion.div)`
	display: flex;
	justify-content: center;
	align-items: center;

	form {
		border-radius: 2rem;
	}

	@media (max-width: 1000px) {
		form {
			border-radius: 0;
			height: 100%;
			width: 100%;
			padding: 8vw;
		}
	}
`;

const NameContainer = styled.div`
	display: flex;
	@media (max-width: 1000px) {
		flex-direction: column;
	}
`;

const Background = styled.img`
	object-fit: cover;
	width: 100%;
	min-height: 100vh;
	overflow: hidden;
	filter: brightness(40%);
`;

export const Register = () => {
	const [imageLoaded, setImageLoaded] = useState(false);
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
		<RegisterContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
			{!imageLoaded ? (
				<Spinner />
			) : (
				<Form onSubmit={onSubmit}>
					<h2>SIGN UP</h2>
					<p>
						Already A Member? <Link to={`/login`}>Login</Link>
					</p>
					<NameContainer>
						<InputContainer name={'firstName'} icon={<MdAccountBox />} formData={formData} setFormData={setFormData} />
						<InputContainer name={'lastName'} icon={<MdAccountBox />} formData={formData} setFormData={setFormData} />
					</NameContainer>
					<InputContainer name={'email'} icon={<MdOutlineAlternateEmail />} formData={formData} setFormData={setFormData} />
					<InputContainer name={'password'} icon={<MdLockOutline />} formData={formData} setFormData={setFormData} />
					<SubmitButton />
				</Form>
			)}
			<Background src={`${process.env.PUBLIC_URL}/register-bg.jpg`} onLoad={() => setImageLoaded(true)} />
		</RegisterContainer>
	);
};
