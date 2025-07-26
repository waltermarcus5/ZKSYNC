"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { CountdownTimer } from "@/components/countdown-timer";
import { Reviews } from "@/components/reviews";
import { WalletConnectModal } from "@/components/wallet-connect-modal";
import { SiteFooter } from "@/components/footer";
import {
  ShieldCheck,
  Zap,
  Users,
  Gift,
  Wallet,
  CheckCircle,
  Cpu,
  Fingerprint,
  Verified,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const navLinks = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Why Claim?", href: "#why-claim" },
    { name: "FAQ", href: "#faq" },
    { name: "Community", href: "#" },
  ];

  return (
    <>
      <WalletConnectModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
      <div className="flex flex-col min-h-dvh bg-background text-foreground">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Logo />
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="hidden sm:flex border-primary/50 text-primary hover:bg-primary/10">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Educational Purpose
              </Button>
              <Button
                className="font-bold bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setIsModalOpen(true)}
              >
                Claim Now
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <section className="relative w-full pt-24 pb-20 md:pt-36 md:pb-28 flex items-center justify-center text-center overflow-hidden">
             <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
              <div className="absolute left-0 top-0 -z-10 h-2/3 w-full bg-gradient-to-b from-primary/10 to-transparent"></div>
            </div>
            
            <div className="container px-4 md:px-6 z-10">
              <div className="mx-auto max-w-3xl space-y-6">
                <div className="inline-block rounded-lg bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                  ZKSYNC (ZK) AIRDROP
                </div>
                <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-white">
                  Claim Your ZK Tokens
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                  Don&apos;t miss the official ZKSync airdrop. Secure your allocation of{" "}
                  <span className="font-bold text-foreground">4,000 ZK</span> tokens.
                </p>
                <CountdownTimer />
                <div className="flex justify-center items-center gap-2 text-sm text-green-400 mt-4">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secured by Blockchain &amp; AI Verification</span>
                </div>
                <div className="flex justify-center pt-4">
                  <Button
                    size="lg"
                    className="font-bold text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Claim Airdrop
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section id="how-it-works" className="py-20 sm:py-28">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
                  How It Works
                </h2>
                <p className="mt-4 text-muted-foreground md:text-xl max-w-2xl mx-auto">
                  Claiming your ZK tokens is a simple, three-step process.
                  Follow the instructions below to get started.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-primary/10 text-primary rounded-full p-5">
                      <Wallet className="h-10 w-10" />
                    </div>
                  </div>
                  <h3 className="font-bold text-2xl mb-3">1. Connect Wallet</h3>
                  <p className="text-muted-foreground text-lg">
                    Click the "Claim Airdrop" button and select your
                    wallet from the comprehensive list.
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-primary/10 text-primary rounded-full p-5">
                      <CheckCircle className="h-10 w-10" />
                    </div>
                  </div>
                  <h3 className="font-bold text-2xl mb-3">
                    2. Verify Eligibility
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    Import your wallet to automatically check if you are
                    eligible for the airdrop.
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-primary/10 text-primary rounded-full p-5">
                      <Gift className="h-10 w-10" />
                    </div>
                  </div>
                  <h3 className="font-bold text-2xl mb-3">3. Claim Tokens</h3>
                  <p className="text-muted-foreground text-lg">
                    Once verified, your ZK tokens are sent to your wallet
                    address. (Simulated)
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="why-claim" className="py-20 sm:py-28 bg-card/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
                  Why Claim Your ZK Tokens?
                </h2>
                <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
                  This airdrop is more than just free tokens. It&apos;s a chance to be part of a growing ecosystem built on cutting-edge technology.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary/10 text-primary rounded-xl p-3">
                      <ShieldCheck className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">Secure & Safe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our platform uses industry-standard security practices. This is an educational simulation; never share your real secret phrase.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary/10 text-primary rounded-xl p-3">
                      <Zap className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">Instant Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our streamlined process ensures you can check your eligibility and claim tokens in just a few minutes.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary/10 text-primary rounded-xl p-3">
                      <Users className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">Community Focused</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      By participating, you join a vibrant community of early adopters and developers shaping the future of ZK technology.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section id="ai-verification" className="py-20 sm:py-28">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
                  AI-Powered Verification
                </h2>
                <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
                  We leverage cutting-edge AI to ensure a fair, secure, and seamless airdrop experience for all participants.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-tl from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative flex flex-row items-center gap-4">
                    <div className="bg-primary/10 text-primary rounded-xl p-3 border border-primary/20">
                      <Cpu className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">AI Eligibility Check</CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-muted-foreground">
                      Our AI model instantly analyzes on-chain data to verify your eligibility, saving you time and effort.
                    </p>
                  </CardContent>
                </Card>
                 <Card className="relative overflow-hidden group border-primary/50 shadow-lg shadow-primary/10">
                   <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent"></div>
                   <CardHeader className="relative flex flex-row items-center gap-4">
                    <div className="bg-primary/10 text-primary rounded-xl p-3 border border-primary/20">
                      <Verified className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">Verified & Authentic</CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-muted-foreground">
                      This platform is verified to ensure a legitimate and safe airdrop simulation. Your security is our priority.
                    </p>
                  </CardContent>
                </Card>
                <Card className="relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-tl from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative flex flex-row items-center gap-4">
                    <div className="bg-primary/10 text-primary rounded-xl p-3 border border-primary/20">
                      <Fingerprint className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">Bot & Fraud Detection</CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-muted-foreground">
                      Advanced algorithms monitor for malicious activity, ensuring a fair distribution for all genuine users.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <Reviews />

          <section id="faq" className="py-20 sm:py-28">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-16">
                <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
                  Frequently Asked Questions
                </h2>
                <p className="mt-4 text-muted-foreground md:text-xl">
                  Have questions? We have answers.
                </p>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg">
                    What is an airdrop?
                  </AccordionTrigger>
                  <AccordionContent className="text-base">
                    An airdrop is a distribution of a cryptocurrency token or coin, usually for free, to numerous wallet addresses. Airdrops are primarily implemented as a way of gaining attention and new followers, resulting in a larger user base and a wider disbursement of coins.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg">
                    How do I know if I&apos;m eligible?
                  </AccordionTrigger>
                  <AccordionContent className="text-base">
                    Eligibility is typically based on past activity on a specific blockchain or platform. In this simulation, connecting your wallet will confirm your eligibility. In the real world, projects announce criteria beforehand.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg">
                    Is this simulation safe?
                  </AccordionTrigger>
                  <AccordionContent className="text-base">
                    Yes. This website is for educational purposes only. We will never ask for your real secret recovery phrase for a real wallet. **NEVER** enter your real secret phrase on any website.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg">
                    When will I receive the tokens?
                  </AccordionTrigger>
                  <AccordionContent className="text-base">
                    In this simulation, you will receive a success message immediately after completing the steps. In a real airdrop, tokens are typically distributed to your wallet within a few hours to a day after a successful claim.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
