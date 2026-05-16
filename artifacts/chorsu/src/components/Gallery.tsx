import { motion } from "framer-motion";
import gallery1 from "@/assets/gallery-interior.png";
import gallery2 from "@/assets/story-kitchen.png"; // Fallback due to limits
import gallery3 from "@/assets/fergana-osh.png"; // Fallback due to limits
import gallery4 from "@/assets/samarkand-osh.png"; // Fallback due to limits
import gallery5 from "@/assets/live-cooking.png"; // Fallback due to limits
import gallery6 from "@/assets/shurva.png"; // Fallback due to limits
import { useTranslation } from "react-i18next";

export function Gallery() {
  const { t } = useTranslation();

  const images = [
    { src: gallery1, alt: t("gallery.alts.interior"), className: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" },
    { src: gallery2, alt: t("gallery.alts.vip"), className: "aspect-square" },
    { src: gallery3, alt: t("gallery.alts.family"), className: "aspect-[4/3]" },
    { src: gallery4, alt: t("gallery.alts.plov"), className: "aspect-[4/3]" },
    { src: gallery5, alt: t("gallery.alts.outdoor"), className: "aspect-square" },
    { src: gallery6, alt: t("gallery.alts.festive"), className: "md:col-span-2 aspect-[21/9] md:aspect-auto" },
  ];

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-sm font-medium uppercase tracking-widest text-primary mb-3 block">{t("gallery.label")}</span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">{t("gallery.title")}</h2>
          <div className="h-px w-24 bg-primary mx-auto opacity-30" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-[auto] gap-4 auto-rows-[250px]">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-xl group ${img.className}`}
            >
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}