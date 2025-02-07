"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  MoreVertical, 
  Search,
  Paperclip,
  Smile,
  ArrowRight,
  Image as ImageIcon,
  Camera,
  File,
  X,
  Check,
  Edit,
  CircleUserRound,
  ChevronDown,
  ChevronUp,
  Download,
  User,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Share2
} from "lucide-react";
import Image from "next/image";
import { chatsData } from "@/lib/data";
import EmojiPicker from 'emoji-picker-react';

interface MessagePreview {
  type: 'image' | 'document';
  name: string;
  url: string;
  size?: string;
}

interface UserProfile {
  name: string;
  image: string;
  about: string;
}

const DEFAULT_PROFILE: UserProfile = {
  name: "New User",
  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  about: "Hey there! I am using WhatsApp"
};

export default function ChatPage() {
  const router = useRouter();
  const [newMessage, setNewMessage] = useState("");
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [messagePreview, setMessagePreview] = useState<MessagePreview | null>(null);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [showMessageSearch, setShowMessageSearch] = useState(false);
  const [messageSearchTerm, setMessageSearchTerm] = useState("");
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [adminData] = useState(() => ({
    name: "WhatsApp Support",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    about: "Official WhatsApp Support",
    online: true
  }));

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    if (isFirstLoad.current) {
      scrollToTop();
      isFirstLoad.current = false;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatsData[0].messages.length]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!newMessage.trim() && !messagePreview) || !chatsData[0]) return;

    const newMsg = {
      id: chatsData[0].messages.length + 1,
      content: messagePreview ? '' : newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true,
      status: "sent" as const,
      preview: messagePreview
    };

    chatsData[0].messages.push(newMsg);
    chatsData[0].lastMessage = messagePreview ? 
      messagePreview.type === 'image' ? '📷 Photo' : `📄 ${messagePreview.name}` :
      newMessage;
    chatsData[0].time = newMsg.time;
    setNewMessage("");
    setMessagePreview(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isImage = file.type.startsWith('image/');
      const preview: MessagePreview = {
        type: isImage ? 'image' : 'document',
        name: file.name,
        url: URL.createObjectURL(file),
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      };
      setMessagePreview(preview);
      setShowAttachments(false);
    }
  };

  const handleEmojiSelect = (emojiData: any) => {
    setNewMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUserProfile(prev => ({ ...prev, image: url }));
    }
  };

  return (
    <div className="flex flex-col h-[100vh] h-[calc(var(--vh,1vh)*100)] bg-[#111b21] overflow-hidden">
      <div className="h-16 bg-[#202c33] flex items-center px-2 sm:px-4 gap-2 sm:gap-4 flex-shrink-0">
        <Avatar 
          className="h-8 w-8 sm:h-10 sm:w-10 cursor-pointer" 
          onClick={() => setShowContactInfo(true)}
        >
          <Image
            src={adminData.avatar}
            alt={adminData.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        </Avatar>
        <div 
          className="flex-1 cursor-pointer min-w-0" 
          onClick={() => setShowContactInfo(true)}
        >
          <div className="text-[#e9edef] font-medium truncate">{adminData.name}</div>
          <div className="text-xs sm:text-sm text-[#8696a0]">
            {adminData.online ? "online" : "offline"}
          </div>
        </div>
        <div className="flex gap-1 sm:gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowMessageSearch(true)}
            className="hidden sm:inline-flex"
          >
            <Search className="h-5 w-5 text-[#aebac1]" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setShowProfileSettings(true)}>
            <MoreVertical className="h-5 w-5 text-[#aebac1]" />
          </Button>
        </div>
      </div>

      <ScrollArea 
        className="flex-1 bg-[#0b141a] p-2 sm:p-4 relative"
        ref={scrollAreaRef}
      >
        <div className="whatsapp-chat-bg" />
        <div className="space-y-2 sm:space-y-4 max-w-3xl mx-auto relative">
          {chatsData[0].messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sent ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[70%] rounded-lg p-2 sm:p-3 ${
                  message.sent ? "bg-[#005c4b]" : "bg-[#202c33]"
                }`}
              >
                {message.preview ? (
                  message.preview.type === 'image' ? (
                    <div className="space-y-2">
                      <Image
                        src={message.preview.url}
                        alt="Preview"
                        width={300}
                        height={200}
                        className="rounded-lg w-full h-auto"
                      />
                      {message.content && (
                        <p className="text-[#e9edef] mt-2 text-sm sm:text-base">{message.content}</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 sm:gap-3 bg-[#2a3942] p-2 sm:p-3 rounded-lg">
                      <File className="h-6 w-6 sm:h-8 sm:w-8 text-[#8696a0]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#e9edef] truncate text-sm sm:text-base">{message.preview.name}</p>
                        <p className="text-[#8696a0] text-xs sm:text-sm">{message.preview.size}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-[#00a884]">
                        <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </div>
                  )
                ) : (
                  <p className="text-[#e9edef] text-sm sm:text-base break-words">{message.content}</p>
                )}
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] sm:text-xs text-[#8696a0]">{message.time}</span>
                  {message.sent && message.status && (
                    <Check
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${
                        message.status === "read" ? "text-[#53bdeb]" : "text-[#8696a0]"
                      }`}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="bg-[#202c33] p-2 flex-shrink-0">
        <div className="flex items-center gap-1 sm:gap-2 max-w-3xl mx-auto">
          <div className="relative">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile className="h-5 w-5 sm:h-6 sm:w-6 text-[#8696a0]" />
            </Button>
            {showEmojiPicker && (
              <div className="absolute bottom-full left-0 z-50 mb-2">
                <EmojiPicker 
                  onEmojiClick={handleEmojiSelect}
                  width={300}
                  height={400}
                />
              </div>
            )}
          </div>

          <Popover open={showAttachments} onOpenChange={setShowAttachments}>
            <PopoverTrigger asChild>
              <Button type="button" variant="ghost" size="icon">
                <Paperclip className="h-5 w-5 sm:h-6 sm:w-6 text-[#8696a0]" />
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-48 bg-[#233138] border border-[#233138] p-1" 
              align="start"
              sideOffset={5}
            >
              <div className="flex flex-col">
                <label className="flex items-center gap-3 px-3 py-2 hover:bg-[#182229] cursor-pointer rounded transition-colors">
                  <ImageIcon className="h-5 w-5 text-[#8696a0]" />
                  <span className="text-[#d1d7db] text-sm">Photos & Videos</span>
                  <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileSelect} />
                </label>
                <label className="flex items-center gap-3 px-3 py-2 hover:bg-[#182229] cursor-pointer rounded transition-colors">
                  <Camera className="h-5 w-5 text-[#8696a0]" />
                  <span className="text-[#d1d7db] text-sm">Camera</span>
                  <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileSelect} />
                </label>
                <label className="flex items-center gap-3 px-3 py-2 hover:bg-[#182229] cursor-pointer rounded transition-colors">
                  <File className="h-5 w-5 text-[#8696a0]" />
                  <span className="text-[#d1d7db] text-sm">Document</span>
                  <input type="file" className="hidden" onChange={handleFileSelect} />
                </label>
              </div>
            </PopoverContent>
          </Popover>

          {messagePreview && (
            <div className="flex items-center gap-2 bg-[#2a3942] px-2 sm:px-3 py-1 rounded-lg">
              {messagePreview.type === 'image' ? (
                <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#8696a0]" />
              ) : (
                <File className="h-4 w-4 sm:h-5 sm:w-5 text-[#8696a0]" />
              )}
              <span className="text-[#e9edef] text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[100px]">
                {messagePreview.name}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-5 w-5 sm:h-6 sm:w-6"
                onClick={() => setMessagePreview(null)}
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4 text-[#8696a0]" />
              </Button>
            </div>
          )}

          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 bg-[#2a3942] border-none text-[#d1d7db] placeholder:text-[#8696a0] text-sm sm:text-base h-9 sm:h-10"
          />
          <Button type="submit" variant="ghost" size="icon">
            <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-[#8696a0]" />
          </Button>
        </div>
      </form>

      {/* Profile Settings Dialog */}
      <Dialog open={showProfileSettings} onOpenChange={setShowProfileSettings}>
        <DialogContent className="bg-[#222e35] text-[#e9edef] border-none max-w-[90vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profile Settings</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                  <Image
                    src={userProfile.image}
                    alt={userProfile.name}
                    width={128}
                    height={128}
                    className="rounded-full"
                  />
                </Avatar>
                <label className="absolute bottom-0 right-0 bg-[#00a884] p-2 rounded-full cursor-pointer">
                  <Camera className="h-5 w-5 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfileImageChange}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm text-[#8696a0]">Your Name</label>
              <div className="flex gap-2">
                <Input
                  value={userProfile.name}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-[#2a3942] border-none text-[#d1d7db]"
                />
                <Button size="icon" variant="ghost">
                  <Edit className="h-4 w-4 text-[#00a884]" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm text-[#8696a0]">About</label>
              <div className="flex gap-2">
                <Input
                  value={userProfile.about}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, about: e.target.value }))}
                  className="bg-[#2a3942] border-none text-[#d1d7db]"
                />
                <Button size="icon" variant="ghost">
                  <Edit className="h-4 w-4 text-[#00a884]" />
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setShowProfileSettings(false)}
              className="bg-[#00a884] hover:bg-[#02906f] text-white"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showContactInfo} onOpenChange={setShowContactInfo}>
        <DialogContent className="bg-[#222e35] text-[#e9edef] border-none max-w-[90vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Info</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-col items-center gap-4 p-4 bg-[#111b21] rounded-lg">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                <Image
                  src={adminData.avatar}
                  alt={adminData.name}
                  width={128}
                  height={128}
                  className="rounded-full"
                />
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-semibold">{adminData.name}</h2>
                <p className="text-sm sm:text-base text-[#8696a0]">Official Support</p>
              </div>
            </div>

            <div className="p-4 bg-[#111b21] rounded-lg">
              <h3 className="text-xs sm:text-sm text-[#8696a0] mb-1">About</h3>
              <p className="text-sm sm:text-base text-[#e9edef]">{adminData.about}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}