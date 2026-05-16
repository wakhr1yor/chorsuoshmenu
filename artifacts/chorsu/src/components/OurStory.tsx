import { motion } from "framer-motion";
import storyImg from "@/assets/story-kitchen.png";

export function OurStory() {
  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <span className="font-sans text-sm font-medium uppercase tracking-widest text-primary mb-3 block">Our Story</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-8">
              Heritage in Every Grain
            </h2>
            
            <div className="space-y-6 font-sans text-lg text-muted-foreground leading-relaxed font-light">
              <p>
                Since 1995, Chorsu Osh Markazi has served the most beloved Uzbek plov in the heart of Tashkent. 
              </p>
              <p>
                Our master oshpaz (plov chef) follows century-old recipes passed down through generations — fresh lamb, fragrant rice, golden carrots, and the perfect blend of spices, cooked over an open wood fire in our signature cast iron kazan.
              </p>
              <p>
                Every plate is a celebration of Uzbek hospitality. We invite you to sit at our table and experience the true taste of tradition.
              </p>
            </div>
            
            <div className="mt-10">
              <img src="/favicon.svg" alt="Uzbek Ornament" className="w-12 h-12 opacity-40 text-primary" style={{ filter: "invert(35%) sepia(50%) saturate(733%) hue-rotate(349deg) brightness(85%) contrast(90%)" }} />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
              <img 
                src={storyImg} 
                alt="Master chef cooking plov" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-black/10 rounded-3xl mix-blend-overlay"></div>
            </div>
            {/* Decorative background element */}
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl -z-10 transform translate-x-4 translate-y-4"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
