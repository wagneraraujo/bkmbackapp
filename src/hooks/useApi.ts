import axios, { AxiosResponse } from 'axios';

const api = axios.create({
    //baseURL: 'https://api-bkm-scheduling.herokuapp.com/api/v1'
    baseURL: process.env.PUBLIC_API
});

export const useAuth = () => ({
	// validateEmail: async (email: string) => {
	// 	const response = await api.post('/validate', { email });
	// 	return response.data;
	// },
	validateToken: async (token: string) => {
		const response = await api.post('/validate', { token });
		return response.data;
	},
	signin: async (email: string, password: string) => {
		const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1OTMzMzQ3LCJpYXQiOjE2NTMzNDEzNDcsImp0aSI6ImUyZDcwNjA3MTQwMzQ1ZWU4MWY3MDNiYTgzN2FkN2ZmIiwidXNlcl9pZCI6MX0.t7zP0Z3zZZ9bFuHhpcJZw2nzFenVExy7yAmwNDmf2b8';
		const config = {
			headers: { Authorization: `Bearer ${token}` }
		};
		const responseValidEmail = await api.get(`/user/validate/${email}`, config);
		// const dataPost = { email: 'admin@bkm.com', password: 'Bkm@1234' };
		// const responseValidEmail = await api.post(`/user/token/`, dataPost );
		/*switch(responseValidEmail.status) {
			case 400:
				return {
					response: 'Usuário inexistente!'
				}
			case 200:
				type PropsResponseToken = {
					status: number;
					response: string;
					token?: string;
					access?: string;
				}
				const { data: { status, access }}: AxiosResponse<PropsResponseToken> = await api.post('/token', { email, password });
				switch(status) {
					case 401:
						return {
							response: 'Usuário e/ou senha incorreto(s)'
						}
					case 200:
						return {
							response: 'Login efetuado com sucesso!',
							token: access
						}
					default:
						return {
							response: 'Usuário precisa criar senha!'
						}
				}
			case 203:
				return {
					response: responseValidEmail.data.response,
					status: responseValidEmail.status

				}
		}*/
		// const response = await api.post('/signin', { email, password });
		// return response.data;
	},
	logout: async () => {
		const response = await api.post('/logout');
		return response.data;
	}
});