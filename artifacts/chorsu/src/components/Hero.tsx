import { motion } from "framer-motion";
import heroImg from "@/assets/hero.png";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { t } = useTranslation();
  
  const handleScrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Authentic Uzbek plov cooking in a kazan"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 text-center flex flex-col items-center justify-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-6 flex items-center justify-center gap-4 opacity-80">
            <div className="h-px w-12 bg-white/50" />
            <span className="text-white font-sans tracking-[0.2em] text-sm uppercase">{t("hero.location")}</span>
            <div className="h-px w-12 bg-white/50" />
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-6 leading-[1.1]">
            {t("hero.title")}
          </h1>
          
          <p className="font-sans text-lg md:text-xl text-white/90 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-base h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground border-none"
              onClick={(e) => handleScrollTo(e, "#menu")}
            >
              {t("hero.viewMenu")}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto text-base h-14 px-8 text-white border-white/30 hover:bg-white hover:text-black bg-transparent transition-colors"
              onClick={(e) => handleScrollTo(e, "#branches")}
            >
              {t("hero.findBranch")}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}