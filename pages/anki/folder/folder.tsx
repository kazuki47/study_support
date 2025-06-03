import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Header } from '../../../components/Header';


export default function Folder() {

    const router = useRouter();
    const { id} = router.query;
    
    
  
    return (
        <div>
<Header />
        
      <div className="p-4">
        <Link href={{pathname: "/anki/card/folder",query: { id: id} }} className="text-blue-500 hover:underline mb-4 block">登録カード一覧</Link>
        <Link href={{pathname: "/anki/game",query: { id: id} }} className="text-blue-500 hover:underline mb-4 block">ゲーム開始</Link>
      </div>
      </div>
    );
  }