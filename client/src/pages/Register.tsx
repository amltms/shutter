import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { login } from '../features/auth/authSlice';
import Spinner from '../components/utilities/Spinner';
import { useNavigate } from 'react-router-dom';
import { palette } from '../styles/palette';

const LoginInputs = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`;

const LoginForm = styled.form`
	display: flex;
	flex-direction: column;
	input {
		background: none;
		font-size: 1.5rem;
		color: #ffffff;
		transition: 1s;
		border: 2.5px solid;
		padding: 1rem;
		padding-right: 0;
		border-color: rgba(215, 215, 215, 0.3);
		border-radius: 1.5rem;
		margin-bottom: 1rem;
	}
	button {
		background: none;
		width: 100%;
		border: 1px solid ${palette.primary};
		padding: 1rem;
		font-size: 1.5rem;
	}
`;

const Backdrop = styled.img`
	position: absolute;
	z-index: -1;
	filter: brightness(10%);
	min-height: 100vh;
	width: 100%;
	margin-left: 50%;
	transform: translate(-50%, 0%);
	@media screen and (max-width: 900px) {
		height: 100vh;
		min-width: 100%;
		width: auto;
	}
`;

export const Register: FC = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { user, status, message } = useAppSelector((state: RootState) => state.auth);

	useEffect(() => {
		if (status === 'failed') {
			toast.error(message);
		}

		if (user) {
		}
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

	if (status === 'loading') {
		return <Spinner />;
	}

	return (
		<LoginInputs>
			<Backdrop src={``} />

			<h2>Register</h2>
			<LoginForm onSubmit={onSubmit}>
				<input type="email" name="email" value={formData.email} placeholder="Enter your email" onChange={onChange} />
				<input type="password" name="password" value={formData.password} placeholder="Enter password" onChange={onChange} />

				<button type="submit">Login</button>
			</LoginForm>
		</LoginInputs>
	);
};
