import Header from "./Header";
import Unibody from "./Unibody";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-cyan-700 via-cyan-950 to-black min-h-screen ">
      {/* header  */}
      <Header />
      <Unibody />
    </div>
  );
}
