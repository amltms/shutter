import { FC, useEffect, useState } from 'react';
import { MdOutlineAlternateEmail, MdLockOutline } from 'react-icons/md';
import { BsArrowRightShort } from 'react-icons/bs';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { login, reset } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { palette } from '../styles/palette';
import { Toast } from '../components/utilities/Toast';

const LoginContainer = styled.div`
	height: 100vh;
	display: flex;
`;

const LoginInputs = styled.div`
	width: 28%;
	position: absolute;
	backdrop-filter: blur(20px);
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 100;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	h2 {
		font-family: 'Roboto', sans-serif;
		font-weight: 1000;
		font-size: 4rem;
		margin-bottom: 1rem;
	}
	p {
		text-align: center;
		color: #a7a6a6;
		margin-top: 1.5rem;
		font-size: 1rem;
		a {
			color: ${palette.primary};
			vertical-align: baseline;
		}
	}
	@media (max-width: 1800px) {
		width: 40%;
	}

	@media (max-width: 1200px) {
		width: 100%;
	}
`;

const LoginBackground = styled.img`
	object-fit: cover;
	width: 100%;
	overflow: hidden;
	filter: brightness(30%);
`;

const InputContainer = styled.div`
	width: 25rem;
	display: flex;
	align-items: center;
	padding: 1.2rem 0;
	border-bottom: 1px solid #4c4c4c;
	margin-bottom: 1rem;
	svg {
		fill: #4c4c4c;
		font-size: 1.6rem;
	}
`;

const LoginForm = styled.form`
	input {
		background: none;
		font-size: 1.5rem;
		transition: 1s;
		border: none;
		margin-left: 0.8rem;
		width: 100%;
		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus,
		&:-webkit-autofill:active {
			-webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
			-webkit-transition-delay: 9999s;
			transition: 'color 9999s ease-out, background-color 9999s ease-out';
			transition-delay: 9999s;
		}
	}
	button {
		margin-top: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		float: right;
		font-size: 3rem;
		border-radius: 50%;
		width: 80px;
		height: 80px;
		border: 2px solid #4c4c4c;

		svg {
			transition: 0.4s;
			fill: #4c4c4c;
		}

		:hover {
			svg {
				fill: ${palette.primary};
			}
			border-color: ${palette.primary};
		}
	}
`;

export const Login: FC = () => {
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

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		dispatch(login(formData));
	};

	return (
		<LoginContainer>
			<Toast setToast={setToast} toast={toast} />
			<LoginInputs>
				<LoginForm onSubmit={onSubmit}>
					<h2>LOGIN</h2>
					<InputContainer>
						<MdOutlineAlternateEmail />
						<input type="email" name="email" value={formData.email} placeholder="Email" onChange={onChange} />
					</InputContainer>
					<InputContainer>
						<MdLockOutline />
						<input type="password" name="password" value={formData.password} placeholder="Password" onChange={onChange} />
					</InputContainer>
					<p>
						Don't have an account? <Link to={'/register'}>Sign up</Link>
					</p>
					<button type="submit">
						<BsArrowRightShort />
					</button>
				</LoginForm>
			</LoginInputs>
			<LoginBackground src={`${process.env.PUBLIC_URL}/login-bg.jpg`} />
		</LoginContainer>
	);
};
