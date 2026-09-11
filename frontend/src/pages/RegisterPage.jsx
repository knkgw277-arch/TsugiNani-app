import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/authApi';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // フォームのデフォルト送信（ページリロード）を止める
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
                setErrorMessage('登録に失敗しました。時間をおいて再度お試しください。');
            }
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '80px auto', padding: '0 20px' }}>
            <h1>会員登録</h1>
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
                    <label>パスワード（8文字以上）</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                {errorMessage && (
                    <p style={{ color: 'red' }}>{errorMessage}</p>
                )}

                <button type="submit" style={{ padding: '10px 20px' }}>
                    登録する
                </button>
            </form>

            <p style={{ marginTop: '16px' }}>
                すでにアカウントをお持ちの方は <Link to="/login">ログイン</Link>
            </p>
        </div>
    );
}

export default RegisterPage;
