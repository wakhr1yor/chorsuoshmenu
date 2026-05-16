import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(9, "Please enter a valid phone number"),
  guests: z.string().min(1, "Please select number of guests"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().optional(),
});

export function Reservation() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      guests: "",
      date: "",
      time: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Reservation Confirmed",
      description: `Thank you ${values.name}! We look forward to welcoming you on ${values.date} at ${values.time}.`,
    });
    form.reset();
  }

  return (
    <section id="reservation" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-card rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Decorative Side */}
          <div className="w-full md:w-2/5 bg-primary text-primary-foreground p-12 flex flex-col justify-center items-start">
            <span className="font-sans text-xs font-medium uppercase tracking-widest text-primary-foreground/70 mb-2">Book a Table</span>
            <h2 className="font-serif text-4xl font-medium mb-6">Join Our Feast</h2>
            <p className="font-sans text-sm font-light text-primary-foreground/90 leading-relaxed mb-8">
              Reserve your table for family gatherings, business lunches, or romantic dinners. For parties larger than 10, please contact us directly.
            </p>
            <div className="space-y-4 text-sm font-sans">
              <p><strong className="font-medium block">Working Hours:</strong> Mon-Sun: 08:00 - 22:00</p>
              <p><strong className="font-medium block">Phone:</strong> +998 71 234 5678</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="w-full md:w-3/5 p-8 md:p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-background border-input" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+998 XX XXX XX XX" type="tel" className="bg-background border-input" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guests</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background border-input">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-2">1-2 People</SelectItem>
                            <SelectItem value="3-5">3-5 People</SelectItem>
                            <SelectItem value="6-10">6-10 People</SelectItem>
                            <SelectItem value="10+">10+ People</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" className="bg-background border-input" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input type="time" className="bg-background border-input" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Requests</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any dietary requirements or special occasions?" 
                          className="resize-none bg-background border-input" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-12 text-base font-medium">
                  Confirm Reservation
                </Button>
              </form>
            </Form>
          </div>

        </div>
      </div>
    </section>
  );
}
