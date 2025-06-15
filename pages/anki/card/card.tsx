import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Header } from '../../../components/Header';


export default function Getone() {
    const [editMode, setEditMode] = useState(false);
const [editQuestion, setEditQuestion] = useState("");
const [editAnswer, setEditAnswer] = useState("");

    const router = useRouter();


    const Cardedit = async (id: number, question: string, answer: string) => {
      try { 
        const res = await fetch("http://localhost:5000/learn/editcard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ "card_id":router.query.id,"afterq": question, "aftera": answer })
        });

        if (!res.ok) {
          console.error("Error: Failed to edit card");
          return;
        }

        const result = await res.json();
        if (result.msg === "ok") {
          alert("カードが更新されました");
          setEditMode(false);
          fetchData(); // 更新後にデータを再取得
        } else {
          alert("カードの更新に失敗しました");
        }
      }
        catch (error) {
            console.error("Error occurred:", error);
            alert("カードの更新中にエラーが発生しました");
        }
    }

    const Carddel = async (id: number) => {
      try { 
        const res = await fetch("http://localhost:5000/learn/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ "card_id": id })
        });

        if (!res.ok) {
          console.error("Error: Failed to delete card");
          return;
        }

        const result = await res.json();
        if (result.msg === "ok") {
          alert("カードが削除されました");
          router.push("/anki/folder"); // 削除後にフォルダページにリダイレクト
        } else {
          alert("カードの削除に失敗しました");
        }
      }
        catch (error) {
            console.error("Error occurred:", error);
            alert("カードの削除中にエラーが発生しました");
        }
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
 const [id, setId] = useState<number>(0);
 const [question, setQuestion] = useState<string>("");
const [answer, setAnswer] = useState<string>("");


  // Fetch data from the API
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/learn/getone", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "card": router.query.id })
      });

      if (!res.ok) {
        console.error("Error: Failed to fetch data from API");
        return;
      }

      const result = await res.json();
      setId(result.id);
        setQuestion(result.question);
        setAnswer(result.answer);
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
  <Header />
  <h1
    style={{
      fontSize: 28,
      fontWeight: 700,
      textAlign: "center",
      marginBottom: 32,
      letterSpacing: 1,
    }}
  >
    カード詳細
  </h1>
  {!editMode ? (
    <>
      <div
        style={{
          background: "#f3f4f6",
          borderRadius: 10,
          padding: 24,
          marginBottom: 32,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <p style={{ fontSize: 18, marginBottom: 16 }}>
          <strong style={{ color: "#2563eb" }}>質問:</strong> {question}
        </p>
        <p style={{ fontSize: 18 }}>
          <strong style={{ color: "#059669" }}>回答:</strong> {answer}
        </p>
      </div>
      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        <button
          onClick={() => {
            setEditMode(true);
            setEditQuestion(question);
            setEditAnswer(answer);
          }}
          style={{
            padding: "12px 32px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseOver={e => ((e.target as HTMLButtonElement).style.background = "#1d4ed8")}
          onMouseOut={e => ((e.target as HTMLButtonElement).style.background = "#2563eb")}
        >
          編集
        </button>
        <button
          onClick={() => {
            Carddel(id);
          }}
          style={{
            padding: "12px 32px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            boxShadow: "0 2px 8px rgba(239,68,68,0.08)",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseOver={e => ((e.target as HTMLButtonElement).style.background = "#b91c1c")}
          onMouseOut={e => ((e.target as HTMLButtonElement).style.background = "#ef4444")}
        >
          削除
        </button>
      </div>
    </>
  ) : (
    <form
      onSubmit={e => {
        e.preventDefault();
        Cardedit(id, editQuestion, editAnswer);
      }}
      style={{
        marginTop: 20,
        background: "#f9fafb",
        borderRadius: 10,
        padding: 24,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <label htmlFor="edit-question" style={{ fontWeight: 500, fontSize: 15 }}>
          質問
          <input
            id="edit-question"
            type="text"
            value={editQuestion}
            onChange={e => setEditQuestion(e.target.value)}
            style={{
              width: "100%",
              marginTop: 8,
              marginBottom: 10,
              padding: "10px 12px",
              border: "1px solid #d1d5db",
              borderRadius: 6,
              fontSize: 15,
              outline: "none",
              boxSizing: "border-box",
              transition: "border 0.2s",
            }}
            placeholder="質問を入力してください"
            required
            onFocus={e => ((e.target as HTMLInputElement).style.border = "1.5px solid #2563eb")}
            onBlur={e => ((e.target as HTMLInputElement).style.border = "1px solid #d1d5db")}
          />
        </label>
      </div>
      <div style={{ marginBottom: 24 }}>
        <label htmlFor="edit-answer" style={{ fontWeight: 500, fontSize: 15 }}>
          回答
          <input
            id="edit-answer"
            type="text"
            value={editAnswer}
            onChange={e => setEditAnswer(e.target.value)}
            style={{
              width: "100%",
              marginTop: 8,
              marginBottom: 10,
              padding: "10px 12px",
              border: "1px solid #d1d5db",
              borderRadius: 6,
              fontSize: 15,
              outline: "none",
              boxSizing: "border-box",
              transition: "border 0.2s",
            }}
            placeholder="回答を入力してください"
            required
            onFocus={e => ((e.target as HTMLInputElement).style.border = "1.5px solid #2563eb")}
            onBlur={e => ((e.target as HTMLInputElement).style.border = "1px solid #d1d5db")}
          />
        </label>
      </div>
      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        <button
          type="submit"
          style={{
            padding: "12px 32px",
            backgroundColor: "#2563eb",
            color: "white",
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
          保存
        </button>
        <button
          type="button"
          onClick={() => setEditMode(false)}
          style={{
            padding: "12px 32px",
            backgroundColor: "#6b7280",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(107,114,128,0.08)",
            transition: "background 0.2s",
          }}
          onMouseOver={e => ((e.target as HTMLButtonElement).style.background = "#374151")}
          onMouseOut={e => ((e.target as HTMLButtonElement).style.background = "#6b7280")}
        >
          キャンセル
        </button>
      </div>
    </form>
  )}
</div>
// ...existing code...
  );
}