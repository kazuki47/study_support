import { useEffect, useState } from "react";
import Link from "next/link.js";
import { useRouter } from "next/router";
type folderData = {
  id: number[];
  question: string[];
    answer: string[];
};

export default function Getall() {
    const router = useRouter();
  const [card, setCard] = useState<folderData>({ id: [], question: [] , answer: [] });

  const Click =  (id: number) => {
    router.push({
        pathname: "/anki/folder/folder",
        query: { id: id }
        });
  };

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/learn/getall", {
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
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8, color: "black" }}>
      
      <div >
        <Link href={{pathname: "/anki/card_put/folder",query: { id: router.query.id} }} >
          カード登録ページ
        </Link>
      </div>
      <div>
  {Array.isArray(card.question) &&
    card.question.map((item, idx) => (
      <button  onClick={() => Click(card.id[idx])}>
        {item}
      </button>
    ))}
</div>
    </div>
  );
}