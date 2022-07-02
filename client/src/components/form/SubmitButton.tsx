import { FC } from 'react';
import styled from 'styled-components';
import { BsArrowRightShort } from 'react-icons/bs';
import { palette } from '../../styles/palette';

const Button = styled.button`
	margin-top: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	float: right;
	margin-left: auto;
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
`;

export const SubmitButton: FC = () => {
	return (
		<Button type="submit">
			<BsArrowRightShort />
		</Button>
	);
};
