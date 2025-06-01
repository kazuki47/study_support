import { useRouter } from "next/router";

export default function Folder() {

    const router = useRouter();
    const { id} = router.query;

    if (!id) {
        return <div>Loading...</div>;
      }
  
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4 text-black">結果表示</h1>
        <p className="text-black" >結果url: {id}</p>
      </div>
    );
  }