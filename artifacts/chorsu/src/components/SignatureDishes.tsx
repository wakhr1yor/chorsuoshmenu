import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import choyxonaPalovImg from "@/assets/choyxona-palov.png";
import zigirOshiImg from "@/assets/zigir-oshi.png";
import qaynatmaImg from "@/assets/qaynatma-shorva.png";
import mastavaImg from "@/assets/mastava.png";
import achichukImg from "@/assets/achichuk-salat.png";
import chiroqchiImg from "@/assets/chiroqchi.png";
import tomatliImg from "@/assets/tomatni-assorti.png";
import bahorImg from "@/assets/bahor-salat.png";
import kampotImg from "@/assets/kampot.png";
import orikImg from "@/assets/orik-sharbati.png";
import ayronImg from "@/assets/ayron.png";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const dishImages: Record<string, string> = {
  choyxona: choyxonaPalovImg,
  zigir: zigirOshiImg,
  qaynatma: qaynatmaImg,
  mastava: mastavaImg,
  achichuk: achichukImg,
  chiroqchi: chiroqchiImg,
  tomatli: tomatliImg,
  bahor: bahorImg,
  kampot: kampotImg,
  orik: orikImg,
  ayron: ayronImg,
};

const dishKeys = ["choyxona", "zigir", "qaynatma", "mastava", "achichuk", "chiroqchi", "tomatli", "bahor", "kampot", "orik", "ayron"] as const;
const categoryKeys = ["oshlar", "shorva", "salat", "ichimlik"] as const;
type CategoryKey = typeof categoryKeys[number];

export function SignatureDishes() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("oshlar");

  const dishes = dishKeys.map((key) => ({
    key,
    name: t(`menu.dishes.${key}.name`),
    description: t(`menu.dishes.${key}.description`),
    price: t(`menu.dishes.${key}.price`),
    category: t(`menu.dishes.${key}.category`) as CategoryKey,
    image: dishImages[key],
  }));

  const filtered = dishes.filter((d) => d.category === activeCategory);

  const handleOrderClick = () => {
    const reservationSection = document.querySelector("#reservation");
    if (reservationSection) {
      reservationSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="menu" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-sans text-sm font-medium uppercase tracking-widest text-primary mb-3 block">
            {t("menu.label")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">
            {t("menu.title")}
          </h2>
          <div className="h-px w-24 bg-primary mx-auto opacity-30" />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categoryKeys.map((cat) => (
            <button
              key={cat}
              data-testid={`tab-category-${cat}`}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-sm font-medium px-6 py-2.5 rounded-full border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-transparent text-foreground/60 border-border hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {t(`menu.categories.${cat}`)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((dish) => (
              <motion.div
                key={dish.key}
                variants={itemVariants}
                className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col"
                data-testid={`card-dish-${dish.key}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <h3 className="font-serif text-2xl font-medium text-card-foreground">{dish.name}</h3>
                    <span className="font-sans font-semibold text-primary whitespace-nowrap">{dish.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed font-sans mb-6 flex-grow">
                    {dish.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                    onClick={handleOrderClick}
                    data-testid={`button-order-${dish.key}`}
                  >
                    {t("menu.order")}
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
