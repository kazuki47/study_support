import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Makefolder = () => {
  const [foloder, setFoloder] = useState("");
  
  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!foloder) {
      alert("全ての項目を入力してください。");
      return;
    }
    
    // ここでサインアップ処理を実装
    try {
        const res = await fetch("http://localhost:5000/learn/folder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({"folder": foloder }),
        });

        if (!res.ok) {
            console.error("Error: Failed to fetch data from API");
            return;
        }

        const result = await res.json();

        console.log("API Responseda:", result.msg);
        if (result.msg === "ok") {
            alert("フォルダを追加しました");
            router.push({
              pathname: "/anki"
          });
            
            
        }

        
    } catch (error) {
        console.error("Error occurred:", error);
    }


    
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8,color: "black"  }}>
      <Link href="/anki" style={{ textAlign: "center", marginBottom: 24 }}>ファルダ一覧へ</Link>
      <h2>フォルダ登録</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
            <label>
                フォルダー名<br />
                <input
                type="text"
                value={foloder}
                onChange={e => setFoloder(e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
                required
                />
            </label>
         

            
        </div>
        
        <button type="submit" style={{ width: "100%", padding: 10 }}>新規登録</button>
      </form>
    </div>
  );
};

export default Makefolder;