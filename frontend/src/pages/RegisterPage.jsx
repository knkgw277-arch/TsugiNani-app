import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/authApi';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            await register(email, password);

            // 登録成功したら、ログイン画面へ移動する
            navigate('/login');
        } catch (error) {
            // バックエンドが返したエラーメッセージを表示する
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage(
                    '登録に失敗しました。時間をおいて再度お試しください。'
                );
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
                    <p className="eyebrow">GET STARTED</p>
                    <h1>はじめの一歩。</h1>
                    <p>
                        アカウントを作成して、
                        <br />
                        開発を一歩ずつ進めていきましょう。
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
                        <label htmlFor="password">パスワード（8文字以上）</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            autoComplete="new-password"
                            placeholder="8文字以上で入力"
                        />
                    </div>

                    {errorMessage && (
                        <p className="auth-error">{errorMessage}</p>
                    )}

                    <button type="submit" className="auth-button">
                        アカウントを作成
                        <span>→</span>
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        すでにアカウントをお持ちの方は
                    </p>
                    <Link to="/login" className="auth-link">
                        ログインはこちら
                    </Link>
                </div>

                <div className="auth-illustration">
                    <img
                        src="/images/Register.png"
                        alt="開発を始めるイメージ"
                    />
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;