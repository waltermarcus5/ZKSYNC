import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Logo />
              <p className="text-lg font-bold">AirdropSim</p>
            </div>
            <p className="text-sm text-muted-foreground">
              A simulation of a legitimate cryptocurrency airdrop for educational purposes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">About Us</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2">
              <li><a href="#faq" className="text-sm text-muted-foreground hover:text-primary">FAQ</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Discord</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Telegram</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
               <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</a></li>
               <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-center text-sm text-muted-foreground max-w-2xl">
            This website is for educational and simulation purposes only. It is
            not affiliated with or endorsed by ZKSync. Do not enter your real
            secret phrase.
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AirdropSim. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
