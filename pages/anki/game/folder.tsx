import { useEffect, useState } from "react";
import Link from "next/link.js";
import { useRouter } from "next/router";
import { Header } from '../../../components/Header';
type folderData = {
  id: number[];
  question: string[];
    answer: string[];
};

export default function Getall() {
  const [cid,setCid] = useState<number>(0);
  const [boolean, setBoolean] = useState<boolean>(false);
    const router = useRouter();
  const seikai = async (id: number) => {
    try {
      const res = await fetch("http://localhost:5000/learn/in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ "card_id": id,"ydata":"7" })
      });

      if (!res.ok) {
        console.error("Error: Failed to mark as correct");
        return;
      }

      const result = await res.json();
      if (result.msg === "ok") {
        
        setCid((cid) => cid + 1);
        setBoolean(false);
      } else {
        alert("正解の更新に失敗しました");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("正解の更新中にエラーが発生しました");
    }
  }
  const fuseikai = async (id: number) => {
    try {
      const res = await fetch("http://localhost:5000/learn/in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ "card_id": id ,"ydata":"1"})
      });

      if (!res.ok) {
        console.error("Error: Failed to mark as incorrect");
        return;
      }

      const result = await res.json();
      if (result.msg === "ok") {
        
        setCid((cid) => cid + 1);
        setBoolean(false);
      } else {
        alert("不正解の更新に失敗しました");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("不正解の更新中にエラーが発生しました");
    }
  }
  
  const shuryou = () => {
    router.push({
      pathname: "/anki"
    });
  }
  




     const Loginchek = async () => {
      try {
        const res = await fetch("http://localhost:5000/account/loginnow", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        

        const re = await res.json();
        console.log("con:",re.msg);
        if(re.msg==="yes"){
          
        }
        else{
             alert("ログインしてません");

          router.push({
            pathname: "/login"
        });
        }

        




    } catch (error) {
         alert("バックエンドとの通信エラーです");
      router.push({
        pathname: "/login"
    });
    }
    };
  const [card, setCard] = useState<folderData>({ id: [], question: [] , answer: [] });
  
 

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/learn/get", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "id": router.query.id })
      });

      if (!res.ok) {
        console.error("Error: Failed to fetch data from API");
        return;
      }

      const result = await res.json();
      setCard(result);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  // useEffectでfetchDataを呼び出す
  useEffect(() => {
    Loginchek();
    fetchData();
  }, []);

  return (
    // ...existing code...
<div
  style={{
    maxWidth: 800,
    margin: "40px auto",
    padding: 32,
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    background: "#fff",
    boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
    color: "#222",
  }}
>
  {card.id[cid] == null ? (
    <div style={{ textAlign: "center", marginTop: 64 }}>
      <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 24 }}>
        全ての問題が終了しました
      </div>
      <button
        onClick={() => shuryou()}
        style={{
          padding: "14px 40px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 18,
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
          transition: "background 0.2s",
        }}
        onMouseOver={e => ((e.target as HTMLButtonElement).style.background = "#1d4ed8")}
        onMouseOut={e => ((e.target as HTMLButtonElement).style.background = "#2563eb")}
      >
        終了
      </button>
    </div>
  ) : (
    <div>
      <div
        style={{
          background: "#f3f4f6",
          borderRadius: 10,
          padding: 28,
          marginBottom: 32,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ fontSize: 18, color: "#2563eb", fontWeight: 600, marginBottom: 8 }}>
          質問
        </div>
        <div style={{ fontSize: 20, fontWeight: 500 }}>{card.question[cid]}</div>
      </div>
      <div
        style={{
          background: "#f9fafb",
          borderRadius: 10,
          padding: 24,
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          textAlign: "center",
        }}
      >
        {boolean ? (
          <div>
            <div style={{ fontSize: 17, color: "#059669", fontWeight: 600, marginBottom: 8 }}>
              回答
            </div>
            <div style={{ fontSize: 19, fontWeight: 500, marginBottom: 24 }}>{card.answer[cid]}</div>
            <button
              onClick={() => seikai(card.id[cid])}
              style={{
                padding: "12px 28px",
                background: "#22c55e",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 16,
                marginRight: 16,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(34,197,94,0.08)",
                transition: "background 0.2s",
              }}
              onMouseOver={e => ((e.target as HTMLButtonElement).style.background = "#16a34a")}
              onMouseOut={e => ((e.target as HTMLButtonElement).style.background = "#22c55e")}
            >
              あってた
            </button>
            <button
              onClick={() => fuseikai(card.id[cid])}
              style={{
                padding: "12px 28px",
                background: "#ef4444",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(239,68,68,0.08)",
                transition: "background 0.2s",
              }}
              onMouseOver={e => ((e.target as HTMLButtonElement).style.background = "#b91c1c")}
              onMouseOut={e => ((e.target as HTMLButtonElement).style.background = "#ef4444")}
            >
              間違ってた
            </button>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 17, fontWeight: 500, marginBottom: 18 }}>
              回答を表示しますか？
            </div>
            <button
              onClick={() => setBoolean(true)}
              style={{
                padding: "12px 32px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
                transition: "background 0.2s",
              }}
              onMouseOver={e => ((e.target as HTMLButtonElement).style.background = "#1d4ed8")}
              onMouseOut={e => ((e.target as HTMLButtonElement).style.background = "#2563eb")}
            >
              回答を見る
            </button>
          </div>
        )}
      </div>
    </div>
  )}
</div>
// ...existing code...
  );
}