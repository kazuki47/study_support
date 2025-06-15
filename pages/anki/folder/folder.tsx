import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Header } from '../../../components/Header';


export default function Folder() {

    const router = useRouter();
    const { id} = router.query;
    
    
  
    return (
       <div className="flex flex-col gap-4 my-4">
  <Link
    href={{ pathname: "/anki/card/folder", query: { id: id } }}
    className="flex items-center px-4 py-3 bg-white border border-blue-300 rounded-lg shadow hover:bg-blue-50 transition text-blue-700 font-semibold"
  >
    <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
      <rect width="18" height="14" x="3" y="4" rx="2" stroke="currentColor" />
    </svg>
    登録カード一覧
  </Link>
  <Link
    href={{ pathname: "/anki/game/folder", query: { id: id } }}
    className="flex items-center px-4 py-3 bg-blue-500 border border-blue-600 rounded-lg shadow hover:bg-blue-600 transition text-white font-semibold"
  >
    <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7M5 5v14" />
    </svg>
    ゲーム開始
  </Link>
</div>
    );
  }