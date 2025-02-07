"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  UserPlus,
  Users,
  Download,
  User,
  Edit,
  CircleUserRound,
  Plus,
  MessageCircle,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Share2
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { chatsData, type Chat } from "@/lib/data";
import EmojiPicker from 'emoji-picker-react';

interface MessagePreview {
  type: 'image' | 'document';
  name: string;
  url: string;
  size?: string;
}

interface Status {
  id: number;
  imageUrl: string;
  timestamp: string;
}

export default function AdminPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const [messagePreview, setMessagePreview] = useState<MessagePreview | null>(null);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [showStatusSettings, setShowStatusSettings] = useState(false);
  const [showStatusUpload, setShowStatusUpload] = useState(false);
  const [profileName, setProfileName] = useState("John Doe");
  const [profileStatus, setProfileStatus] = useState("Hey there! I am using WhatsApp");
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3");
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [showMessageSearch, setShowMessageSearch] = useState(false);
  const [messageSearchTerm, setMessageSearchTerm] = useState("");
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageScale, setImageScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const filteredChats = chatsData.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMessages = selectedChat?.messages.filter(message =>
    message.content?.toLowerCase().includes(messageSearchTerm.toLowerCase())
  ) || [];

  const navigateSearchResults = (direction: 'up' | 'down') => {
    if (filteredMessages.length === 0) return;
    
    if (selectedMessageIndex === null) {
      setSelectedMessageIndex(direction === 'up' ? filteredMessages.length - 1 : 0);
    } else {
      const newIndex = direction === 'up' 
        ? Math.max(0, selectedMessageIndex - 1)
        : Math.min(filteredMessages.length - 1, selectedMessageIndex + 1);
      setSelectedMessageIndex(newIndex);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!newMessage.trim() && !messagePreview) || !selectedChat) return;

    const newMsg = {
      id: selectedChat.messages.length + 1,
      content: messagePreview ? '' : newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true,
      status: "sent" as const,
      preview: messagePreview
    };

    selectedChat.messages.push(newMsg);
    selectedChat.lastMessage = messagePreview ? 
      messagePreview.type === 'image' ? '📷 Photo' : `📄 ${messagePreview.name}` :
      newMessage;
    selectedChat.time = newMsg.time;
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

  const handleStatusUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const newStatus = {
        id: Date.now(),
        imageUrl: URL.createObjectURL(file),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setStatuses([newStatus, ...statuses]);
      setShowStatusUpload(false);
    }
  };

  const handleEmojiSelect = (emojiData: any) => {
    setNewMessage(prev => prev + emojiData.emoji);
  };

  const handleAddContact = () => {
    if (selectedChat && newContactName.trim()) {
      selectedChat.name = newContactName;
      setNewContactName("");
      setShowAddContact(false);
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
    setShowImageViewer(true);
    setImageScale(1);
    setRotation(0);
  };

  const handleZoomIn = () => {
    setImageScale(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setImageScale(prev => Math.max(prev - 0.5, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  return (
    <div className="flex h-screen bg-[#111b21]">
      {/* Left Sidebar */}
      <div className="w-[400px] border-r border-[#202c33] flex flex-col lg:block hidden">
        {/* Profile Header */}
        <div className="h-16 bg-[#202c33] flex items-center justify-between px-4">
          <Avatar className="h-10 w-10 cursor-pointer" onClick={() => setShowProfileSettings(true)}>
            <Image
              src={profileImage}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Avatar>
          <div className="flex gap-4 text-[#aebac1]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#2a3942] text-[#e9edef] border-[#202c33]">
                <DropdownMenuItem 
                  className="hover:bg-[#202c33] cursor-pointer"
                  onClick={() => setShowProfileSettings(true)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="hover:bg-[#202c33] cursor-pointer"
                  onClick={() => setShowStatusUpload(true)}
                >
                  <CircleUserRound className="h-4 w-4 mr-2" />
                  Status
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#aebac1]" />
            <Input
              placeholder="Search or start new chat"
              className="pl-10 bg-[#202c33] border-none text-[#aebac1] placeholder:text-[#aebac1]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Status Upload Dialog */}
        <Dialog open={showStatusUpload} onOpenChange={setShowStatusUpload}>
          <DialogContent className="bg-[#222e35] text-[#e9edef] border-none max-w-md">
            <DialogHeader>
              <DialogTitle>Add Status</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="relative h-[600px] bg-[#111b21] rounded-lg flex items-center justify-center">
                {statuses.length > 0 ? (
                  <Image
                    src={statuses[0].imageUrl}
                    alt="Latest Status"
                    fill
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-[#8696a0] mb-4">No status updates</p>
                    <label className="cursor-pointer">
                      <div className="bg-[#00a884] hover:bg-[#02906f] text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Add Status
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleStatusUpload}
                      />
                    </label>
                  </div>
                )}
                {statuses.length > 0 && (
                  <label className="absolute bottom-4 right-4 cursor-pointer">
                    <div className="bg-[#00a884] hover:bg-[#02906f] text-white p-3 rounded-full">
                      <Camera className="h-6 w-6" />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleStatusUpload}
                    />
                  </label>
                )}
              </div>
              {statuses.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-[#8696a0] text-sm">Recent Updates</h3>
                  <div className="space-y-2">
                    {statuses.map((status) => (
                      <div key={status.id} className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full border-2 border-[#00a884]">
                            <Image
                              src={status.imageUrl}
                              alt={`Status ${status.id}`}
                              width={48}
                              height={48}
                              className="rounded-full object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-[#e9edef]">My Status</p>
                          <p className="text-sm text-[#8696a0]">{status.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Tabs */}
        <Tabs defaultValue="chats" className="w-full">
          <TabsList className="w-full bg-[#202c33] rounded-none">
            <TabsTrigger 
              value="chats" 
              className="flex-1 text-[#aebac1] data-[state=active]:text-[#00a884] data-[state=active]:bg-[#2a3942]"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Chats
            </TabsTrigger>
            <TabsTrigger 
              value="contacts" 
              className="flex-1 text-[#aebac1] data-[state=active]:text-[#00a884] data-[state=active]:bg-[#2a3942]"
            >
              <Users className="h-5 w-5 mr-2" />
              Contacts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chats" className="m-0">
            <ScrollArea className="flex-1 h-[calc(100vh-180px)]">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center gap-3 p-3 hover:bg-[#202c33] cursor-pointer ${
                    selectedChat?.id === chat.id ? "bg-[#2a3942]" : ""
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <Image
                        src={chat.avatar}
                        alt={chat.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </Avatar>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-[#111b21]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-[#e9edef] font-medium">
                        {chat.name === chat.phoneNumber ? (
                          <div className="flex items-center gap-2">
                            {chat.phoneNumber}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedChat(chat);
                                setShowAddContact(true);
                              }}
                            >
                              <UserPlus className="h-4 w-4 text-[#00a884]" />
                            </Button>
                          </div>
                        ) : (
                          chat.name
                        )}
                      </span>
                      <span className="text-xs text-[#8696a0]">{chat.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#8696a0]">{chat.lastMessage}</span>
                      {chat.unread > 0 && (
                        <div className="bg-[#00a884] rounded-full h-5 w-5 flex items-center justify-center">
                          <span className="text-xs text-white">{chat.unread}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="contacts" className="m-0">
            <ScrollArea className="flex-1 h-[calc(100vh-180px)]">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center gap-3 p-3 hover:bg-[#202c33] cursor-pointer"
                  onClick={() => setSelectedChat(chat)}
                >
                  <Avatar className="h-12 w-12">
                    <Image
                      src={chat.avatar}
                      alt={chat.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </Avatar>
                  <div>
                    <div className="text-[#e9edef] font-medium">{chat.name}</div>
                    <div className="text-sm text-[#8696a0]">{chat.about || chat.phoneNumber}</div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* Profile Settings Dialog */}
        <Dialog open={showProfileSettings} onOpenChange={setShowProfileSettings}>
          <DialogContent className="bg-[#222e35] text-[#e9edef] border-none">
            <DialogHeader>
              <DialogTitle>Profile Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <Image
                      src={profileImage}
                      alt="Profile"
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
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="bg-[#2a3942] border-none text-[#d1d7db]"
                  />
                  <Button size="icon" variant="ghost">
                    <Edit className="h-4 w-4 text-[#00a884]" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-[#8696a0]">
                This is not your username or pin. This name will be visible to your WhatsApp contacts.
              </p>
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
      </div>

      {/* Main Chat Area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 bg-[#202c33] flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="lg:hidden">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedChat(null)}
                >
                  <ArrowRight className="h-5 w-5 text-[#aebac1]" />
                </Button>
              </div>
              <Avatar className="h-10 w-10 cursor-pointer" onClick={() => setShowContactInfo(true)}>
                <Image
                  src={selectedChat.avatar}
                  alt={selectedChat.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Avatar>
              <div className="cursor-pointer" onClick={() => setShowContactInfo(true)}>
                <div className="text-[#e9edef] font-medium">
                  {selectedChat.name}
                  {selectedChat.name === selectedChat.phoneNumber && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAddContact(true);
                      }}
                    >
                      <UserPlus className="h-4 w-4 text-[#00a884]" />
                    </Button>
                  )}
                </div>
                <div className="text-sm text-[#8696a0]">
                  {selectedChat.online ? "online" : "offline"}
                </div>
              </div>
            </div>
            <div className="flex gap-4 text-[#aebac1]">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowMessageSearch(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setShowContactInfo(true)}>
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Message Search Dialog */}
          <Dialog open={showMessageSearch} onOpenChange={setShowMessageSearch}>
            <DialogContent className="bg-[#222e35] text-[#e9edef] border-none max-w-md">
              <DialogHeader>
                <DialogTitle>Search Messages</DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    setShowMessageSearch(false);
                    setMessageSearchTerm("");
                    setSelectedMessageIndex(null);
                  }}
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <div className="flex-1">
                  <Input
                    placeholder="Search messages"
                    value={messageSearchTerm}
                    onChange={(e) => {
                      setMessageSearchTerm(e.target.value);
                      setSelectedMessageIndex(null);
                    }}
                    className="bg-[#2a3942] border-none text-[#d1d7db] placeholder:text-[#8696a0]"
                  />
                </div>
              </div>
              
              {messageSearchTerm && (
                <div className="flex items-center justify-between px-4 py-2 border-b border-[#2a3942]">
                  <span className="text-sm text-[#8696a0]">
                    {filteredMessages.length} {filteredMessages.length === 1 ? 'message' : 'messages'} found
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={filteredMessages.length === 0}
                      onClick={() => navigateSearchResults('up')}
                    >
                      <ZoomIn className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={filteredMessages.length === 0}
                      onClick={() => navigateSearchResults('down')}
                    >
                      <ZoomOut className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}

              <ScrollArea className="h-[400px]">
                <div className="space-y-4 p-4">
                  {filteredMessages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        index === selectedMessageIndex
                          ? 'bg-[#2a3942]'
                          : 'hover:bg-[#202c33]'
                      }`}
                      onClick={() => setSelectedMessageIndex(index)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs text-[#8696a0]">{message.time}</span>
                        {message.sent && message.status && (
                          <Check
                            className={`h-4 w-4 ${
                              message.status === "read" ? "text-[#53bdeb]" : "text-[#8696a0]"
                            }`}
                          />
                        )}
                      </div>
                      <p className="text-[#e9edef]">{message.content}</p>
                    </div>
                  ))}
                  {messageSearchTerm && filteredMessages.length === 0 && (
                    <div className="text-center text-[#8696a0] py-8">
                      No messages found
                    </div>
                  )}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          {/* Messages Area */}
          <ScrollArea className="flex-1 bg-[#0b141a] p-4 relative">
            <div className="whatsapp-chat-bg" />
            <div className="space-y-4 relative">
              {selectedChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sent ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[60%] rounded-lg p-3 ${
                      message.sent ? "bg-[#005c4b]" : "bg-[#202c33]"
                    }`}
                  >
                    {message.preview ? (
                      message.preview.type === 'image' ? (
                        <div className="space-y-2">
                          <div 
                            className="cursor-pointer"
                            onClick={() => handleImageClick(message.preview!.url)}
                          >
                            <Image
                              src={message.preview.url}
                              alt="Preview"
                              width={200}
                              height={150}
                              className="rounded-lg w-full h-auto"
                            />
                          </div>
                          {message.content && (
                            <p className="text-[#e9edef] mt-2">{message.content}</p>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 bg-[#2a3942] p-3 rounded-lg">
                          <File className="h-8 w-8 text-[#8696a0]" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[#e9edef] truncate">{message.preview.name}</p>
                            <p className="text-[#8696a0] text-sm">{message.preview.size}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="text-[#00a884]">
                            <Download className="h-5 w-5" />
                          </Button>
                        </div>
                      )
                    ) : (
                      <p className="text-[#e9edef]">{message.content}</p>
                    )}
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-xs text-[#8696a0]">{message.time}</span>
                      {message.sent && message.status && (
                        <Check
                          className={`h-4 w-4 ${
                            message.status === "read" ? "text-[#53bdeb]" : "text-[#8696a0]"
                          }`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="bg-[#202c33] p-2">
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button type="button" variant="ghost" size="icon">
                    <Smile className="h-6 w-6 text-[#8696a0]" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <EmojiPicker onEmojiClick={handleEmojiSelect} />
                </PopoverContent>
              </Popover>

              <Popover open={showAttachments} onOpenChange={setShowAttachments}>
                <PopoverTrigger asChild>
                  <Button type="button" variant="ghost" size="icon">
                    <Paperclip className="h-6 w-6 text-[#8696a0]" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48" align="start">
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 p-2 hover:bg-[#202c33] cursor-pointer rounded">
                      <ImageIcon className="h-5 w-5 text-[#8696a0]" />
                      <span className="text-[#e9edef]">Photos & Videos</span>
                      <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileSelect} />
                    </label>
                    <label className="flex items-center gap-2 p-2 hover:bg-[#202c33] cursor-pointer rounded">
                      <Camera className="h-5 w-5 w-5 text-[#8696a0]" />
                      <span className="text-[#e9edef]">Camera</span>
                      <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileSelect} />
                    </label>
                    <label className="flex items-center gap-2 p-2 hover:bg-[#202c33] cursor-pointer rounded">
                      <File className="h-5 w-5 text-[#8696a0]" />
                      <span className="text-[#e9edef]">Document</span>
                      <input type="file" className="hidden" onChange={handleFileSelect} />
                    </label>
                  </div>
                </PopoverContent>
              </Popover>

              {messagePreview && (
                <div className="flex items-center gap-2 bg-[#2a3942] px-3 py-1 rounded-lg">
                  {messagePreview.type === 'image' ? (
                    <ImageIcon className="h-5 w-5 text-[#8696a0]" />
                  ) : (
                    <File className="h-5 w-5 text-[#8696a0]" />
                  )}
                  <span className="text-[#e9edef] text-sm truncate max-w-[100px]">
                    {messagePreview.name}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setMessagePreview(null)}
                  >
                    <X className="h-4 w-4 text-[#8696a0]" />
                  </Button>
                </div>
              )}

              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 bg-[#2a3942] border-none text-[#d1d7db] placeholder:text-[#8696a0]"
              />
              <Button type="submit" variant="ghost" size="icon">
                <ArrowRight className="h-6 w-6 text-[#8696a0]" />
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex-1 hidden lg:flex items-center justify-center bg-[#222e35]">
          <div className="text-center">
            <h2 className="text-[#e9edef] text-3xl font-light mb-4">WhatsApp Web</h2>
            <p className="text-[#8696a0]">
              Send and receive messages without keeping your phone online.
              <br />
              Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
            </p>
          </div>
        </div>
      )}

      {/* Contact Info Dialog */}
      <Dialog open={showContactInfo} onOpenChange={setShowContactInfo}>
        <DialogContent className="bg-[#222e35] text-[#e9edef] border-none max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Info</DialogTitle>
          </DialogHeader>
          {selectedChat && (
            <div className="flex flex-col gap-6">
              {/* Profile Section */}
              <div className="flex flex-col items-center gap-4 p-4 bg-[#111b21] rounded-lg">
                <Avatar className="h-32 w-32">
                  <Image
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    width={128}
                    height={128}
                    className="rounded-full"
                  />
                </Avatar>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold">{selectedChat.name}</h2>
                  <p className="text-[#8696a0]">{selectedChat.phoneNumber}</p>
                  {selectedChat.name === selectedChat.phoneNumber && (
                    <Button
                      variant="ghost"
                      className="mt-2 text-[#00a884] hover:text-[#00a884] hover:bg-[#202c33]"
                      onClick={() => {
                        setShowContactInfo(false);
                        setShowAddContact(true);
                      }}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add to Contacts
                    </Button>
                  )}
                </div>
              </div>

              {/* About Section */}
              <div className="p-4 bg-[#111b21] rounded-lg">
                <h3 className="text-[#8696a0] text-sm mb-1">About</h3>
                <p className="text-[#e9edef]">{selectedChat.about || "Hey there! I am using WhatsApp"}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Contact Dialog */}
      <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
        <DialogContent className="bg-[#222e35] text-[#e9edef] border-none">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[#8696a0]">Phone Number</label>
              <Input
                value={selectedChat?.phoneNumber || ""}
                disabled
                className="bg-[#2a3942] border-none text-[#d1d7db]"
              />
            </div>
            <div>
              <label className="text-sm text-[#8696a0]">Name</label>
              <Input
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                placeholder="Contact name"
                className="bg-[#2a3942] border-none text-[#d1d7db] placeholder:text-[#8696a0]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setShowAddContact(false)}
              className="text-[#8696a0] hover:text-[#8696a0] hover:bg-[#202c33]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddContact}
              className="bg-[#00a884] hover:bg-[#02906f] text-white"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Viewer Dialog */}
      <Dialog open={showImageViewer} onOpenChange={setShowImageViewer}>
        <DialogContent className="bg-[#222e35] text-[#e9edef] border-none max-w-[95vw] sm:max-w-[90vw] h-[90vh] p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 bg-[#202c33]">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowImageViewer(false)}
              >
                <X className="h-5 w-5 text-[#aebac1]" />
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleZoomIn}
                >
                  <ZoomIn className="h-5 w-5 text-[#aebac1]" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleZoomOut}
                >
                  <ZoomOut className="h-5 w-5 text-[#aebac1]" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleRotate}
                >
                  <RotateCw className="h-5 w-5 text-[#aebac1]" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => window.open(selectedImage!, '_blank')}
                >
                  <Share2 className="h-5 w-5 text-[#aebac1]" />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center bg-[#111b21] p-4">
              {selectedImage && (
                <div
                  className="relative w-full h-full flex items-center justify-center"
                  style={{
                    transform: `scale(${imageScale}) rotate(${rotation}deg)`,
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <Image
                    src={selectedImage}
                    alt="Full size"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}