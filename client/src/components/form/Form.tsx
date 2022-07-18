import styled from 'styled-components';
import { palette } from '../../styles/palette';

type Props = {
	onSubmit: any;
	children: React.ReactNode;
};

const FormContainer = styled.form`
	z-index: 100;
	padding: 3vw;
	@media (max-width: 1800px) {
		padding: 3rem;
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
