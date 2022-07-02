import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Toast } from '../components/utilities/Toast';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { register, reset } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { MdAccountBox, MdLockOutline, MdOutlineAlternateEmail } from 'react-icons/md';
import { SubmitButton } from '../components/form/SubmitButton';
import { Form } from '../components/form/Form';
import { InputContainer } from '../components/form/InputContainer';

const RegisterContainer = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const LoginInputs = styled.div`
	form {
		left: 50%;
		top: 50%;
		padding: 5rem;
		transform: translate(-50%, -50%);
		border-radius: 2rem;
	}

	@media (max-width: 1500px) {
		form {
			width: 70%;
			padding: 6vw;
		}
	}
	@media (max-width: 1000px) {
		form {
			border-radius: 0;
			height: 100%;
			padding: 8vw;
			width: 100%;
		}
	}
`;

const NameContainer = styled.div`
	display: flex;
`;

const Background = styled.img`
	object-fit: cover;
	width: 100%;
	min-height: 100vh;
	overflow: hidden;
	filter: brightness(40%);
`;

export const Register: FC = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const [toast, setToast] = useState({
		visible: false,
		message: '',
	});
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { user, status, message } = useAppSelector((state: RootState) => state.auth);

	useEffect(() => {
		if (status === 'failed') {
			setToast((t) => ({ ...t, visible: true, message }));
		}

		if (user) {
			navigate('/');
		}

		return () => {
			dispatch(reset());
		};
	}, [user, status, navigate, dispatch, message]);

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		dispatch(register(formData));
	};

	return (
		<RegisterContainer>
			<Toast setToast={setToast} toast={toast} />
			<LoginInputs>
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
			</LoginInputs>
			<Background src={`${process.env.PUBLIC_URL}/login-bg.jpg`} />
		</RegisterContainer>
	);
};
