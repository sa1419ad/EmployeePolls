import { Outlet } from "react-router-dom";

import Nav from "./Nav";

export default function RootLayout() {
  return (
    <div>
      <Nav />
      <main className="container max-w-2xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
