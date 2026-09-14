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
        <main className="complete-page">
            <div className="complete-decoration complete-decoration-one">
                ✦
            </div>

            <div className="complete-decoration complete-decoration-two">
                ✦
            </div>

            <div className="complete-decoration complete-decoration-three">
                •
            </div>

            <section className="complete-card">

                <div className="complete-icon">
                    ✓
                </div>

                <div className="complete-illustration">
                    <img
                        src="/images/Complete.png"
                        alt="タスク完了のイメージ"
                    />
                </div>

                <p className="complete-label">
                    ALL DONE!
                </p>

                <h1>
                    すべてのタスクを
                    <br />
                    完了しました
                </h1>

                <p className="complete-message">
                    ここまでの学習、おつかれさまでした。
                    <br />
                    一つずつ進めて、最後までやり切りましたね。
                </p>

                <div className="complete-actions">

                    <button
                        className="complete-restart-button"
                        onClick={handleRestart}
                    >
                        最初からやり直す
                        <span>→</span>
                    </button>

                    <button
                        className="complete-logout-button"
                        onClick={handleLogout}
                    >
                        ログアウト
                    </button>

                </div>

            </section>
        </main>
    );
}

export default CompletePage;