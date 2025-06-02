import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 仮のバリデーション
    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください。");
      return;
    }
    setError("");
   
    
    try {
        const res = await fetch("http://localhost:5000/account/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({"mail": email, "pas": password}),
        });

        if (!res.ok) {
            console.error("Error: Failed to fetch data from API");
            return;
        }

        const result = await res.json();

        console.log("API Responseda:", result.message);

        if (result.msg === "ok") {
            alert("ログインしました！");
            router.push({
              pathname: "/dashboard"
          });
            
        } else {
            setError("メールアドレスまたはパスワードが間違っています。");
        }

        
    } catch (error) {
        console.error("Error occurred:", error);
    }


   
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8,color: "black" }}>
        <Link href="/signup" style={{ textAlign: "center", marginBottom: 24 }}>新規登録</Link>
        <Link href="/login/logout" style={{ textAlign: "center", marginBottom: 24 }}>ログアウト</Link>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>
            メールアドレス<br />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: "100%", padding: 8, marginTop: 4 }}
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
              style={{ width: "100%", padding: 8, marginTop: 4 }}
              required
            />
          </label>
        </div>
        {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
        <button type="submit" style={{ width: "100%", padding: 10 }}>ログイン</button>
      </form>
    </div>
  );
};

export default Login;