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
    const router = useRouter();
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

  const Click =  (id: number) => {
    router.push({
        pathname: "/anki/card/card",
        query: { id: id }
        });
  };

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/learn/getall", {
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
  <div style={{ marginBottom: 32 }}>
    <Link
      href={{ pathname: "/anki/card_put/folder", query: { id: router.query.id } }}
      style={{
        display: "inline-block",
        padding: "10px 24px",
        background: "#2563eb",
        color: "#fff",
        borderRadius: 6,
        fontWeight: 600,
        fontSize: 16,
        textDecoration: "none",
        boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
        transition: "background 0.2s",
      }}
      onMouseOver={e => ((e.target as HTMLAnchorElement).style.background = "#1d4ed8")}
      onMouseOut={e => ((e.target as HTMLAnchorElement).style.background = "#2563eb")}
    >
      ＋ カード登録ページ
    </Link>
  </div>
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 16,
      justifyContent: "flex-start",
    }}
  >
    {Array.isArray(card.question) &&
      card.question.map((item, idx) => (
        <button
          key={card.id[idx]}
          onClick={() => Click(card.id[idx])}
          style={{
            minWidth: 180,
            padding: "14px 20px",
            background: "#f3f4f6",
            color: "#222",
            border: "1px solid #d1d5db",
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 500,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            cursor: "pointer",
            transition: "background 0.2s, border 0.2s",
          }}
          onMouseOver={e => ((e.target as HTMLButtonElement).style.background = "#e0e7ef")}
          onMouseOut={e => ((e.target as HTMLButtonElement).style.background = "#f3f4f6")}
        >
          {item}
        </button>
      ))}
  </div>
</div>
// ...existing code...
  );
}