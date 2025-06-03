import React, { useState, useEffect } from 'react';

enum SessionType {
  Work = '作業中 🔥',
  ShortBreak = '短い休憩中 ☕',
  LongBreak = '長い休憩中 🛌',
  Stopped = '停止中 ⏸', // 「停止中」の状態を追加
}

const Timer = () => {
  const workMinutesConfig: number = 25;
  const shortBreakMinutesConfig: number = 5;
  const longBreakMinutesConfig: number = 15;
  const sessionsBeforeLongBreak: number = 4;

  const [minutes, setMinutes] = useState<number>(workMinutesConfig);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentSessionType, setCurrentSessionType] = useState<SessionType>(
    SessionType.Work
  );
  const [sessionCount, setSessionCount] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      // 現在のセッションがStoppedならWorkに戻す
      if (currentSessionType === SessionType.Stopped) {
        setCurrentSessionType(SessionType.Work); // もし停止中から再開なら作業中に
      }
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          if (minutes === 0) {
            if (interval) clearInterval(interval);
            handleTimerEnd();
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
      if (
        (minutes !== workMinutesConfig || seconds !== 0 || sessionCount > 0) && // 初期状態ではない
        currentSessionType !== SessionType.ShortBreak && // 休憩開始直後ではない
        currentSessionType !== SessionType.LongBreak &&  // 休憩開始直後ではない
        (minutes !== 0 || seconds !== 0) // 時間が0でない (handleTimerEndで0になった直後は除く)
      ) {
         // リセット直後でない場合のみStoppedにする
        if(!(minutes === workMinutesConfig && seconds === 0 && currentSessionType === SessionType.Work && sessionCount === 0)){
            setCurrentSessionType(SessionType.Stopped);
        }
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, minutes, workMinutesConfig, sessionCount, currentSessionType]); // currentSessionTypeを依存配列に追加

  const recordStudyTime = async (studyMinutes: number) => {
    try {
      const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD形式
      
      const response = await fetch('http://localhost:5000/timer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: currentDate,
          time: studyMinutes
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('勉強時間が記録されました:', result);
      } else {
        console.error('記録に失敗しました:', response.statusText);
      }
    } catch (error) {
      console.error('サーバーへの接続に失敗しました:', error);
    }
  };

  const handleTimerEnd = () => {
    setIsActive(false); 

    let nextSessionType: SessionType;
    let nextMinutes: number;
    let newSessionCount = sessionCount;

    if (currentSessionType === SessionType.Work || currentSessionType === SessionType.Stopped) { // 作業中または停止中からの終了
      
      newSessionCount++;
      setSessionCount(newSessionCount);
      if (newSessionCount % sessionsBeforeLongBreak === 0) {
        nextSessionType = SessionType.LongBreak;
        nextMinutes = longBreakMinutesConfig;
      } else {
        nextSessionType = SessionType.ShortBreak;
        nextMinutes = shortBreakMinutesConfig;
      }
    } else { // 休憩からの終了
      nextSessionType = SessionType.Work;
      nextMinutes = workMinutesConfig;
    }

    setCurrentSessionType(nextSessionType);
    setMinutes(nextMinutes);
    setSeconds(0);
  };

  const toggleTimer = (): void => {
    const newIsActive = !isActive;
    setIsActive(newIsActive);

    if (newIsActive) {
      // タイマーを開始するとき
      if (currentSessionType === SessionType.Stopped || (minutes === workMinutesConfig && seconds === 0 && sessionCount === 0)) {
        // 停止中から再開、または完全な初期状態からの開始
        setCurrentSessionType(SessionType.Work);
        // 既にworkMinutesConfigになっている場合は不要だが、念のため
        if(minutes !== workMinutesConfig || seconds !== 0) {
             
        }
      }
    } else {
      // タイマーを停止するとき
      if(currentSessionType !== SessionType.ShortBreak && currentSessionType !== SessionType.LongBreak) {
          setCurrentSessionType(SessionType.Stopped);
      }
    }
  };

  const resetTimer = (): void => {
    if ((currentSessionType === SessionType.Work || currentSessionType === SessionType.Stopped) && (minutes !== workMinutesConfig || seconds !== 0)) {
      const studiedTime = workMinutesConfig - minutes;
      if (studiedTime > 0) {
        recordStudyTime(studiedTime);
      }
    }
    setIsActive(false);
    setCurrentSessionType(SessionType.Work); // リセット時は必ず「作業中」表示の準備
    setMinutes(workMinutesConfig);
    setSeconds(0);
    setSessionCount(0);
  };

  const formatTime = (time: number): string => (time < 10 ? `0${time}` : String(time));

  const getSessionName = (): string => {
    return currentSessionType;
  };

  const commonButtonClasses = "w-[100px] h-[100px] rounded-full text-white text-lg font-bold flex items-center justify-center shadow-lg transition-all duration-150 ease-in-out active:scale-95 focus:outline-none";

  return (
    <div className="flex flex-col items-center ">
      <div className="text-[7rem] font-bold my-5 mb-10 text-gray-800">
        {formatTime(minutes)}:{formatTime(seconds)}
      </div>
      <p className="text-2xl mb-8 text-gray-600">
        {getSessionName()} {/* 現在のセッションタイプを表示 */}
      </p>
      <div className="flex gap-8">
        <button
          onClick={toggleTimer}
          className={`
            ${commonButtonClasses}
            ${isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}
          `}
        >
          {isActive ? '一時停止' : 'スタート'}
        </button>
        <button
          onClick={resetTimer}
          className={`
            ${commonButtonClasses}
            bg-red-500 hover:bg-red-600
          `}
        >
          終了
        </button>
      </div>
      <p className="mt-10 text-lg text-gray-500">
        完了したポモドーロ数: {sessionCount}
      </p>
    </div>
  );
};

export default Timer;