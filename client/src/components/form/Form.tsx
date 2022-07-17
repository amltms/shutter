import styled from 'styled-components';
import { palette } from '../../styles/palette';

type Props = {
	onSubmit: any;
	children: React.ReactNode;
};

const FormContainer = styled.form`
	width: 100%;
	input {
		background: none;
		font-size: 1.5rem;
		transition: 1s;
		border: none;
		margin-left: 0.8rem;
		width: 20rem;
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
		font-size: 4.5rem;
		margin-bottom: 1rem;
	}
	p {
		color: #a7a6a6;
		font-size: 1.3rem;
		margin: 1rem 0;
		a {
			color: ${palette.primary};
			vertical-align: baseline;
		}
	}
`;

export const Form = ({ children, onSubmit }: Props) => {
	return <FormContainer onSubmit={onSubmit}>{children}</FormContainer>;
};
