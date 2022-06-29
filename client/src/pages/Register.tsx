import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Toast } from '../components/utilities/Toast';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { register, reset } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { palette } from '../styles/palette';
import { BsArrowRightShort } from 'react-icons/bs';
import { MdAccountBox, MdLockOutline, MdOutlineAlternateEmail } from 'react-icons/md';

const LoginInputs = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`;

const LoginForm = styled.form`
	padding: 5rem;
	border-radius: 3rem;
	backdrop-filter: blur(20px);
	background-color: rgba(0, 0, 0, 0.8);
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
	h2 {
		font-family: 'Roboto', sans-serif;
		font-weight: 1000;
		font-size: 4rem;
		margin-bottom: 1rem;
	}
	p {
		color: #a7a6a6;
		margin: 1rem 0;
		font-size: 1.3rem;
		a {
			color: ${palette.primary};
			vertical-align: baseline;
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
	@media (max-width: 1800px) {
		width: 80%;
	}

	@media (max-width: 1200px) {
		height: 100%;
		width: 100%;
		border-radius: 0;
	}
`;
const InputContainer = styled.div`
	width: 100%;
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

const NameContainer = styled.div`
	display: flex;
`;

const LoginBackground = styled.img`
	object-fit: cover;
	position: absolute;
	top: 0;
	width: 100%;
	height: 100vh;
	z-index: -1;
	overflow: hidden;
	filter: brightness(50%);
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

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		dispatch(register(formData));
	};

	return (
		<LoginInputs>
			<Toast setToast={setToast} toast={toast} />
			<LoginForm onSubmit={onSubmit}>
				<h2>SIGN UP</h2>
				<p>
					Already A Member? <Link to={`/login`}>Login</Link>
				</p>
				<NameContainer>
					<InputContainer>
						<MdAccountBox />
						<input type="text" name="firstName" value={formData.firstName} placeholder="First Name" onChange={onChange} required />
					</InputContainer>
					<InputContainer>
						<MdAccountBox />
						<input type="text" name="lastName" value={formData.lastName} placeholder="Last Name" onChange={onChange} required />
					</InputContainer>
				</NameContainer>
				<InputContainer>
					<MdOutlineAlternateEmail />
					<input type="email" name="email" value={formData.email} placeholder="Email" onChange={onChange} required />
				</InputContainer>
				<InputContainer>
					<MdLockOutline />
					<input type="password" name="password" value={formData.password} placeholder="Password" onChange={onChange} required />
				</InputContainer>
				<button type="submit">
					<BsArrowRightShort />
				</button>
			</LoginForm>
			<LoginBackground src={`${process.env.PUBLIC_URL}/login-bg.jpg`} />
		</LoginInputs>
	);
};
