import { Outlet } from "react-router-dom";
import { AuthProvider } from "../hooks/authContext";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/footer";
import GlobalSongCard from "../components/app/GlobalCardSong";

export default function Layout() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        <Header className="w-2/5 min-w-max" />
        <div className="flex flex-col flex-grow">
          <div className="flex-grow">
            <Outlet />
            <Footer className="flex-shrink-0" />
          </div>
        </div>
      </div>
      <GlobalSongCard />
    </AuthProvider >
  );
}