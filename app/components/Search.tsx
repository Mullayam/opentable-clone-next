"use client";
import { useRouter } from "next/navigation";

import React from "react";

const Search = () => {
  const [searchTerm, setTearchTerm] = React.useState("");
  const redirect = useRouter();
  const handleSearch = () => {
    if (searchTerm === "" || searchTerm === " ") {
      return alert("Please enter a search Term");
    }
    redirect.push(`/search?location=${searchTerm}`);
  };
  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center">
      <input
        className="rounded  mr-3 p-2 w-[450px]"
        type="text"
        placeholder="State, city or town"
        value={searchTerm}
        onChange={(e) => setTearchTerm(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="rounded bg-red-600 px-9 py-2 text-white"
      >
        Let's go
      </button>
    </div>
  );
};

export default Search;
