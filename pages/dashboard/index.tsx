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
    <div>
    <Header />
  <h2>ダッシュボードへようこそ</h2>
    <div>
        <div><div>ここではポモドーロタイマーのアプリケーションが使えます</div><Link href="/pomodoro_timer">ポモドーロタイマー</Link></div>
        <div><div>ここでは暗記アプリケーションが使えます</div><Link href="/anki">暗記</Link></div>
    </div>
  </div>
);
}