import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, DollarSign, Download, RotateCcw, ChevronDown, Mail, MessageCircle, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FormData } from './AdventureForm';
import ConsultationModal from './ConsultationModal';
import jsPDF from 'jspdf';

interface Day {
  day: number;
  title: string;
  location: string;
  activities: string[];
  accommodation: string;
  meals: string[];
  highlights: string[];
}

interface ItineraryData {
  itinerary_text?: string;
  equipment_needed?: string;
  budget_breakdown?: string;
  titulo?: string;
  contactos?: string;
  days?: Array<{
    day: number;
    title: string;
    location: string;
    activities: string[];
    accommodation: string;
    highlights: string[];
  }>;
}

interface ItineraryResultsProps {
  formData: FormData;
  itineraryData?: ItineraryData | null;
  onRestart: () => void;
}

const locationNames: Record<string, string> = {
  tecate: 'Tecate, Baja California',
  yosemite: 'Yosemite, California',
  tahoe: 'Lake Tahoe, California/Nevada',
  joshua: 'Joshua Tree, California',
  guadalupe: 'Valle de Guadalupe, Baja California',
  otra: 'Destino Personalizado',
};

const experienceNames: Record<string, string> = {
  principiante: 'Principiante',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
};

export default function ItineraryResults({ formData, itineraryData, onRestart }: ItineraryResultsProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const getLocationName = () => {
    if (formData.preferred_location === 'otra') {
      return formData.other_location || 'Destino Personalizado';
    }
    return locationNames[formData.preferred_location] || formData.preferred_location;
  };

  const getDurationDays = () => {
    switch (formData.trip_duration) {
      case '1-3': return 3;
      case '4-7': return 7;
      case '8-14': return 14;
      case '15+': return 21;
      default: return 5;
    }
  };

  const generateItinerary = (): Day[] => {
    // Use itinerary data from n8n if available
    if (itineraryData?.days && itineraryData.days.length > 0) {
      return itineraryData.days.map(day => ({
        ...day,
        meals: ['Desayuno', 'Almuerzo de Ruta', 'Cena'],
      }));
    }

    // Fallback to mock data
    const duration = getDurationDays();
    const days: Day[] = [];
    const location = getLocationName();

    for (let i = 1; i <= Math.min(duration, 7); i++) {
      days.push({
        day: i,
        title: `Día ${i}: ${i === 1 ? 'Llegada y Preparación' : i === Math.min(duration, 7) ? 'Cumbre y Regreso' : `Exploración ${i}`}`,
        location: `${location} - Zona ${i}`,
        activities: [
          `Mañana: ${i === 1 ? 'Revisión de equipo y orientación' : 'Senderismo (10-13 km)'}`,
          `Tarde: ${i === 1 ? 'Caminata corta de aclimatación' : 'Exploración de miradores'}`,
          `Noche: ${i === 1 ? 'Preparación del campamento y cena' : 'Fogata y observación de estrellas'}`,
        ],
        accommodation: i === 1 || i === Math.min(duration, 7) ? 'Refugio del Campamento Base' : 'Campamento en la Naturaleza',
        meals: ['Desayuno', 'Almuerzo de Ruta', 'Cena'],
        highlights: [
          `Impresionantes vistas de ${location}`,
          'Oportunidades de avistar vida silvestre',
          'Lugares para fotografía',
        ],
      });
    }
    return days;
  };

  const itinerary = generateItinerary();

  const budgetBreakdown = {
    transporte: Math.round(formData.budget_usd * 0.25),
    alojamiento: Math.round(formData.budget_usd * 0.30),
    comida: Math.round(formData.budget_usd * 0.20),
    actividades: Math.round(formData.budget_usd * 0.15),
    equipo: Math.round(formData.budget_usd * 0.10),
  };

  const equipmentList = [
    'Mochila de senderismo (40-60L)',
    'Tienda de campaña',
    'Saco de dormir',
    'Botas de senderismo',
    'Ropa técnica',
    'Linterna frontal',
    'Botiquín de primeros auxilios',
    'Filtro de agua',
    'Bastones de trekking',
    'Protector solar y repelente',
  ];

  const handleDownload = async () => {
    setIsGeneratingPDF(true);
    
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      let yPosition = margin;

      // Helper function to add new page if needed
      const checkNewPage = (requiredSpace: number) => {
        if (yPosition + requiredSpace > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
          return true;
        }
        return false;
      };

      // Helper function to wrap text
      const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number = 7) => {
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach((line: string) => {
          checkNewPage(lineHeight);
          doc.text(line, x, yPosition);
          yPosition += lineHeight;
        });
        return yPosition;
      };

      // Header - Title
      doc.setFillColor(10, 37, 64); // #0A2540
      doc.rect(0, 0, pageWidth, 45, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('NOMADERIA', margin, 20);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Tu Aventura Personalizada', margin, 30);
      
      doc.setFontSize(10);
      doc.text(`Generado para: ${formData.client_name}`, margin, 38);

      yPosition = 55;

      // Trip Title
      doc.setTextColor(10, 37, 64);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      const title = itineraryData?.titulo || `Aventura en ${getLocationName()}`;
      addWrappedText(title, margin, yPosition, contentWidth, 8);
      yPosition += 5;

      // Trip Summary Box
      doc.setFillColor(248, 246, 243); // #F8F6F3
      doc.roundedRect(margin, yPosition, contentWidth, 35, 3, 3, 'F');
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 107, 53); // #FF6B35
      doc.text('RESUMEN DEL VIAJE', margin + 5, yPosition + 8);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(44, 62, 80);
      doc.setFontSize(9);
      
      const summaryY = yPosition + 16;
      doc.text(`Destino: ${getLocationName()}`, margin + 5, summaryY);
      doc.text(`Duración: ${formData.trip_duration} días`, margin + 5, summaryY + 6);
      doc.text(`Presupuesto: $${formData.budget_usd.toLocaleString()} USD`, margin + 80, summaryY);
      doc.text(`Grupo: ${formData.group_size} persona${formData.group_size > 1 ? 's' : ''}`, margin + 80, summaryY + 6);
      doc.text(`Nivel: ${experienceNames[formData.experience_level] || formData.experience_level}`, margin + 140, summaryY);
      
      yPosition += 45;

      // Itinerary Text from n8n (if available)
      if (itineraryData?.itinerary_text) {
        checkNewPage(30);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(10, 37, 64);
        doc.text('[*] Resumen del Itinerario', margin, yPosition);
        yPosition += 10;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(44, 62, 80);
        addWrappedText(itineraryData.itinerary_text, margin, yPosition, contentWidth, 6);
        yPosition += 10;
      }

      // Day by Day Itinerary
      checkNewPage(30);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(10, 37, 64);
      doc.text('[*] Itinerario Dia a Dia', margin, yPosition);
      yPosition += 10;

      itinerary.forEach((day) => {
        checkNewPage(50);
        
        // Day header
        doc.setFillColor(255, 107, 53); // #FF6B35
        doc.roundedRect(margin, yPosition, contentWidth, 8, 2, 2, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`DÍA ${day.day}`, margin + 3, yPosition + 5.5);
        yPosition += 12;

        // Day title
        doc.setTextColor(10, 37, 64);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        addWrappedText(day.title, margin, yPosition, contentWidth, 6);
        
        // Location
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(`[L] ${day.location}`, margin, yPosition);
        yPosition += 6;

        // Activities
        doc.setTextColor(44, 62, 80);
        doc.setFontSize(9);
        day.activities.forEach((activity) => {
          checkNewPage(8);
          doc.text(`• ${activity}`, margin + 5, yPosition);
          yPosition += 5;
        });

        // Accommodation
        checkNewPage(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Alojamiento:', margin, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.text(day.accommodation, margin + 25, yPosition);
        yPosition += 10;
      });

      // Equipment Section
      checkNewPage(40);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(10, 37, 64);
      doc.text('[E] Equipo Necesario', margin, yPosition);
      yPosition += 10;

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(44, 62, 80);

      if (itineraryData?.equipment_needed) {
        addWrappedText(itineraryData.equipment_needed, margin, yPosition, contentWidth, 5);
      } else {
        equipmentList.forEach((item) => {
          checkNewPage(6);
          doc.text(`[+] ${item}`, margin + 5, yPosition);
          yPosition += 5;
        });
      }
      yPosition += 10;

      // Budget Breakdown
      checkNewPage(50);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(10, 37, 64);
      doc.text('[*] Desglose de Presupuesto', margin, yPosition);
      yPosition += 10;

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(44, 62, 80);

      if (itineraryData?.budget_breakdown) {
        addWrappedText(itineraryData.budget_breakdown, margin, yPosition, contentWidth, 5);
      } else {
        Object.entries(budgetBreakdown).forEach(([key, value]) => {
          checkNewPage(6);
          doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}:`, margin + 5, yPosition);
          doc.text(`$${value.toLocaleString()} USD`, margin + 50, yPosition);
          yPosition += 6;
        });
        yPosition += 3;
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 107, 53);
        doc.text(`TOTAL: $${formData.budget_usd.toLocaleString()} USD`, margin + 5, yPosition);
      }
      yPosition += 10;

      // Contacts Section (if available)
      if (itineraryData?.contactos) {
        checkNewPage(30);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(10, 37, 64);
        doc.text('[C] Contactos de Emergencia', margin, yPosition);
        yPosition += 10;

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(44, 62, 80);
        addWrappedText(itineraryData.contactos, margin, yPosition, contentWidth, 5);
      }

      // Footer on last page
      const footerY = pageHeight - 15;
      doc.setFillColor(10, 37, 64);
      doc.rect(0, footerY - 5, pageWidth, 20, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text('Generado por Nomaderia - Tu próxima aventura comienza aquí', margin, footerY + 3);
      doc.text(`${formData.client_email}`, pageWidth - margin - 50, footerY + 3);

      // Save the PDF
      const fileName = `Nomaderia_Itinerario_${getLocationName().replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor intenta de nuevo.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleShare = () => {
    const text = `¡Mira mi itinerario de aventura en ${getLocationName()}! Generado con Nomaderia.`;
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  const handleEmail = () => {
    alert('El itinerario será enviado a: ' + formData.client_email);
  };

  const handleConsultation = () => {
    setIsConsultationOpen(true);
  };

  return (
    <>
    <section className="min-h-screen bg-[#F8F6F3] noise-texture py-24 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-mono text-sm uppercase tracking-wider text-[#E8744F] font-semibold mb-4">
            ¡Hola {formData.client_name}!
          </p>
          <h1 className="text-display text-4xl sm:text-5xl md:text-6xl font-black text-[#0A2540] mb-6">
            {itineraryData?.titulo || `Tu aventura personalizada en ${getLocationName()}`}
          </h1>
          <p className="text-xl text-[#2C3E50]/70 max-w-2xl mx-auto">
            Hemos creado un itinerario único basado en tus preferencias.
          </p>
        </motion.div>

        {/* Trip Summary Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-[#0A2540] rounded-2xl p-8 mb-12 text-white"
        >
          <h2 className="text-heading text-2xl font-bold mb-6">📊 TU PLAN DE AVENTURA</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div>
              <p className="text-white/60 text-sm mb-1">Destino</p>
              <p className="font-semibold">{getLocationName()}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Duración</p>
              <p className="font-semibold">{formData.trip_duration} días</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Presupuesto</p>
              <p className="font-semibold">${formData.budget_usd.toLocaleString()} USD</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Nivel</p>
              <p className="font-semibold">{experienceNames[formData.experience_level]}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Grupo</p>
              <p className="font-semibold">{formData.group_size} persona{formData.group_size > 1 ? 's' : ''}</p>
            </div>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <Card className="p-6 bg-white shadow-[0_4px_24px_rgba(10,37,64,0.08)]">
            <Calendar className="w-8 h-8 text-[#E8744F] mb-3" />
            <p className="text-mono text-xs uppercase tracking-wider text-[#2C3E50]/60 mb-1">Duración</p>
            <p className="text-xl font-bold text-[#0A2540]">{itinerary.length} Días</p>
          </Card>
          <Card className="p-6 bg-white shadow-[0_4px_24px_rgba(10,37,64,0.08)]">
            <MapPin className="w-8 h-8 text-[#E8744F] mb-3" />
            <p className="text-mono text-xs uppercase tracking-wider text-[#2C3E50]/60 mb-1">Destino</p>
            <p className="text-lg font-bold text-[#0A2540]">{getLocationName().split(',')[0]}</p>
          </Card>
          <Card className="p-6 bg-white shadow-[0_4px_24px_rgba(10,37,64,0.08)]">
            <Users className="w-8 h-8 text-[#E8744F] mb-3" />
            <p className="text-mono text-xs uppercase tracking-wider text-[#2C3E50]/60 mb-1">Grupo</p>
            <p className="text-xl font-bold text-[#0A2540]">{formData.group_size} persona{formData.group_size > 1 ? 's' : ''}</p>
          </Card>
          <Card className="p-6 bg-white shadow-[0_4px_24px_rgba(10,37,64,0.08)]">
            <DollarSign className="w-8 h-8 text-[#E8744F] mb-3" />
            <p className="text-mono text-xs uppercase tracking-wider text-[#2C3E50]/60 mb-1">Presupuesto</p>
            <p className="text-xl font-bold text-[#0A2540]">${formData.budget_usd.toLocaleString()}</p>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          <Button onClick={handleDownload} disabled={isGeneratingPDF} className="bg-[#2D5F3F] hover:bg-[#E8744F] text-white py-6 disabled:opacity-50">
            {isGeneratingPDF ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Descargar PDF
              </>
            )}
          </Button>
          <Button onClick={handleShare} className="bg-[#25D366] hover:bg-[#20BD5A] text-white py-6">
            <MessageCircle className="w-5 h-5 mr-2" />
            Compartir WhatsApp
          </Button>
          <Button onClick={handleEmail} variant="outline" className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white py-6">
            <Mail className="w-5 h-5 mr-2" />
            Enviar a mi email
          </Button>
          <Button onClick={handleConsultation} variant="outline" className="border-[#E8744F] text-[#E8744F] hover:bg-[#E8744F] hover:text-white py-6">
            <User className="w-5 h-5 mr-2" />
            Agendar asesoría
          </Button>
        </motion.div>

        {/* Itinerary Timeline */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mb-16">
          <h2 className="text-heading text-3xl font-bold text-[#0A2540] mb-8">📅 Itinerario Día a Día</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#E8744F]/20 hidden md:block" />
            {itinerary.map((day, index) => (
              <motion.div key={day.day} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }} className="relative mb-8 last:mb-0">
                <div className="absolute left-8 top-8 w-4 h-4 rounded-full bg-[#E8744F] border-4 border-[#F8F6F3] hidden md:block -translate-x-1/2" />
                <div className="md:ml-24">
                  <Card className={`bg-white shadow-[0_4px_24px_rgba(10,37,64,0.08)] overflow-hidden cursor-pointer transition-all duration-300 ${expandedDay === day.day ? 'shadow-[0_8px_32px_rgba(10,37,64,0.12)]' : ''}`} onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}>
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-mono text-sm uppercase tracking-wider text-[#E8744F] font-semibold mb-2">Día {day.day}</p>
                          <h3 className="text-heading text-2xl font-bold text-[#0A2540] mb-2">{day.title}</h3>
                          <p className="text-[#2C3E50]/70 flex items-center gap-2"><MapPin className="w-4 h-4" />{day.location}</p>
                        </div>
                        <motion.div animate={{ rotate: expandedDay === day.day ? 180 : 0 }} transition={{ duration: 0.3 }}>
                          <ChevronDown className="w-6 h-6 text-[#E8744F]" />
                        </motion.div>
                      </div>
                      {expandedDay === day.day && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.3 }} className="mt-6 pt-6 border-t border-gray-200">
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-heading font-semibold text-[#0A2540] mb-3">Actividades</h4>
                              <ul className="space-y-2">
                                {day.activities.map((activity, i) => (<li key={i} className="text-[#2C3E50]/80 flex items-start gap-2"><span className="text-[#E8744F] mt-1">•</span>{activity}</li>))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-heading font-semibold text-[#0A2540] mb-3">Alojamiento</h4>
                              <p className="text-[#2C3E50]/80">{day.accommodation}</p>
                            </div>
                            <div>
                              <h4 className="text-heading font-semibold text-[#0A2540] mb-3">Destacados</h4>
                              <ul className="space-y-2">
                                {day.highlights.map((highlight, i) => (<li key={i} className="text-[#2C3E50]/80 flex items-start gap-2"><span className="text-[#2D5F3F] mt-1">✓</span>{highlight}</li>))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Itinerary Text from n8n */}
        {itineraryData?.itinerary_text && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }} className="mb-16">
            <h2 className="text-heading text-3xl font-bold text-[#0A2540] mb-8">📝 Resumen del Itinerario</h2>
            <Card className="bg-white shadow-[0_4px_24px_rgba(10,37,64,0.08)] p-8">
              <div className="prose prose-lg max-w-none text-[#2C3E50] whitespace-pre-wrap">
                {itineraryData.itinerary_text}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Equipment Section */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="mb-16">
          <h2 className="text-heading text-3xl font-bold text-[#0A2540] mb-8">🎒 Equipo Necesario</h2>
          <Card className="bg-white shadow-[0_4px_24px_rgba(10,37,64,0.08)] p-8">
            {itineraryData?.equipment_needed ? (
              <div className="prose prose-lg max-w-none text-[#2C3E50] whitespace-pre-wrap">
                {itineraryData.equipment_needed}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {equipmentList.map((item, index) => (<div key={index} className="flex items-center gap-3"><span className="text-[#E8744F]">✓</span><span className="text-[#2C3E50]">{item}</span></div>))}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Budget Breakdown */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="mb-16">
          <h2 className="text-heading text-3xl font-bold text-[#0A2540] mb-8">💰 Desglose de Presupuesto</h2>
          <Card className="bg-white shadow-[0_4px_24px_rgba(10,37,64,0.08)] p-8">
            {itineraryData?.budget_breakdown ? (
              <div className="prose prose-lg max-w-none text-[#2C3E50] whitespace-pre-wrap">
                {itineraryData.budget_breakdown}
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(budgetBreakdown).map(([key, value]) => (<div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"><span className="text-[#2C3E50] capitalize text-lg">{key}</span><span className="font-bold text-[#0A2540] text-lg">${value.toLocaleString()} USD</span></div>))}
                <div className="flex items-center justify-between pt-4 border-t-2 border-[#0A2540]">
                  <span className="text-[#0A2540] font-bold text-xl">Total</span>
                  <span className="font-black text-[#E8744F] text-2xl">${formData.budget_usd.toLocaleString()} USD</span>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Contacts Section from n8n */}
        {itineraryData?.contactos && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.75 }} className="mb-16">
            <h2 className="text-heading text-3xl font-bold text-[#0A2540] mb-8">📞 Guías y Contactos de Emergencia</h2>
            <Card className="bg-white shadow-[0_4px_24px_rgba(10,37,64,0.08)] p-8">
              <div className="prose prose-lg max-w-none text-[#2C3E50] whitespace-pre-wrap">
                {itineraryData.contactos}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Restart Button */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="text-center">
          <Button onClick={onRestart} variant="outline" className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white px-12 py-6 text-lg">
            <RotateCcw className="w-5 h-5 mr-2" />
            Planificar Otro Viaje
          </Button>
        </motion.div>
      </div>
    </section>

    {/* Consultation Modal */}
    <ConsultationModal
      isOpen={isConsultationOpen}
      onClose={() => setIsConsultationOpen(false)}
      clientName={formData.client_name}
      clientEmail={formData.client_email}
      clientPhone={formData.phone_whatsapp}
      tripDetails={{
        destination: formData.preferred_location === 'otra' ? formData.other_location : formData.preferred_location,
        duration: formData.trip_duration,
        budget: formData.budget_usd,
      }}
    />
    </>
  );
}
