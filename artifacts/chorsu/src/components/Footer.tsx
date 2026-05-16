import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-zinc-950 text-white pt-20 pb-10 border-t border-zinc-900">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="mb-6 flex flex-col items-start gap-0">
              <span className="font-serif text-2xl font-bold tracking-wider leading-none text-primary">
                CHORSU
              </span>
              <span className="font-sans text-[0.65rem] tracking-[0.2em] font-medium leading-none mt-1 text-white/70">
                OSH MARKAZI
              </span>
            </div>
            <p className="font-sans text-sm text-white/60 leading-relaxed max-w-xs mb-6">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-sm">
                Ig
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-sm">
                Tg
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-sm">
                Fb
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-sm font-semibold tracking-wider uppercase mb-6">{t("footer.explore")}</h4>
            <ul className="space-y-3 font-sans text-sm text-white/60">
              <li><a href="#menu" className="hover:text-primary transition-colors">{t("nav.menu")}</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">{t("nav.about")}</a></li>
              <li><a href="#gallery" className="hover:text-primary transition-colors">{t("nav.gallery")}</a></li>
              <li><a href="#branches" className="hover:text-primary transition-colors">{t("nav.branches")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-sm font-semibold tracking-wider uppercase mb-6">{t("footer.contact")}</h4>
            <ul className="space-y-3 font-sans text-sm text-white/60">
              <li>info@chorsuosh.uz</li>
              <li>+998 71 234 5678</li>
              <li>Chorsu Bazaar, Tashkent</li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-sm font-semibold tracking-wider uppercase mb-6">{t("footer.workingHours")}</h4>
            <ul className="space-y-3 font-sans text-sm text-white/60">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>{t("footer.monThu")}</span>
                <span>08:00 - 22:00</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>{t("footer.friSun")}</span>
                <span>08:00 - 23:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-white/40">
            {t("footer.copyright")}
          </p>
          <div className="flex gap-6 font-sans text-xs text-white/40">
            <a href="#" className="hover:text-white transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-white transition-colors">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}