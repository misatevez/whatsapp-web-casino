export const adminProfile = {
  name: "WhatsApp Support",
  avatar: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
  about: "Official WhatsApp Support",
  online: true
};

export interface Message {
  id: number;
  content: string;
  time: string;
  sent: boolean;
  status?: "sent" | "delivered" | "read";
  preview?: {
    type: 'image' | 'document';
    name: string;
    url: string;
    size?: string;
  };
}

export interface Chat {
  id: number;
  name: string;
  phoneNumber: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
  messages: Message[];
  about?: string;
}

export const chatsData: Chat[] = [
  {
    id: 1,
    name: "1138008472",
    phoneNumber: "1138008472",
    lastMessage: "Hola, ¿cómo estás?",
    time: "Just now",
    unread: 1,
    avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    online: false,
    messages: [
      {
        id: 1,
        content: "Hola, ¿cómo estás?",
        time: "Just now",
        sent: false
      }
    ]
  },
  {
    id: 2,
    name: "1145678901",
    phoneNumber: "1145678901",
    lastMessage: "📷 Photo",
    time: "5 minutes ago",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    online: false,
    messages: [
      {
        id: 1,
        content: "Mira esto",
        time: "5 minutes ago",
        sent: false
      },
      {
        id: 2,
        content: "",
        time: "5 minutes ago",
        sent: false,
        preview: {
          type: 'image',
          name: 'photo.jpg',
          url: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }
      }
    ]
  },
  {
    id: 3,
    name: "1156789012",
    phoneNumber: "1156789012",
    lastMessage: "📄 Presupuesto.pdf",
    time: "30 minutes ago",
    unread: 2,
    avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    online: false,
    messages: [
      {
        id: 1,
        content: "Te envío el presupuesto",
        time: "30 minutes ago",
        sent: false
      },
      {
        id: 2,
        content: "",
        time: "30 minutes ago",
        sent: false,
        preview: {
          type: 'document',
          name: 'Presupuesto.pdf',
          url: '#',
          size: '2.8 MB'
        }
      }
    ]
  },
  {
    id: 4,
    name: "John Doe",
    phoneNumber: "+1 (555) 123-4567",
    lastMessage: "📷 Photo",
    time: "10:30 AM",
    unread: 2,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    online: true,
    about: "Hey there! I am using WhatsApp",
    messages: [
      {
        id: 1,
        content: "Hey, how are you?",
        time: "10:25 AM",
        sent: true,
        status: "read"
      },
      {
        id: 2,
        content: "I'm good, thanks! Check out this photo from my vacation!",
        time: "10:28 AM",
        sent: false
      },
      {
        id: 3,
        content: "",
        time: "10:30 AM",
        sent: false,
        preview: {
          type: 'image',
          name: 'vacation.jpg',
          url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        }
      }
    ]
  },
  {
    id: 5,
    name: "1167890123",
    phoneNumber: "1167890123",
    lastMessage: "Necesito información",
    time: "1 hour ago",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    online: false,
    messages: [
      {
        id: 1,
        content: "Necesito información",
        time: "1 hour ago",
        sent: false
      }
    ]
  },
  {
    id: 6,
    name: "1178901234",
    phoneNumber: "1178901234",
    lastMessage: "📷 Photo",
    time: "2 hours ago",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    online: false,
    messages: [
      {
        id: 1,
        content: "¿Qué te parece?",
        time: "2 hours ago",
        sent: false
      },
      {
        id: 2,
        content: "",
        time: "2 hours ago",
        sent: false,
        preview: {
          type: 'image',
          name: 'product.jpg',
          url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }
      }
    ]
  },
  {
    id: 7,
    name: "Alice Smith",
    phoneNumber: "+1 (555) 987-6543",
    lastMessage: "📄 Q4 Report.pdf",
    time: "9:45 AM",
    unread: 1,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    online: false,
    about: "At work 🏢",
    messages: [
      {
        id: 1,
        content: "Hi Alice, could you send me the Q4 report?",
        time: "9:30 AM",
        sent: true,
        status: "read"
      },
      {
        id: 2,
        content: "Sure, here it is!",
        time: "9:45 AM",
        sent: false
      },
      {
        id: 3,
        content: "",
        time: "9:45 AM",
        sent: false,
        preview: {
          type: 'document',
          name: 'Q4 Report.pdf',
          url: '#',
          size: '2.4 MB'
        }
      }
    ]
  },
  {
    id: 8,
    name: "1189012345",
    phoneNumber: "1189012345",
    lastMessage: "📄 Factura.pdf",
    time: "Yesterday",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    online: false,
    messages: [
      {
        id: 1,
        content: "Aquí está la factura",
        time: "Yesterday",
        sent: false
      },
      {
        id: 2,
        content: "",
        time: "Yesterday",
        sent: false,
        preview: {
          type: 'document',
          name: 'Factura.pdf',
          url: '#',
          size: '1.2 MB'
        }
      }
    ]
  },
  {
    id: 9,
    name: "Sarah Johnson",
    phoneNumber: "+1 (555) 246-8135",
    lastMessage: "📷 Photo",
    time: "Yesterday",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    online: true,
    about: "Living life 🌟",
    messages: [
      {
        id: 1,
        content: "Look at this amazing sunset!",
        time: "Yesterday",
        sent: false
      },
      {
        id: 2,
        content: "",
        time: "Yesterday",
        sent: false,
        preview: {
          type: 'image',
          name: 'sunset.jpg',
          url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }
      }
    ]
  },
  {
    id: 10,
    name: "David Wilson",
    phoneNumber: "+1 (555) 369-1478",
    lastMessage: "📄 Project Proposal.docx",
    time: "Yesterday",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    online: false,
    about: "Busy at work",
    messages: [
      {
        id: 1,
        content: "Here's the project proposal we discussed",
        time: "Yesterday",
        sent: true,
        status: "read"
      },
      {
        id: 2,
        content: "",
        time: "Yesterday",
        sent: true,
        status: "read",
        preview: {
          type: 'document',
          name: 'Project Proposal.docx',
          url: '#',
          size: '1.8 MB'
        }
      }
    ]
  },
  {
    id: 11,
    name: "Emma Thompson",
    phoneNumber: "+1 (555) 789-0123",
    lastMessage: "Great shots from the event! 📸",
    time: "Tuesday",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    online: true,
    about: "Photography enthusiast 📸",
    messages: [
      {
        id: 1,
        content: "Here are some highlights from yesterday's event",
        time: "Tuesday",
        sent: false
      },
      {
        id: 2,
        content: "",
        time: "Tuesday",
        sent: false,
        preview: {
          type: 'image',
          name: 'event1.jpg',
          url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }
      },
      {
        id: 3,
        content: "",
        time: "Tuesday",
        sent: false,
        preview: {
          type: 'image',
          name: 'event2.jpg',
          url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }
      }
    ]
  },
  {
    id: 12,
    name: "Michael Chen",
    phoneNumber: "+1 (555) 456-7890",
    lastMessage: "📄 Meeting Minutes.pdf",
    time: "Monday",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    online: false,
    about: "Work hard, play harder",
    messages: [
      {
        id: 1,
        content: "Here are the minutes from today's meeting",
        time: "Monday",
        sent: false
      },
      {
        id: 2,
        content: "",
        time: "Monday",
        sent: false,
        preview: {
          type: 'document',
          name: 'Meeting Minutes.pdf',
          url: '#',
          size: '856 KB'
        }
      }
    ]
  },
  {
    id: 13,
    name: "Sophie Martinez",
    phoneNumber: "+1 (555) 234-5678",
    lastMessage: "Check out my new artwork! 🎨",
    time: "Monday",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    online: true,
    about: "Artist & Designer 🎨",
    messages: [
      {
        id: 1,
        content: "Just finished this new piece!",
        time: "Monday",
        sent: false
      },
      {
        id: 2,
        content: "",
        time: "Monday",
        sent: false,
        preview: {
          type: 'image',
          name: 'artwork.jpg',
          url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }
      }
    ]
  },
  {
    id: 14,
    name: "Robert Taylor",
    phoneNumber: "+1 (555) 345-6789",
    lastMessage: "📄 Contract Draft.pdf",
    time: "Sunday",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    online: false,
    about: "Legal Professional",
    messages: [
      {
        id: 1,
        content: "Here's the draft contract for review",
        time: "Sunday",
        sent: true,
        status: "read"
      },
      {
        id: 2,
        content: "",
        time: "Sunday",
        sent: true,
        status: "read",
        preview: {
          type: 'document',
          name: 'Contract Draft.pdf',
          url: '#',
          size: '3.2 MB'
        }
      }
    ]
  },
  {
    id: 15,
    name: "Isabella Garcia",
    phoneNumber: "+1 (555) 567-8901",
    lastMessage: "📷 Photo",
    time: "Sunday",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    online: true,
    about: "Travel enthusiast ✈️",
    messages: [
      {
        id: 1,
        content: "Greetings from Paris!",
        time: "Sunday",
        sent: false
      },
      {
        id: 2,
        content: "",
        time: "Sunday",
        sent: false,
        preview: {
          type: 'image',
          name: 'paris.jpg',
          url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }
      }
    ]
  }
];