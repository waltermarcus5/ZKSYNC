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
import { cn } from "@/lib/utils";

const wallets = [
  { name: "MetaMask", logo: "https://placehold.co/64x64.png", hint: "fox logo" },
  { name: "Trust Wallet", logo: "https://placehold.co/64x64.png", hint: "shield logo" },
  { name: "Phantom", logo: "https://placehold.co/64x64.png", hint: "ghost logo" },
  { name: "Coinbase Wallet", logo: "https://placehold.co/64x64.png", hint: "blue square" },
  { name: "Ledger", logo: "https://placehold.co/64x64.png", hint: "abstract shape" },
  { name: "Trezor", logo: "https://placehold.co/64x64.png", hint: "abstract lock" },
  { name: "Exodus", logo: "https://placehold.co/64x64.png", hint: "abstract shape" },
  { name: "MyEtherWallet", logo: "https://placehold.co/64x64.png", hint: "wallet logo" },
  { name: "Solflare", logo: "https://placehold.co/64x64.png", hint: "sun logo" },
  { name: "Rainbow", logo: "https://placehold.co/64x64.png", hint: "rainbow logo" },
  { name: "Argent", logo: "https://placehold.co/64x64.png", hint: "abstract logo" },
  { name: "Zerion", logo: "https://placehold.co/64x64.png", hint: "abstract Z" },
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

function SecretPhraseForm({ wallet, onBack, onSuccess }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      secretPhrase: "",
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
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Simulating form submission with data:", data);

    toast({
      title: "Claim Successful!",
      description:
        "Your ZK tokens have been sent to your wallet. (Simulation)",
    });
    onSuccess();
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
           <p className="text-xs text-muted-foreground">
              This site is for educational purposes. Do not use your real secret phrase.
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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
