import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProgress, advanceToNextStep, resetProgress } from '../api/progressApi';

function MainPage() {
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProgress();
    }, []);

    useEffect(() => {
        if (progress && progress.completed) {
            navigate('/complete');
        }
    }, [progress, navigate]);

    const fetchProgress = async () => {
        try {
            const response = await getProgress();
            setProgress(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleNext = async () => {
        const response = await advanceToNextStep();
        setProgress(response.data);
    };

    const handleReset = async () => {
        const response = await resetProgress();
        setProgress(response.data);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="page-loading">
                <div className="loading-spinner"></div>
                <p>読み込み中...</p>
            </div>
        );
    }

    if (progress && progress.completed) {
        return null;
    }

    const progressPercent =
        progress && progress.totalSteps
            ? (progress.currentStepOrder / progress.totalSteps) * 100
            : 0;

    return (
        <div className="main-page">
            <header className="app-header">
                <div className="logo">
                    <span className="logo-mark">→</span>
                    <span>つぎなに？</span>
                </div>

                <button className="logout-button" onClick={handleLogout}>
                    ログアウト
                </button>
            </header>

            <main className="main-content">
                <section className="welcome-section">
                    <p className="eyebrow">YOUR NEXT STEP</p>
                    <h1>迷わず、ひとつずつ。</h1>
                    <p className="welcome-text">
                        今日やることを１つに絞って、
                        <br />
                        少しずつ前に進めよう。
                    </p>
                </section>

                {progress && progress.currentTask ? (
                    <section className="task-card">
                        <div className="task-top">
                            <div>
                                <span className="step-label">STEP</span>
                                <span className="step-number">
                                    {String(progress.currentStepOrder).padStart(2, '0')}
                                </span>
                            </div>

                            <span className="step-count">
                                {progress.currentStepOrder} / {progress.totalSteps}
                            </span>
                        </div>

                        <div className="progress-track">
                            <div
                                className="progress-fill"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>

                        <div className="task-body">
                            <p className="task-kicker">TODAY'S TASK</p>

                            <h2>{progress.currentTask.title}</h2>

                            <p className="task-description">
                                {progress.currentTask.description}
                            </p>
                        </div>

                        <div className="task-actions">
                            <button className="primary-button" onClick={handleNext}>
                                完了して次へ
                                <span>→</span>
                            </button>

                            <button className="reset-button" onClick={handleReset}>
                                最初からやり直す
                            </button>
                        </div>
                    </section>
                ) : (
                    <section className="start-card">
                        <div className="start-icon">✦</div>

                        <p className="task-kicker">READY TO START?</p>

                        <h2>まずは、ここから。</h2>

                        <p className="task-description">
                            最初のタスクから始めて、
                            <br />
                            あなたの開発を一歩ずつ進めていこう。
                        </p>

                        <button className="primary-button" onClick={handleNext}>
                            始める
                            <span>→</span>
                        </button>
                    </section>
                )}

                <p className="encouragement">
                    ちょっとずつで大丈夫。次にやることは、ここにあります。
                </p>
            </main>
        </div>
    );
}

export default MainPage;