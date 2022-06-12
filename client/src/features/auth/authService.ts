import axios from 'axios';
import { User } from '../../types';

const API_URL = '/api/users/';

// Register user
const register = async (userData: User) => {
	const response = await axios.post(API_URL, userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

// Login user
const login = async (userData: User) => {
	const response = await axios.post(API_URL + 'login', userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

// Logout user
const logout = () => {
	localStorage.removeItem('user');
};

const authService = {
	register,
	logout,
	login,
};

export default authService;
