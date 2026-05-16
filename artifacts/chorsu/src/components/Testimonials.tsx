import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Testimonials() {
  const { t } = useTranslation();

  const reviews = [
    {
      name: t("testimonials.items.aziz.name"),
      rating: 5,
      text: t("testimonials.items.aziz.text"),
    },
    {
      name: t("testimonials.items.sarah.name"),
      type: t("testimonials.tourist"),
      rating: 5,
      text: t("testimonials.items.sarah.text"),
    },
    {
      name: t("testimonials.items.dilnoza.name"),
      rating: 5,
      text: t("testimonials.items.dilnoza.text"),
    },
    {
      name: t("testimonials.items.marco.name"),
      type: t("testimonials.tourist"),
      rating: 4,
      text: t("testimonials.items.marco.text"),
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-sm font-medium uppercase tracking-widest text-primary mb-3 block">{t("testimonials.label")}</span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">{t("testimonials.title")}</h2>
          <div className="h-px w-24 bg-primary mx-auto opacity-30" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-card p-6 rounded-2xl border border-border flex flex-col"
            >
              <div className="flex text-primary mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? "fill-primary" : "fill-none text-muted"}`} 
                  />
                ))}
              </div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-grow italic mb-6">
                "{review.text}"
              </p>
              <div>
                <p className="font-serif font-medium text-card-foreground">{review.name}</p>
                {review.type && (
                  <p className="font-sans text-xs text-muted-foreground">{review.type}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}