import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default RootLayout;
