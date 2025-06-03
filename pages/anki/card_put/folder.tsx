import React, { useState } from "react";
import { useRouter } from "next/router";
import { Header } from '../../../components/Header';

const Cardput = () => {
    const router = useRouter();
  const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
  
  

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question || !answer) {
      alert("全ての項目を入力してください。");
      return;
    }
    
    
    // ここでサインアップ処理を実装
    try {
        const res = await fetch("http://localhost:5000/learn/makecard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({"question": question, "answer": answer, "fid": router.query.id }),
        });

        if (!res.ok) {
            console.error("Error: Failed to fetch data from API");
            return;
        }

        const result = await res.json();

        console.log("API Responseda:", result.msg);
        if (result.msg === "ok") {
            alert("カードを追加しました");
            router.push({
                pathname: "/anki/card/folder",
                query: { id: router.query.id }
                });
        }

        
    } catch (error) {
        console.error("Error occurred:", error);
    }


    
  };

  return (
    <div>
      <Header />
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8,color: "black"  }}>
      <h2>新規登録</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
            <label>
                質問<br />
                <input
                type="text"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
                required
                />
            </label>
          <label>

            答え<br />
            <input
              type="text"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              style={{ width: "100%", padding: 8, marginTop: 4 }}
              required
            />
          </label>
        </div>
        
       
   
        <button type="submit" style={{ width: "100%", padding: 10 }}>新規登録</button>
      </form>
    </div>
    </div>
  );
};

export default Cardput;