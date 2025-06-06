import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Header } from '../../components/Header';

const Logout = () => {
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
    
        useEffect(() => {
          Loginchek();
         }, []);
   

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 仮のバリデーション
    
   
    
    try {
        const res = await fetch("http://localhost:5000/account/logout", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        if (!res.ok) {
            console.error("Error: Failed to fetch data from API");
            return;
        }

        const result = await res.json();

        console.log("API Responseda:", result.msg);

        if (result.msg === "ok") {
            alert("ログアウトしました");
            router.push({
              pathname: "/login"
          });
            
        } 

        
    } catch (error) {
        console.error("Error occurred:", error);
    }


   
  };

  return (
    <div>
      <Header />
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8,color: "black" }}>
       
      <h2>ログアウト</h2>
      
        
        <button onClick={handleSubmit} style={{ width: "100%", padding: 10 }}>ログアウト</button>
     
    </div>
    </div>
  );
};

export default Logout;