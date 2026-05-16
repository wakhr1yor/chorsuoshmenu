import { motion } from "framer-motion";
import ferganaOshImg from "@/assets/fergana-osh.png";
import samarkandOshImg from "@/assets/samarkand-osh.png";
import shurvaImg from "@/assets/shurva.png";
import mastavaImg from "@/assets/mastava.png";
import achichukImg from "@/assets/achichuk-salat.png";
import kokSalatImg from "@/assets/kok-salat.png";
import { Button } from "@/components/ui/button";

const dishes = [
  {
    name: "Fergana Osh",
    description: "Classic Fergana-style plov with lamb, carrots, and chickpeas.",
    price: "65,000 so'm",
    image: ferganaOshImg,
  },
  {
    name: "Samarkand Osh",
    description: "Samarkand-style plov with whole garlic head layered to perfection.",
    price: "70,000 so'm",
    image: samarkandOshImg,
  },
  {
    name: "Shurva",
    description: "Rich lamb rib soup with fresh vegetables in golden broth.",
    price: "35,000 so'm",
    image: shurvaImg,
  },
  {
    name: "Mastava",
    description: "Hearty Uzbek rice and vegetable soup with sour cream.",
    price: "25,000 so'm",
    image: mastavaImg,
  },
  {
    name: "Achichuk Salat",
    description: "Freshly sliced tomato, onion, and basil salad. Perfect with plov.",
    price: "15,000 so'm",
    image: achichukImg,
  },
  {
    name: "Ko'k Salat",
    description: "Crisp, vibrant green herb salad with radishes and cucumbers.",
    price: "12,000 so'm",
    image: kokSalatImg,
  },
];

export function SignatureDishes() {
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
          <span className="font-sans text-sm font-medium uppercase tracking-widest text-primary mb-3 block">Menu</span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">Signature Dishes</h2>
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
                  Order
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
