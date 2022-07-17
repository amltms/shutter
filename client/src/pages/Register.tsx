import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getItem, reset } from '../features/item/itemSlice';
import { RootState } from '../app/store';
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
	overflow: hidden;
	position: relative;
	width: 100%;
`;

const FormContainer = styled(motion.div)`
	border-radius: 4rem;
	padding: 4rem;
	backdrop-filter: blur(20px);
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 1000px) {
		border-radius: 0;
		height: 100%;
		width: 100%;
		padding: 2rem;
	}
`;

const NameContainer = styled.div`
	display: flex;
	@media (max-width: 1000px) {
		flex-direction: column;
	}
`;

const Background = styled.img`
	position: absolute;
	width: 100%;
	filter: brightness(50%);
	top: 0;
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

	const { selectedItem } = useAppSelector((state: RootState) => state.item);

	useEffect(() => {
		dispatch(getItem({ type: 'tv', id: 112836 }));

		return () => {
			dispatch(reset());
		};
	}, [dispatch]);

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		dispatch(register(formData));
	};

	return (
		<RegisterContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
			<Background src={`https://image.tmdb.org/t/p/original/${selectedItem?.backdrop_path}`} alt="backdrop" onLoad={() => setImageLoaded(true)} />
			{!imageLoaded ? (
				<Spinner />
			) : (
				<FormContainer initial={{ opacity: 0, y: 300 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
			)}
		</RegisterContainer>
	);
};
