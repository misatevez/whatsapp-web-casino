"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      router.push("/chat");
    }
  };

  return (
    <div className="min-h-screen bg-[#111b21] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#202c33] rounded-lg p-6 sm:p-8">
        <div className="flex justify-center mb-6">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            width={80}
            height={80}
            priority
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+54 9 11 1234 5678"
            className="bg-[#2a3942] border-none text-[#e9edef] placeholder:text-[#8696a0] h-12 text-center"
          />

          <Button
            type="submit"
            className="w-full bg-[#00a884] hover:bg-[#02906f] text-white h-12 font-normal text-lg"
          >
            Ingresar
          </Button>
        </form>
      </div>
    </div>
  );
}