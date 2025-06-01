import { useEffect, useState } from "react";
import Link from "next/link.js";
import { useRouter } from "next/router";
type folderData = {
  id: number[];
  folder: string[];
};

export default function Blog() {
    const router = useRouter();
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
      const res = await fetch("http://127.0.0.1:5000/learn/getfolder", {
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
    fetchData();
  }, []);

  return (
    <div>
      
      <div >
        <Link href="/anki/folder" >
          フォルダ作成ページ
        </Link>
      </div>
      <div >
        {folder.folder.map((item, idx) => (
          <button key={folder.id[idx]} onClick={() => Click(folder.id[idx])}>
            {item}
          </button>
        ))}
        </div>
    </div>
  );
}