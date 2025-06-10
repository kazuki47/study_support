import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';

interface StudyRecord {
  date: string;
  time: number;
}

interface StudyData {
  time: number[];
  date: string[];
}

const StudyTimeDisplay = () => {
  const [studyData, setStudyData] = useState<StudyRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  // サーバーから学習データを取得する関数
  const fetchStudyData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/timer', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 認証情報を含める
      });
      
      if (response.ok) {
        const data: StudyData = await response.json();
        
        // バックエンドのレスポンス形式 {time: [25, 30, 20], date: ["2025-06-10", "2025-06-09", "2025-06-08"]} 
        // を StudyRecord[] 形式に変換
        if (data.time && data.date && data.time.length === data.date.length) {
          const records: StudyRecord[] = data.time.map((time, index) => ({
            time: time,
            date: data.date[index]
          }));
          setStudyData(records);
        } else {
          setStudyData([]);
        }
        setError('');
      } else {
        setError('データの取得に失敗しました');
      }
    } catch (error) {
      console.error('サーバーへの接続に失敗しました:', error);
      setError('サーバーへの接続に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // コンポーネントマウント時にデータを取得
  useEffect(() => {
    fetchStudyData();
  }, []);

  // 日付をフォーマットする関数
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 時間をフォーマットする関数（分 → 時間:分）
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}時間${mins}分`;
    } else {
      return `${mins}分`;
    }
  };
  // 日付ごとに学習時間を合計する関数
  const aggregateByDate = (records: StudyRecord[]) => {
    const dateMap = new Map<string, number>();
    
    records.forEach(record => {
      const existing = dateMap.get(record.date) || 0;
      dateMap.set(record.date, existing + record.time);
    });
    
    return Array.from(dateMap.entries())
      .map(([date, totalTime]) => ({ date, totalTime }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  // 過去7日間のデータを取得する関数
  const getWeeklyData = () => {
    const today = new Date();
    const weekData = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const dayData = studyData.filter(record => record.date === dateString);
      const totalTime = dayData.reduce((sum, record) => sum + record.time, 0);
      
      weekData.push({
        date: dateString,
        displayDate: date.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' }),
        dayName: date.toLocaleDateString('ja-JP', { weekday: 'short' }),
        totalTime
      });
    }
    
    return weekData;
  };

  // 棒グラフコンポーネント
  const BarChart = ({ data }: { data: any[] }) => {
    const maxTime = Math.max(...data.map(d => d.totalTime), 60); // 最小60分で表示
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-6 text-gray-800 text-center">
          過去7日間の学習時間
        </h3>
        <div className="flex items-end justify-between h-64 border-b border-gray-200">
          {data.map((item, index) => {
            const height = maxTime > 0 ? (item.totalTime / maxTime) * 100 : 0;
            
            return (
              <div key={index} className="flex flex-col items-center flex-1 mx-1">
                {/* 棒グラフ */}
                <div className="relative w-full flex flex-col justify-end h-56">
                  {item.totalTime > 0 && (
                    <div
                      className="bg-blue-500 rounded-t-md transition-all duration-300 hover:bg-blue-600 relative group"
                      style={{ height: `${height}%`, minHeight: '4px' }}
                    >
                      {/* ツールチップ */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        {formatTime(item.totalTime)}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* 日付表示 */}
                <div className="mt-2 text-center">
                  <div className="text-xs text-gray-600">{item.dayName}</div>
                  <div className="text-sm font-medium text-gray-800">{item.displayDate}</div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Y軸のラベル */}
        <div className="mt-4 flex justify-between text-xs text-gray-500">
          <span>0分</span>
          <span>{formatTime(maxTime)}</span>
        </div>
      </div>
    );
  };
  const aggregatedData = aggregateByDate(studyData);
  const weeklyData = getWeeklyData();
  const totalStudyTime = studyData.reduce((sum, record) => sum + record.time, 0);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          学習時間記録
        </h1>

        {/* 総学習時間 */}
        <div className="bg-blue-100 rounded-lg p-6 mb-8 text-center">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">総学習時間</h2>
          <p className="text-3xl font-bold text-blue-600">
            {formatTime(totalStudyTime)}
          </p>
        </div>

        {/* ローディング状態 */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">データを読み込み中...</p>
          </div>
        )}

        {/* エラー状態 */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="text-center">{error}</p>
            <div className="text-center mt-4">
              <button
                onClick={fetchStudyData}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                再試行
              </button>
            </div>
          </div>
        )}        {/* データ表示 */}
        {!loading && !error && (
          <>
            {studyData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-lg text-gray-600">学習記録がありません</p>
              </div>
            ) : (
              <>
                {/* 棒グラフ表示 */}
                <BarChart data={weeklyData} />
                
                {/* 詳細データテーブル（必要に応じて） */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">詳細記録</h3>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            日付
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            学習時間
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {aggregatedData.slice(0, 10).map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {formatDate(item.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatTime(item.totalTime)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* 更新ボタン */}
            <div className="text-center mt-6">
              <button
                onClick={fetchStudyData}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                データを更新
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudyTimeDisplay;