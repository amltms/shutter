import styled from 'styled-components';
import { AiOutlineUser } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { logout, reset } from '../../features/auth/authSlice';
import { palette } from '../../styles/palette';
import { Search } from '../utilities/Search';

const Container = styled.div`
	display: flex;
	align-items: center;
	@media screen and (max-width: 900px) {
		display: none;
	}
`;

const Login = styled(Link)`
	font-size: 1.3rem;
	margin-left: 0.5rem;
	display: inline-block;
	border: 1px solid rgba(215, 215, 215, 0.3);
	padding: 0.6rem;
	border-radius: 10px;
`;

const DropDownMenu = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	padding-left: 0.5rem;
	svg {
		fill: ${palette.secondaryTextColor};
		font-size: 1.7rem;
	}
	:hover {
		> div {
			display: block;
		}
	}
`;

const Dropdown = styled.div`
	display: none;
	position: absolute;
	right: 0;
	top: 100%;
	width: 200px;
	background-color: #0d0d0d;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
	padding: 0.5rem;
	border-radius: 0.5rem;
	svg {
		margin-right: 0.3rem;
	}
	hr {
		margin: 0.2rem 0 !important;
	}

	button {
		padding: 0.8rem;
		width: 100%;
		font-size: 1.2rem;
		text-align: left;
		display: flex;
		align-items: center;
		border-radius: 0.5rem;

		:hover {
			background-color: #090909;
			color: ${palette.primary};
		}
	}
`;

const Profile = styled.div`
	padding: 0.8rem;
	display: flex;
	align-items: center;
	p {
		font-size: 1.2rem;
		display: inline-block;
	}
`;

export const NavRight: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state: RootState) => state.auth);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	return (
		<Container>
			<Search />
			{user ? (
				<DropDownMenu>
					<AiOutlineUser />
					<Dropdown>
						<Profile>
							<AiOutlineUser />
							<p>{`${user.firstName} ${user.lastName}`}</p>
						</Profile>
						<hr />
						<button onClick={onLogout}>
							<MdLogout />
							Logout
						</button>
					</Dropdown>
				</DropDownMenu>
			) : (
				<Login to="/login">Login</Login>
			)}
		</Container>
	);
};
