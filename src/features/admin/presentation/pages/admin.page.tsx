import { useState } from "react";
import { FaBars } from "react-icons/fa";

export function Admin() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div className={"h-screen relative bg-primary"}>
        <FaBars
          className="relative cursor-pointer text-white top-4 -right-56"
          onClick={() => setOpen(!open)}
        ></FaBars>
      </div>
      <div className="bg-red-100 h-screen p-3 flex-1">
        <h1>Orders</h1>
      </div>
    </div>
  );
}
