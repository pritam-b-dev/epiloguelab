import Link from "next/link";
import { FaXTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-zinc-800/50 py-12 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-foreground tracking-tight">
              EpilougeLab
            </h3>
            <p className="text-sm opacity-70 text-foreground">
              Empowering your digital journey with wisdom and practical skills.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-center">
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground/80">
                Quick Links
              </h4>
              <Link
                href="/"
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/lessons"
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Lessons
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Pricing
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <div>
              <h4 className="text-sm font-semibold tracking-wider uppercase mb-3 md:text-right text-foreground/80">
                Connect With Us
              </h4>
              <div className="flex gap-4 items-center text-foreground/70">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  aria-label="X (Twitter)"
                >
                  <FaXTwitter className="h-5 w-5" />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="h-5 w-5" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800/50 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-foreground/60">
          <p>© 2026 EpilougeLab. All rights reserved.</p>
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
