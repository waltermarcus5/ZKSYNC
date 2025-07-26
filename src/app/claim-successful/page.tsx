import { CheckCircle } from "lucide-react";
import { SiteFooter } from "@/components/footer";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ClaimSuccessfulPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo />
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto bg-card p-8 rounded-xl shadow-lg border border-primary/20">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="font-headline text-3xl font-bold mb-4">
              Your Claim is Being Processed
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Thank you for participating. Your eligibility has been confirmed, and your claim for 4,000 ZK tokens has been successfully registered. The token distribution will occur automatically at the end of the current countdown period.
            </p>
            <Button asChild className="font-bold text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
