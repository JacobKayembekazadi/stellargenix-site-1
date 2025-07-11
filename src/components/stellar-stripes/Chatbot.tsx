'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { MessageSquare, Bot, User, Send, CornerDownLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { submitChatMessage } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const result = await submitChatMessage({ query: input });
      if (result.success && result.data) {
        const botMessage: Message = { role: 'bot', content: result.data.response };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
        setMessages((prev) => prev.slice(0, -1)); // Remove user message on error
      }
    });
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'bot', content: "Hello! How can I help you with StellarGenix Pavement Solutions today?" }]);
    }
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-primary shadow-lg hover:bg-primary/90"
          aria-label="Open Chat"
        >
          <MessageSquare className="h-8 w-8 text-primary-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Bot /> StellarGenix Assistant
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'bot' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={20}/></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-xs rounded-lg px-4 py-2 text-sm',
                      message.role === 'user'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted'
                    )}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><User size={20}/></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isPending && (
                <div className="flex items-start gap-3 justify-start">
                   <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={20}/></AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-4 py-2 text-sm flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Thinking...
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="border-t p-4 bg-background">
            <form onSubmit={handleSendMessage} className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our services..."
                className="pr-12"
                disabled={isPending}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-primary"
                disabled={isPending || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              Press <CornerDownLeft size={12}/> to send
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
