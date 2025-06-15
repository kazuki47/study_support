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
      <Header />
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 24,  borderRadius: 8, color: "black" }}>
      
      <div >
        <Link href="/anki/folder" className="m-10 inline-block px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          フォルダ作成ページ
        </Link>
      </div>
      <div className="flex flex-col">
  {Array.isArray(folder.folder) &&
    folder.folder.map((item, idx) => (
      <button
  className="px-4 py-2 bg-yellow-200 text-gray-800 rounded shadow hover:bg-yellow-300 transition m-2 flex items-center gap-2 border border-yellow-400"
  key={folder.id[idx]}
  onClick={() => Click(folder.id[idx])}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-yellow-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
    />
  </svg>
  {item}
</button>
    ))}
</div>
    </div>
    </div>
  );
}