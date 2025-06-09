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

 

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/learn/get", {
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
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8, color: "black" }}>
    
      <div >
        
      </div>
      <div>
  {Array.isArray(card.question) &&
    card.question.map((item, idx) => (
      <div>
        {item}
        </div>
      
    ))}
</div>
    </div>
  );
}