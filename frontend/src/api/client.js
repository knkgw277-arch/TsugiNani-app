import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

// リクエストを送信する直前に、必ずこの処理が挟まる
apiClient.interceptors.request.use((config) => {
    // ブラウザに保存しておいたトークンを取り出す
    const token = localStorage.getItem('accessToken');

    // トークンがあれば、リクエストヘッダーに自動でくっつける
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default apiClient;
