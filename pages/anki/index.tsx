import { useEffect, useState } from "react";
import Link from "next/link.js";
import { useRouter } from "next/router";
import { Header } from '../../components/Header';
type folderData = {
  id: number[];
  folder: string[];
};

export default function Blog() {
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
  const [folder, setFolder] = useState<folderData>({ id: [], folder: [] });

  const Click =  (id: number) => {
    router.push({
        pathname: "/anki/folder/folder",
        query: { id: id }
        });
  };

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/learn/getfolder", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.error("Error: Failed to fetch data from API");
        return;
      }

      const result = await res.json();
      setFolder(result);
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
    <div>
      
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8, color: "black" }}>
      
      <div >
        <Link href="/anki/folder" >
          フォルダ作成ページ
        </Link>
      </div>
      <div>
  {Array.isArray(folder.folder) &&
    folder.folder.map((item, idx) => (
      <button key={folder.id[idx]} onClick={() => Click(folder.id[idx])}>
        {item}
      </button>
    ))}
</div>
    </div>
    </div>
  );
}