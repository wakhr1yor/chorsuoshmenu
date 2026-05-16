import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Branches() {
  const { t } = useTranslation();

  const branches = [
    {
      name: t("branches.items.chorsu.name"),
      address: t("branches.items.chorsu.address"),
      hours: t("branches.items.chorsu.hours"),
      phone: t("branches.items.chorsu.phone"),
    },
    {
      name: t("branches.items.yunusobod.name"),
      address: t("branches.items.yunusobod.address"),
      hours: t("branches.items.yunusobod.hours"),
      phone: t("branches.items.yunusobod.phone"),
    },
    {
      name: t("branches.items.mirzo.name"),
      address: t("branches.items.mirzo.address"),
      hours: t("branches.items.mirzo.hours"),
      phone: t("branches.items.mirzo.phone"),
    },
  ];

  return (
    <section id="branches" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-sm font-medium uppercase tracking-widest text-primary mb-3 block">{t("branches.label")}</span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">{t("branches.title")}</h2>
          <div className="h-px w-24 bg-primary mx-auto opacity-30" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branches.map((branch, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-card p-8 rounded-2xl border border-border shadow-sm flex flex-col"
            >
              <h3 className="font-serif text-2xl font-medium text-card-foreground mb-6 pb-4 border-b border-border">{branch.name}</h3>
              
              <div className="space-y-4 font-sans text-muted-foreground flex-grow">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{branch.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <span>
                    <span className="mr-1">{t("branches.hours_label")}:</span>
                    {branch.hours}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span>
                    <span className="mr-1">{t("branches.phone_label")}:</span>
                    {branch.phone}
                  </span>
                </div>
              </div>
              
              <div className="mt-8">
                <a 
                  href="#" 
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors uppercase tracking-wider"
                >
                  {t("branches.directions")} <span className="ml-2">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}