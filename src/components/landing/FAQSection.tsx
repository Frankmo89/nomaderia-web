import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { faqs, getFAQsByCategory, type FAQ } from '@/data/landing/faqs';

const categories = [
  { value: 'general', label: 'General' },
  { value: 'booking', label: 'Reservas' },
  { value: 'preparation', label: 'Preparación' },
  { value: 'safety', label: 'Seguridad' },
  { value: 'payments', label: 'Pagos' }
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#E8744F]/10 text-[#E8744F] text-sm font-bold tracking-widest uppercase mb-4">
            Preguntas Frecuentes
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A2540] mb-6">
            Todo lo que necesitas saber
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Respuestas claras a las preguntas más comunes. Si no encuentras lo que 
            buscas, contáctanos directamente.
          </p>
        </motion.div>

        {/* FAQs with Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 h-auto">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.value} 
                  value={category.value}
                  className="py-3"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => {
              const categoryFAQs = getFAQsByCategory(category.value as FAQ['category']);
              
              return (
                <TabsContent key={category.value} value={category.value}>
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {categoryFAQs.map((faq, index) => (
                      <AccordionItem 
                        key={faq.id} 
                        value={faq.id}
                        className="border border-gray-200 rounded-lg px-6 data-[state=open]:border-[#E8744F] data-[state=open]:bg-[#E8744F]/5 transition-all"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-6">
                          <span className="font-semibold text-[#0A2540] pr-4">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700 pb-6 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              );
            })}
          </Tabs>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center bg-gradient-to-r from-gray-50 to-white rounded-2xl p-12 border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-[#0A2540] mb-4">
            ¿Tienes más preguntas?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nuestro equipo está listo para ayudarte. Agenda una llamada gratuita 
            de 30 minutos para resolver todas tus dudas.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#E8744F] text-white font-semibold hover:bg-[#E8744F]/90 transition-colors"
            >
              Agendar Llamada Gratuita
            </a>
            <a 
              href="mailto:hola@nomaderia.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-[#E8744F] text-[#E8744F] font-semibold hover:bg-[#E8744F] hover:text-white transition-colors"
            >
              Enviar Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
