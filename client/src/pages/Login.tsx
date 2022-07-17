import { useState, useEffect } from 'react';
import { MdOutlineAlternateEmail, MdLockOutline } from 'react-icons/md';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getItem, reset } from '../features/item/itemSlice';
import { RootState } from '../app/store';
import { login } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { SubmitButton } from '../components/form/SubmitButton';
import { Form } from '../components/form/Form';
import { InputContainer } from '../components/form/InputContainer';
import { motion } from 'framer-motion';
import Spinner from '../components/utilities/Spinner';

const LoginContainer = styled(motion.div)`
	display: flex;
	width: 100%;
`;

const FormContainer = styled(motion.div)`
	position: absolute;
	height: 100%;
	z-index: 100;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.7);
	backdrop-filter: blur(15px);
	padding: 4rem;
	p {
		text-align: center;
	}

	@media (max-width: 1100px) {
		width: 100%;
		padding: 2rem;
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

	const { selectedItem } = useAppSelector((state: RootState) => state.item);

	useEffect(() => {
		dispatch(getItem({ type: 'movie', id: 568124 }));

		return () => {
			dispatch(reset());
		};
	}, [dispatch]);

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		dispatch(login(formData));
	};

	return (
		<LoginContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
			{!imageLoaded ? (
				<Spinner />
			) : (
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
			)}
			<Background src={`https://image.tmdb.org/t/p/original/${selectedItem?.backdrop_path}`} alt="backdrop" onLoad={() => setImageLoaded(true)} />
		</LoginContainer>
	);
};
