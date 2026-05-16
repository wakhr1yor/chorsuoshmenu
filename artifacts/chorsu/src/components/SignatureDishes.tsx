import { motion } from "framer-motion";
import ferganaOshImg from "@/assets/fergana-osh.png";
import samarkandOshImg from "@/assets/samarkand-osh.png";
import shurvaImg from "@/assets/shurva.png";
import mastavaImg from "@/assets/mastava.png";
import achichukImg from "@/assets/achichuk-salat.png";
import kokSalatImg from "@/assets/kok-salat.png";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function SignatureDishes() {
  const { t } = useTranslation();
  
  const dishes = [
    {
      name: t("menu.dishes.fergana.name"),
      description: t("menu.dishes.fergana.description"),
      price: t("menu.dishes.fergana.price"),
      image: ferganaOshImg,
    },
    {
      name: t("menu.dishes.samarkand.name"),
      description: t("menu.dishes.samarkand.description"),
      price: t("menu.dishes.samarkand.price"),
      image: samarkandOshImg,
    },
    {
      name: t("menu.dishes.shurva.name"),
      description: t("menu.dishes.shurva.description"),
      price: t("menu.dishes.shurva.price"),
      image: shurvaImg,
    },
    {
      name: t("menu.dishes.mastava.name"),
      description: t("menu.dishes.mastava.description"),
      price: t("menu.dishes.mastava.price"),
      image: mastavaImg,
    },
    {
      name: t("menu.dishes.achichuk.name"),
      description: t("menu.dishes.achichuk.description"),
      price: t("menu.dishes.achichuk.price"),
      image: achichukImg,
    },
    {
      name: t("menu.dishes.kok.name"),
      description: t("menu.dishes.kok.description"),
      price: t("menu.dishes.kok.price"),
      image: kokSalatImg,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const handleOrderClick = () => {
    const reservationSection = document.querySelector("#reservation");
    if (reservationSection) {
      reservationSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="menu" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-sm font-medium uppercase tracking-widest text-primary mb-3 block">{t("menu.label")}</span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">{t("menu.title")}</h2>
          <div className="h-px w-24 bg-primary mx-auto opacity-30" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {dishes.map((dish, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col"
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
                >
                  {t("menu.order")}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}