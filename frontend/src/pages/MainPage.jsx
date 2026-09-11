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

    // 完了状態になったら、画面の描画が終わった後で移動する（レンダリング中に移動しない）
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
        return <p style={{ textAlign: 'center', marginTop: '80px' }}>読み込み中...</p>;
    }

    if (progress && progress.completed) {
        return null;
    }

    return (
        <div style={{ maxWidth: '500px', margin: '80px auto', padding: '0 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h1>つぎなに？</h1>
                <button onClick={handleLogout}>ログアウト</button>
            </div>

            {progress && progress.currentTask ? (
                <div>
                    <p>
                        進捗：{progress.currentStepOrder} / {progress.totalSteps}
                    </p>
                    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '24px', marginBottom: '24px' }}>
                        <h2>{progress.currentTask.title}</h2>
                        <p>{progress.currentTask.description}</p>
                    </div>
                    <button onClick={handleNext} style={{ padding: '10px 20px', marginRight: '12px' }}>
                        完了して次へ
                    </button>
                    <button onClick={handleReset} style={{ padding: '10px 20px' }}>
                        最初からやり直す
                    </button>
                </div>
            ) : (
                <div>
                    <p>まだ何も始まっていません。最初のタスクを始めましょう！</p>
                    <button onClick={handleNext} style={{ padding: '10px 20px' }}>
                        始める
                    </button>
                </div>
            )}
        </div>
    );
}

export default MainPage;
