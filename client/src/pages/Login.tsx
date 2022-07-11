import { useEffect, useState } from 'react';
import { MdOutlineAlternateEmail, MdLockOutline } from 'react-icons/md';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { login, reset } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Toast } from '../components/utilities/Toast';
import { SubmitButton } from '../components/form/SubmitButton';
import { Form } from '../components/form/Form';
import { InputContainer } from '../components/form/InputContainer';

const LoginContainer = styled.div`
	height: 100vh;
	display: flex;
`;

const LoginInputs = styled.div`
	form {
		width: 25%;
		height: 100%;
		padding: 5rem;
	}

	@media (max-width: 2000px) {
		form {
			width: 45%;
			padding: 6vw;
		}
	}
	@media (max-width: 1000px) {
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
	const [formData, setFormData] = useState({
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

		dispatch(login(formData));
	};

	return (
		<LoginContainer>
			<Toast setToast={setToast} toast={toast} />
			<LoginInputs>
				<Form onSubmit={onSubmit}>
					<h2>LOGIN</h2>
					<InputContainer name={'email'} icon={<MdOutlineAlternateEmail />} formData={formData} setFormData={setFormData} />
					<InputContainer name={'password'} icon={<MdLockOutline />} formData={formData} setFormData={setFormData} />
					<p>
						Don't have an account? <Link to={'/register'}>Sign up</Link>
					</p>
					<SubmitButton />
				</Form>
			</LoginInputs>
			<Background src={`${process.env.PUBLIC_URL}/bg.jpg`} />
		</LoginContainer>
	);
};
