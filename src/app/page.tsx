"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { CountdownTimer } from "@/components/countdown-timer";
import { Reviews } from "@/components/reviews";
import { WalletConnectModal } from "@/components/wallet-connect-modal";
import { SiteFooter } from "@/components/footer";
import { ShieldCheck } from "lucide-react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <WalletConnectModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
      <div className="flex flex-col min-h-dvh">
        <header className="absolute top-0 left-0 right-0 z-10 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Logo />
            <Button variant="ghost">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Educational Purpose
            </Button>
          </div>
        </header>

        <main className="flex-1">
          <section className="relative w-full pt-32 pb-20 md:pt-48 md:pb-28 flex items-center justify-center text-center overflow-hidden">
             <div className="absolute inset-0 -z-10 bg-grid-gray-200/40 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)] dark:bg-grid-gray-800/40"></div>
             <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent -z-10"></div>
            
            <div className="container px-4 md:px-6 z-10">
              <div className="mx-auto max-w-3xl space-y-6">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium">
                  ZKSync (ZK) Airdrop
                </div>
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Claim Your Free ZK Tokens
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                  Don&apos;t miss out on the ZKSync airdrop! Claim up to{" "}
                  <span className="font-bold text-primary">4,000 ZK</span> tokens for
                  early users. Offer ends soon.
                </p>
                <CountdownTimer />
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    className="font-bold text-lg bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Claim Airdrop
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <Reviews />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
