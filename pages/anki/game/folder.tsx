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
  const [cid,setCid] = useState<number>(0);
  const [boolean, setBoolean] = useState<boolean>(false);
    const router = useRouter();
  const seikai = async (id: number) => {
    try {
      const res = await fetch("http://localhost:5000/learn/in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ "card_id": id,"ydata":"7" })
      });

      if (!res.ok) {
        console.error("Error: Failed to mark as correct");
        return;
      }

      const result = await res.json();
      if (result.msg === "ok") {
        
        setCid((cid) => cid + 1);
        setBoolean(false);
      } else {
        alert("正解の更新に失敗しました");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("正解の更新中にエラーが発生しました");
    }
  }
  const fuseikai = async (id: number) => {
    try {
      const res = await fetch("http://localhost:5000/learn/in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ "card_id": id ,"ydata":"1"})
      });

      if (!res.ok) {
        console.error("Error: Failed to mark as incorrect");
        return;
      }

      const result = await res.json();
      if (result.msg === "ok") {
        
        setCid((cid) => cid + 1);
        setBoolean(false);
      } else {
        alert("不正解の更新に失敗しました");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("不正解の更新中にエラーが発生しました");
    }
  }
  
  const shuryou = () => {
    router.push({
      pathname: "/anki"
    });
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
    {card.id[cid] == null ? (
  <div style={{ textAlign: "center", marginTop: 32 }}>
    <div>全ての問題が終了しました</div>
    <button onClick={() => shuryou()}>終了</button>
  </div>
) : (
  <div>
    <div>
      <div>質問</div>
      <div>{card.question[cid]}</div>
    </div>
    <div>
      {boolean ? (
        <div>
          <div>回答</div>
          <div>{card.answer[cid]}</div>
          <button onClick={() => seikai(card.id[cid])}>あってた</button>
          <button onClick={() => fuseikai(card.id[cid])}>間違ってた</button>
        </div>
      ) : (
        <div>
          <div>回答を表示しますか？</div>
          <button onClick={() => setBoolean(true)}>回答を見る</button>
        </div>
      )}
    </div>
  </div>
)}
    </div>
  );
}