import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";

export function Branches() {
  const branches = [
    {
      name: "Chorsu Branch",
      address: "Chorsu Bazaar, Tashkent",
      hours: "08:00–22:00",
      phone: "+998 71 234 5678",
    },
    {
      name: "Yunusobod Branch",
      address: "Yunusobod district, Tashkent",
      hours: "08:00–22:00",
      phone: "+998 71 234 5679",
    },
    {
      name: "Mirzo Ulugbek Branch",
      address: "Mirzo Ulugbek district, Tashkent",
      hours: "08:00–21:00",
      phone: "+998 71 234 5680",
    },
  ];

  return (
    <section id="branches" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-sm font-medium uppercase tracking-widest text-primary mb-3 block">Locations</span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">Find a Branch</h2>
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
                  <span>{branch.hours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span>{branch.phone}</span>
                </div>
              </div>
              
              <div className="mt-8">
                <a 
                  href="#" 
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors uppercase tracking-wider"
                >
                  Get Directions <span className="ml-2">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
