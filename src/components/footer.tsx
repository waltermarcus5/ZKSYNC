import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Logo />
            <p className="text-sm font-semibold">AirdropSim</p>
          </div>
          <p className="text-center text-sm text-muted-foreground max-w-lg">
            This website is for educational and simulation purposes only. It is
            not affiliated with or endorsed by ZKSync. Do not enter your real
            secret phrase.
          </p>
          <p className="text-center text-xs text-muted-foreground">
            This site is protected by reCAPTCHA and the Google{" "}
            <a
              href="https://policies.google.com/privacy"
              className="underline hover:text-primary"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              className="underline hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>
      </div>
    </footer>
  );
}
