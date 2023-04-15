import React from "react";
import Header from "./components/Header";

export default function loading() {
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex felx-wrap justify-center">
        {Array(15).map((n) => {
          return (
            <div
              key={n}
              className="animate-pulse  gap-2 bg-slate-200 w-64 h-72 rounded overflow-hidden border cursor-pointer"
            ></div>
          );
        })}
      </div>
    </main>
  );
}
