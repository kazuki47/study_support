import {useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Header } from '../../components/Header';

export default function Create() {
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


return(
  <div className="text-black ">
    <Header />
    <h2 className="mt-20 font-bold text-2xl">ダッシュボードへようこそ</h2>
      <div style={{ maxWidth: 1000, margin: "100px auto", padding: 24, textAlign: "center", flexDirection: "row", display: "flex", gap: "20px", justifyContent: "center" }}>
          <div>
            <div>ここではポモドーロタイマーのアプリケーションが使えます<br /></div>
            <Link href="/pomodoro_timer" className="inline-block px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">↳ポモドーロタイマー</Link>
          </div>
          <div>
            <div>ここでは暗記アプリケーションが使えます</div>
            <Link href="/anki" className="inline-block px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">↳暗記</Link>
          </div>
      </div>
  </div>
);
}