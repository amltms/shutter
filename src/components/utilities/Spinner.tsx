import styled from 'styled-components';
const SpinnerContainer = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 5000;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const LoadingSpinner = styled.div`
	width: 64px;
	height: 64px;
	border: 8px solid;
	border-color: #000 transparent #555 transparent;
	border-radius: 50%;
	animation: spin 1.2s linear infinite;
`;
function Spinner() {
	return (
		<SpinnerContainer>
			<LoadingSpinner />
		</SpinnerContainer>
	);
}

export default Spinner;
