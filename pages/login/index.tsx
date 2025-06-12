import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Header } from '../../components/Header';

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
    <div>
      <Header />
      <div style={{ maxWidth: 400, margin: "100px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8,color: "black" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
          <Link href="/signup" className="hover:text-gray-500" style={{ textAlign: "center", marginBottom: 24, justifyContent: "center", margin: "0 auto" }}>新規登録</Link>
          <Link href="/login/logout" className="hover:text-gray-500" style={{ textAlign: "center", marginBottom: 24, justifyContent: "center", margin: "0 auto" }}>ログアウト</Link>
        </div>
        <h2 className="text-center">ログイン</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label>
              メールアドレス<br />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 4 , borderRadius: 4, border: "1px solid #ccc"}}
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
                style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 4, border: "1px solid #ccc"}}
                required
              />
            </label>
          </div>
          {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
          <button className="hover:text-gray-500" type="submit" style={{ width: "40%", padding: 10, borderRadius: 4, border: "1px solid #ccc", alignContent: "center", display: "flex", justifyContent: "center", margin: "0 auto"}}>ログイン</button>
        </form>
      </div>
    </div>
  );
};

export default Login;