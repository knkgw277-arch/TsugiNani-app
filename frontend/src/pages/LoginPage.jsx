import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/authApi';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await login(email, password);
            // 受け取ったトークンを、ブラウザの保存領域に保存する
            localStorage.setItem('accessToken', response.data.accessToken);
            // メイン画面へ移動する
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('ログインに失敗しました。時間をおいて再度お試しください。');
            }
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '80px auto', padding: '0 20px' }}>
            <h1>ログイン</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                    <label>メールアドレス</label>
                    <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <label>パスワード</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                {errorMessage && (
                    <p style={{ color: 'red' }}>{errorMessage}</p>
                )}

                <button type="submit" style={{ padding: '10px 20px' }}>
                    ログイン
                </button>
            </form>

            <p style={{ marginTop: '16px' }}>
                アカウントをお持ちでない方は <Link to="/register">会員登録</Link>
            </p>
        </div>
    );
}

export default LoginPage;
