import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Navbar from "~/components/Navbar";
import { Outlet } from "react-router";
import Footer from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Exploration App" },
    { name: "description", content: "Welcome to exploration!" },
  ];
}

export default function Layout() {
  return (<>
  <Navbar/>
  <Outlet/>
  <Footer/>
  </>);
}
