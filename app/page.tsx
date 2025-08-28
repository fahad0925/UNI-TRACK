import Header from "./Header";
import Unibody from "./Unibody";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-blue-950 to-black/70 min-h-screen ">
      {/* header  */}
      <Header />
      <Unibody />
    </div>
  );
}
