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
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">
                    <span className="logo-mark">→</span>
                    <span>つぎなに？</span>
                </div>

                <div className="auth-heading">
                    <p className="eyebrow">WELCOME BACK</p>
                    <h1>おかえりなさい。</h1>
                    <p>
                        ログインして、前回の続きから
                        <br />
                        開発を再開しましょう。
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">メールアドレス</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            placeholder="example@email.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">パスワード</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            placeholder="パスワードを入力"
                        />
                    </div>

                    {errorMessage && (
                        <p className="auth-error">{errorMessage}</p>
                    )}

                    <button type="submit" className="auth-button">
                        ログイン
                        <span>→</span>
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        アカウントをお持ちでない方は
                    </p>
                    <Link to="/register" className="auth-link">
                        会員登録はこちら
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;