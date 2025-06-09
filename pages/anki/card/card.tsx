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
   <div style={{ maxWidth: 800, margin: "40px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8, color: "black" }}>
    <Header />
    <h1>カード詳細</h1>
    {!editMode ? (
      <>
        <p><strong>質問:</strong> {question}</p>
        <p><strong>回答:</strong> {answer}</p>
        <button
          onClick={() => {
            setEditMode(true);
            setEditQuestion(question);
            setEditAnswer(answer);
          }}
          style={{ marginTop: 20, padding: "10px 20px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: 5 }}
        >
          編集
        </button>
        <button
          onClick={() => {Carddel(id)}}
          style={{ marginTop: 20, padding: "10px 20px", backgroundColor: "#e00", color: "white", border: "none", borderRadius: 5 }}
        >
          削除
        </button>
      </>
    ) : (
      <form
        onSubmit={e => {
          e.preventDefault();
          Cardedit(id, editQuestion, editAnswer);
          
        }}
        style={{ marginTop: 20 }}
      >
        <div>
  <label htmlFor="edit-question">質問: </label>
  <input
    id="edit-question"
    type="text"
    value={editQuestion}
    onChange={e => setEditQuestion(e.target.value)}
    style={{ width: "100%", marginBottom: 10 }}
    placeholder="質問を入力してください"
  />
</div>
<div>
  <label htmlFor="edit-answer">回答: </label>
  <input
    id="edit-answer"
    type="text"
    value={editAnswer}
    onChange={e => setEditAnswer(e.target.value)}
    style={{ width: "100%", marginBottom: 10 }}
    placeholder="回答を入力してください"
  />
</div>
        <button type="submit" style={{ marginRight: 10, padding: "10px 20px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: 5 }}>
          保存
        </button>
        <button
          type="button"
          onClick={() => setEditMode(false)}
          style={{ padding: "10px 20px", backgroundColor: "#aaa", color: "white", border: "none", borderRadius: 5 }}
        >
          キャンセル
        </button>
      </form>
    )}
  </div>
  );
}