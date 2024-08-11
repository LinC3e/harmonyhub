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
import MyProfilePage from "../pages/MyProfilePage";
import ArtistsPage from "../pages/ArtistsPage";
import HomeUserPage from "../pages/HomeUserPage";
import PlayListsPage from "../pages/PlayListsPage";
import ArtistDetailPage from "../pages/ArtistDetailPage";
import PlayListDetailPage from "../pages/PlayListDetailPage";

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
                path: "home",
                element: (
                    <PrivateRoute>
                        <HomeUserPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "profile",
                element: (
                    <PrivateRoute>
                        <MyProfilePage />
                    </PrivateRoute>
                ),
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
            {
                path: "artists",
                element: (
                    <PrivateRoute>
                        <ArtistsPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "artists/:id",
                element: (
                    <PrivateRoute>
                        <ArtistDetailPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "playlists",
                element: (
                    <PrivateRoute>
                        <PlayListsPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "playlists/:id",
                element: (
                    <PrivateRoute>
                        <PlayListDetailPage />
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