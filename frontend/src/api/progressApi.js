import apiClient from './client';

// タスク一覧取得
export const getAllTasks = () => {
    return apiClient.get('/tasks');
};

// 現在の進捗取得
export const getProgress = () => {
    return apiClient.get('/progress');
};

// 次のタスクへ進む
export const advanceToNextStep = () => {
    return apiClient.post('/progress/next');
};

// 進捗をリセット
export const resetProgress = () => {
    return apiClient.post('/progress/reset');
};
