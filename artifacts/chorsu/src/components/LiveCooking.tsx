import { motion } from "framer-motion";
import liveCookingImg from "@/assets/live-cooking.png";
import { useTranslation } from "react-i18next";

export function LiveCooking() {
  const { t } = useTranslation();

  const stats = [
    { value: "500+", label: t("cooking.stats.plov") },
    { value: "30+", label: t("cooking.stats.experience") },
    { value: "3", label: t("cooking.stats.locations") },
    { value: "10k+", label: t("cooking.stats.customers") },
  ];

  return (
    <section className="relative py-32 bg-zinc-950 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={liveCookingImg} 
          alt="Kazan cooking over fire" 
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-sans text-sm font-medium uppercase tracking-widest text-primary mb-3 block">{t("cooking.label")}</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6">{t("cooking.title")}</h2>
            <p className="font-sans text-lg text-white/70 leading-relaxed font-light">
              {t("cooking.description")}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="text-center px-4"
            >
              <div className="font-serif text-4xl md:text-5xl font-medium text-primary mb-2">{stat.value}</div>
              <div className="font-sans text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}