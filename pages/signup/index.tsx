import React, { useState } from "react";
import Link from "next/link";
import { Header } from '../../components/Header';

const Signup = () => {
  const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async(e: React.FormEvent) => {

    e.preventDefault();
    if (!user||!email || !password || !confirm) {
      setError("全ての項目を入力してください。");
      return;
    }
    if (password !== confirm) {
      setError("パスワードが一致しません。");
      return;
    }
    setError("");
    // ここでサインアップ処理を実装
    try {
        const res = await fetch("http://127.0.0.1:5000/account/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
           
            body: JSON.stringify({"name": user,"mail":email, "pas": password}),
        });

        if (!res.ok) {
            console.error("Error: Failed to fetch data from API");
            return;
        }

        const result = await res.json();

        console.log("API Responseda:", result.msg);
        if (result.msg === "ok") {
            alert("サインアップしました！");
        }

        
    } catch (error) {
        console.error("Error occurred:", error);
    }


    
  };

  return (
    <div>
      <Header />
      <div style={{ maxWidth: 400, margin: "100px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8,color: "black"  }}>
        <Link href="/login" style={{ textAlign: "center", marginBottom: 24 }}>ログインへ戻る</Link>
        <h2 style={{ textAlign: "center" }}>新規登録</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
              <label>
                  ユーザー名<br />
                  <input
                  type="text"
                  value={user}
                  onChange={e => setUser(e.target.value)}
                  style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 4, border: "1px solid #ccc" }}
                  required
                  />
              </label>
            <label>

              メールアドレス<br />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 4, border: "1px solid #ccc" }}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>
              パスワード<br />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 4, border: "1px solid #ccc" }}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>
              パスワード（確認）<br />
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 4, border: "1px solid #ccc" }}
                required
              />
            </label>
          </div>
          {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
          <button type="submit" style={{ width: "100%", padding: 10, marginTop: 40, borderRadius: 4, border: "1px solid #ccc", cursor: "pointer" }}>新規登録</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;