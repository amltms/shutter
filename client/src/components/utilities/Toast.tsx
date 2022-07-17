import styled from 'styled-components';
import { FC, useEffect, useRef } from 'react';
import { AiFillWarning } from 'react-icons/ai';
import { palette } from '../../styles/palette';

interface props {
	toast: { visible: boolean; message: string };
	setToast: (toast: { visible: boolean; message: string }) => void;
}
interface ToastProps {
	visible: boolean;
}

const ToastContainer = styled.div<ToastProps>`
	bottom: ${(props) => (props.visible ? '5%' : '-10%')};
	opacity: ${(props) => (props.visible ? '1' : '0')};
	z-index: 1000;
	background-color: ${palette.warning};
	position: fixed;
	color: white;
	border-radius: 0.4rem;
	transition: 0.3s;
	padding: 1rem;
	padding-right: 2rem;
	font-size: 1.2rem;
	left: 50%;
	transform: translate(-50%);
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	p {
		font-size: 1.3rem;
	}
	> svg {
		font-size: 2rem;
		margin-right: 0.8rem;
	}
`;

export const Toast: FC<props> = ({ setToast, toast }) => {
	const timer: { current: NodeJS.Timeout | null } = useRef(null);
	useEffect(() => {
		//remove toast after 3 seconds
		if (toast.visible) {
			timer.current = setTimeout(function () {
				setToast({ ...toast, visible: false });
			}, 3000);
		}
	}, [toast, setToast]);

	return (
		<ToastContainer visible={toast.visible}>
			<AiFillWarning className="icon" />
			<p>{toast.message}</p>
		</ToastContainer>
	);
};
