import * as React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Header } from '../../components/Header';
import Timer from '../../components/Timer';
import { Button } from '@mui/material';

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
            <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                    <Link href="/pomodoro_timer/time">
                        <Button variant="outlined">学習時間</Button>
                    </Link>
                </div>
                
                <main className="flex align-center justify-center items-center text-center mt-20 mb-20">
                    <Timer />
                </main>
            </div>
        </div>
    );
}