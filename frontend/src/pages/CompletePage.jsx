import { useNavigate } from 'react-router-dom';
import { resetProgress } from '../api/progressApi';

function CompletePage() {
    const navigate = useNavigate();

    const handleRestart = async () => {
        await resetProgress();
        navigate('/');
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    return (
        <div style={{ maxWidth: '500px', margin: '120px auto', padding: '0 20px', textAlign: 'center' }}>
            <h1>🎉 お疲れ様でした！</h1>
            <p>すべてのタスクが完了しました。</p>
            <p>アプリ開発の一連の流れを最後までやり遂げましたね！</p>

            <div style={{ marginTop: '32px' }}>
                <button onClick={handleRestart} style={{ padding: '10px 20px', marginRight: '12px' }}>
                    もう一度最初から
                </button>
                <button onClick={handleLogout} style={{ padding: '10px 20px' }}>
                    ログアウト
                </button>
            </div>
        </div>
    );
}

export default CompletePage;
