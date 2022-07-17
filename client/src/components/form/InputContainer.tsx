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
	svg {
		fill: #4c4c4c;
		font-size: 1.6rem;
	}
	:focus-within {
		border-bottom: 1px solid ${palette.primary};
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
