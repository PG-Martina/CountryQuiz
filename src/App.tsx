import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import RoomInit from "./pages/RoomInit/RoomInit";
import Room from "./pages/Room/Room";

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/room/:roomID", element: <Room /> },
        { path: "/createRoom", element: <RoomInit /> },
        { path: "/joinRoom", element: <RoomInit /> },
        { path: "/roomSetup" },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
