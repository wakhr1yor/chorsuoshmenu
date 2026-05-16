import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.menu"), href: "#menu" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.gallery"), href: "#gallery" },
    { name: t("nav.branches"), href: "#branches" },
    { name: t("nav.reservation"), href: "#reservation" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex flex-col items-start gap-0 hover:opacity-90 transition-opacity"
        >
          <span className={`font-serif text-2xl md:text-3xl font-bold tracking-wider leading-none ${isScrolled ? "text-primary" : "text-white"}`}>
            CHORSU
          </span>
          <span className={`font-sans text-[0.65rem] md:text-xs tracking-[0.2em] font-medium leading-none mt-1 ${isScrolled ? "text-foreground" : "text-white/90"}`}>
            OSH MARKAZI
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={`font-sans text-sm font-medium transition-colors hover:text-primary ${
                isScrolled ? "text-foreground/80" : "text-white/90"
              }`}
            >
              {link.name}
            </a>
          ))}

          <div className="flex items-center gap-1 ml-6 pl-6 border-l border-current/20">
            {(["uz", "ru", "en"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => i18n.changeLanguage(lang)}
                className={`font-sans text-xs font-medium uppercase tracking-wider px-2 py-1 rounded transition-colors ${
                  i18n.language === lang
                    ? isScrolled ? "text-primary font-bold" : "text-white font-bold"
                    : isScrolled ? "text-foreground/50 hover:text-foreground" : "text-white/50 hover:text-white"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 -mr-2 ${isScrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="font-sans text-lg font-medium text-foreground py-2 border-b border-border/50 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-border/50">
            {(["uz", "ru", "en"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  i18n.changeLanguage(lang);
                  setMobileMenuOpen(false);
                }}
                className={`font-sans text-sm font-medium uppercase tracking-wider px-3 py-2 rounded transition-colors ${
                  i18n.language === lang
                    ? "text-primary font-bold bg-primary/10"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}