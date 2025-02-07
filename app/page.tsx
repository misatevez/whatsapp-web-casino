"use client";

import { Button } from "@/components/ui/button";
import { Phone, Shield } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#111b21]">
      {/* Header */}
      <header className="bg-[#202c33] py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp Logo"
              width={40}
              height={40}
            />
            <span className="text-white text-2xl font-semibold">WhatsApp Web</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-8">
            Use WhatsApp on your computer
          </h1>
          <div className="bg-[#202c33] p-8 rounded-lg shadow-lg mb-8">
            <p className="text-[#aebac1] text-lg mb-8">
              Experience WhatsApp directly from your browser. Send and receive messages
              without keeping your phone online.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                onClick={() => router.push("/admin")}
                className="bg-[#00a884] hover:bg-[#02906f] text-white px-8 py-6 text-lg flex items-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Login as Admin
              </Button>
              <Button
                onClick={() => router.push("/chat")}
                className="bg-[#00a884] hover:bg-[#02906f] text-white px-8 py-6 text-lg flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Login with Phone
              </Button>
            </div>
          </div>
          
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-[#202c33] p-6 rounded-lg">
              <h3 className="text-[#00a884] text-xl font-semibold mb-4">Easy Access</h3>
              <p className="text-[#aebac1]">
                Access your chats instantly from any browser
              </p>
            </div>
            <div className="bg-[#202c33] p-6 rounded-lg">
              <h3 className="text-[#00a884] text-xl font-semibold mb-4">Sync Chats</h3>
              <p className="text-[#aebac1]">
                Your messages sync seamlessly across all devices
              </p>
            </div>
            <div className="bg-[#202c33] p-6 rounded-lg">
              <h3 className="text-[#00a884] text-xl font-semibold mb-4">Secure</h3>
              <p className="text-[#aebac1]">
                End-to-end encryption for your privacy
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}