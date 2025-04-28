import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { serverUrl } from "utils/serverUrl";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader(){
  try {
    const req = await fetch(serverUrl + "/token/", {
      method: "GET",
      mode:"cors",
      headers: {
        'Content-Type':'application/json'
      }
    })
    const response = await req.json()
    console.log(response);
    return response
    
  } catch (error) {
    return {error}
  }
  
}

export default function Home() {
  return <Welcome />;
}
