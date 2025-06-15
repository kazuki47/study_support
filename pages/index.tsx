import * as React from "react";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import Button from '@mui/material/Button';
import { Header } from "../components/Header";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DescriptionIcon from '@mui/icons-material/Description';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <Header />
      <main className="items-center justify-items-center text-center text-black ">
        <div className="text-4xl font-bold mt-28 mb-14">本アプリはあなたの学習をサポートします</div>
        <div className="text-2xl font-bold mb-10">アプリ内容</div>
        <div className="text-xl font-bold mb-6">ポモドーロタイマー</div>
        <div className="flex max-w-4xl mb-5">
          <AccessTimeFilledIcon className="text-6xl mb-4 mx-auto" sx={{fontSize: 80}}/>
          <div className="text-lg text-black mt-4 ml-4">
            ポモドーロタイマーは、集中力を高めるための時間管理ツールです。<br></br>25分間の集中作業と5分間の休憩を繰り返すことで、効率的な学習をサポートします。
          </div>
        </div>
        <div className="text-xl font-bold mb-6">暗記アプリ</div>
        <div className="flex max-w-4xl mb-5">
          <DescriptionIcon className="text-6xl mb-4 mx-auto" sx={{fontSize: 80}}/>
          <div className="text-lg text-black mt-4 ml-4">
            問題と答えの二面でカードを作り、効率的に暗記を行うことができます。<br></br>自分のペースで学習を進めることができ、復習も簡単です。
          </div>
        </div>
        <div className="mb-10">
          <div className="text-2xl font-bold mb-6">アプリを使うにはこちらから</div>
          <Link href="/login">
            <Button variant="outlined">ログイン</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
