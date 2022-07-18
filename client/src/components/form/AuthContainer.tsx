import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { getItem } from '../../features/item/itemSlice';
import { reset } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../utilities/Toast';
import Spinner from '../utilities/Spinner';
import { motion } from 'framer-motion';

type Props = {
	children: React.ReactNode;
};

const Container = styled(motion.div)`
	height: 100vh;
	display: flex;
	overflow: hidden;
	position: relative;
`;

const Background = styled.img`
	position: absolute;
	filter: brightness(50%);
	top: 0;
	left: 0;
	z-index: -1;
	min-width: 100%;
	max-height: 100%;
	@media screen and (max-width: 2000px) {
		height: 100vh;
		width: auto;
		margin-left: 50%;
		transform: translate(-50%, 0%);
	}
`;

export const AuthContainer = ({ children }: Props) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [toast, setToast] = useState({
		visible: false,
		message: '',
	});
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { user, status, message } = useAppSelector((state: RootState) => state.auth);
	const { selectedItem } = useAppSelector((state: RootState) => state.item);
	useEffect(() => {
		dispatch(getItem({ type: 'movie', id: 568124 }));
	}, [dispatch]);

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
		<Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
			<Toast setToast={setToast} toast={toast} />
			{!imageLoaded ? <Spinner /> : children}
			<Background src={`https://image.tmdb.org/t/p/original/${selectedItem?.backdrop_path}`} alt="backdrop" onLoad={() => setImageLoaded(true)} />
		</Container>
	);
};
