import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";

// PAGES
import HomePages from "../pages/HomePages";
import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NotFound";
import SongsPage from "../pages/SongsPage";
import SongDetailPage from "../pages/SongDetailPage";
import AlbumPage from "../pages/AlbumPage";

const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true, //path: "/",
                element: <HomePages />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "songs",
                element: (
                    <PrivateRoute>
                        <SongsPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "songs/:id",
                element: (
                    <PrivateRoute>
                        <SongDetailPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "albums",
                element: (
                    <PrivateRoute>
                        <AlbumPage />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export { Router };