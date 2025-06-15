import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Header } from '../../../components/Header';

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
    // ...existing code...
     <div>
      <Header />
      <div
        style={{
          maxWidth: 400,
          margin: "40px auto",
          padding: 32,
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          background: "#fff",
          boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
          color: "#222",
        }}
      >
        <Link
          href="/anki"
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: 28,
            color: "#2563eb",
            fontWeight: 600,
            textDecoration: "none",
            fontSize: 16,
            letterSpacing: 1,
            transition: "color 0.2s",
          }}
          onMouseOver={e =>
            ((e.target as HTMLAnchorElement).style.color = "#1d4ed8")
          }
          onMouseOut={e =>
            ((e.target as HTMLAnchorElement).style.color = "#2563eb")
          }
        >
          ← フォルダ一覧へ
        </Link>
        <h2
          style={{
            textAlign: "center",
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 24,
            letterSpacing: 1,
          }}
        >
          フォルダ登録
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontWeight: 500, fontSize: 15 }}>
              フォルダー名
              <input
                type="text"
                value={foloder}
                onChange={e => setFoloder(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  marginTop: 8,
                  border: "1px solid #d1d5db",
                  borderRadius: 6,
                  fontSize: 15,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border 0.2s",
                }}
                required
                onFocus={e =>
                  ((e.target as HTMLInputElement).style.border =
                    "1.5px solid #2563eb")
                }
                onBlur={e =>
                  ((e.target as HTMLInputElement).style.border =
                    "1px solid #d1d5db")
                }
              />
            </label>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px 0",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 16,
              letterSpacing: 1,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
              transition: "background 0.2s",
            }}
            onMouseOver={e =>
              ((e.target as HTMLButtonElement).style.background = "#1d4ed8")
            }
            onMouseOut={e =>
              ((e.target as HTMLButtonElement).style.background = "#2563eb")
            }
          >
            新規登録
          </button>
        </form>
      </div>
    </div>
// ...existing code...
  );
};

export default Makefolder;