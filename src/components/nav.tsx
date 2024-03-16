import Image from "next/image";
import { useState } from "react";

export default function Nav() {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-primary text-white grid grid-cols-3 justify-between p-4 px-8">
      <Image
        src="/logo.jpeg"
        alt="Menu Icon"
        width={50}
        height={50}
        className="rounded-full"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for files by date, place, or name"
        className="bg-gray-800 py-3 px-2 text-white rounded-lg"
      />

      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngDLxVdX-4fhpWyG8hDPxUWyGV1B9uOXJ3Q&usqp=CAU"
        alt="avatar"
        width={50}
        height={50}
        className="!rounded-full ml-auto shadow-md"
      />
    </div>
  );
}
