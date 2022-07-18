import { FC } from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';

export type InputProps = {
	name: string;
	formData: any;
	setFormData: any;
	icon: any;
};

const Input = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 1.2rem 0;
	border-bottom: 1px solid #4c4c4c;
	margin-bottom: 1rem;
	transition: 0.5s;
	input {
		background: none;
		font-size: 1.5rem;
		transition: 1s;
		border: none;
		margin-left: 0.8rem;
		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus,
		&:-webkit-autofill:active {
			-webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
			-webkit-transition-delay: 9999s;
			transition: 'color 9999s ease-out, background-color 9999s ease-out';
			transition-delay: 9999s;
		}
		width: 15vw;
		@media (max-width: 1800px) {
			width: 25vw;
		}
		@media (max-width: 900px) {
			width: 100%;
		}
	}
	svg {
		fill: #4c4c4c;
		font-size: 1.6rem;
		transition: 0.5s;
	}
	:focus-within {
		border-bottom: 1px solid ${palette.primary};
		svg {
			fill: ${palette.primary};
		}
	}
`;

export const InputContainer: FC<InputProps> = ({ formData, setFormData, name, icon }) => {
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState: any) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const changeName = (name: any) => {
		const result = name.replace(/([A-Z])/g, ' $1');
		return result.charAt(0).toUpperCase() + result.slice(1);
	};

	return (
		<Input>
			{icon}
			<input type={name} name={name} value={formData[name]} placeholder={changeName(name)} onChange={onChange} required />
		</Input>
	);
};
