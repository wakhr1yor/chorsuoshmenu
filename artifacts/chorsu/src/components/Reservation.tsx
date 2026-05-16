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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  
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
      title: t("reservation.success.title"),
      description: t("reservation.success.description", { name: values.name, date: values.date, time: values.time }),
    });
    form.reset();
  }

  return (
    <section id="reservation" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-card rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Decorative Side */}
          <div className="w-full md:w-2/5 bg-primary text-primary-foreground p-12 flex flex-col justify-center items-start">
            <span className="font-sans text-xs font-medium uppercase tracking-widest text-primary-foreground/70 mb-2">{t("reservation.label")}</span>
            <h2 className="font-serif text-4xl font-medium mb-6">{t("reservation.title")}</h2>
            <p className="font-sans text-sm font-light text-primary-foreground/90 leading-relaxed mb-8">
              {t("reservation.description")}
            </p>
            <div className="space-y-4 text-sm font-sans">
              <p><strong className="font-medium block">{t("reservation.workingHours")}</strong> {t("reservation.workingHoursValue")}</p>
              <p><strong className="font-medium block">{t("reservation.phone")}</strong> +998 71 234 5678</p>
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
                        <FormLabel>{t("reservation.fields.name")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("reservation.fields.namePlaceholder")} className="bg-background border-input" {...field} />
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
                        <FormLabel>{t("reservation.fields.phone")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("reservation.fields.phonePlaceholder")} type="tel" className="bg-background border-input" {...field} />
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
                        <FormLabel>{t("reservation.fields.guests")}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background border-input">
                              <SelectValue placeholder={t("reservation.fields.guestsPlaceholder")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-2">{t("reservation.guestOptions.1-2")}</SelectItem>
                            <SelectItem value="3-5">{t("reservation.guestOptions.3-5")}</SelectItem>
                            <SelectItem value="6-10">{t("reservation.guestOptions.6-10")}</SelectItem>
                            <SelectItem value="10+">{t("reservation.guestOptions.10+")}</SelectItem>
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
                        <FormLabel>{t("reservation.fields.date")}</FormLabel>
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
                        <FormLabel>{t("reservation.fields.time")}</FormLabel>
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
                      <FormLabel>{t("reservation.fields.notes")}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={t("reservation.fields.notesPlaceholder")} 
                          className="resize-none bg-background border-input" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-12 text-base font-medium">
                  {t("reservation.fields.submit")}
                </Button>
              </form>
            </Form>
          </div>

        </div>
      </div>
    </section>
  );
}