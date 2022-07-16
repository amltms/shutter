import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { reset } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../utilities/Toast';

type Props = {
	children: React.ReactNode;
};
const Container = styled.div`
	height: 100vh;
	display: flex;
`;
export const AuthContainer = ({ children }: Props) => {
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

	return (
		<Container>
			<Toast setToast={setToast} toast={toast} />
			{children}
		</Container>
	);
};
