import { motion } from "framer-motion";
import { Leaf, Award, Clock, Users, Flame, Utensils } from "lucide-react";
import { useTranslation } from "react-i18next";

export function WhyChooseUs() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Leaf,
      title: t("why.features.fresh.title"),
      description: t("why.features.fresh.description"),
    },
    {
      icon: Award,
      title: t("why.features.halal.title"),
      description: t("why.features.halal.description"),
    },
    {
      icon: Flame,
      title: t("why.features.traditional.title"),
      description: t("why.features.traditional.description"),
    },
    {
      icon: Users,
      title: t("why.features.family.title"),
      description: t("why.features.family.description"),
    },
    {
      icon: Clock,
      title: t("why.features.fast.title"),
      description: t("why.features.fast.description"),
    },
    {
      icon: Utensils,
      title: t("why.features.catering.title"),
      description: t("why.features.catering.description"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-sm font-medium uppercase tracking-widest text-primary mb-3 block">{t("why.label")}</span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">{t("why.title")}</h2>
          <div className="h-px w-24 bg-primary mx-auto opacity-30" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="bg-card p-8 rounded-2xl border border-border flex flex-col items-center text-center shadow-sm"
              >
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-medium text-card-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}