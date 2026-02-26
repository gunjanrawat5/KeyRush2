"use client";

import Login from "@/src/components/Login";
import TypingWindow from "@/src/components/TypingWindow";

export default function HomeClient() {
  return (
    <div>
      <Login />
      <div className="flex justify-center mt-15 3xl:mt-25">
        <TypingWindow />
      </div>
    </div>
  );
}
