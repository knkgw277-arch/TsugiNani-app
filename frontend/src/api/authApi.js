import apiClient from './client';

// 会員登録
export const register = (email, password) => {
    return apiClient.post('/auth/register', { email, password });
};

// ログイン
export const login = (email, password) => {
    return apiClient.post('/auth/login', { email, password });
};
