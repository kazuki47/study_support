import * as React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Header } from '../../components/Header';
import Timer from '../../components/Timer';

export default function PomodoroPage() {
    const router = useRouter();
       
    
        const Logincheck = async () => {
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
          Logincheck();
         }, []);
    return (
        <div>
            <Header />
            <main>
                <Timer />
            </main>
        </div>
    );
}