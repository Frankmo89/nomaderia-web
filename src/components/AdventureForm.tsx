import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface FormData {
  // Sección 1: Contacto
  clientname: string;
  clientemail: string;
  phonewhatsapp: string;
  leadsource: string;
  leadsourceother: string;
  
  // Sección 2: Logística base
  departurecity: string;
  departurecityother: string;
  docsstatus: string;
  vehicletype: string;
  
  // Sección 3: Destino
  primarydestination: string;
  secondarydestinations: string[];
  
  // Sección 4: Fechas y duración
  tripduration: string;
  dateflexibility: string;
  preferreddeparturedate: string;
  travelmonth: string;
  
  // Sección 5: Grupo y ritmo
  adultscount: number;
  childrencount: number;
  fitnesslevel: string;
  tripstyle: string;
  petsincluded: string;
  petsdetails: string;
  
  // Sección 6: Presupuesto y alojamiento
  budgetusdperperson: string;
  accommodationpreference: string;
  
  // Sección 7: Notas
  additionalnotes: string;
  
  // Metadata
  submissionid?: string;
  leadscore?: number;
}

interface AdventureFormProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
  isLoading: boolean;
}

// Opciones para selects
const leadSourceOptions = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'google', label: 'Google/búsqueda web' },
  { value: 'recomendacion', label: 'Recomendación' },
  { value: 'otro', label: 'Otro' },
];

const departureCityOptions = [
  { value: 'tijuana', label: 'Tijuana' },
  { value: 'mexicali', label: 'Mexicali' },
  { value: 'ensenada', label: 'Ensenada' },
  { value: 'tecate', label: 'Tecate' },
  { value: 'sandiego', label: 'San Diego CA' },
  { value: 'otra', label: 'Otra' },
];

const docsStatusOptions = [
  { value: 'visa_lista', label: 'Visa B1/B2 vigente (listo para I-94 si aplica)' },
  { value: 'visa_ayuda', label: 'Tengo visa pero necesito ayuda con I-94' },
  { value: 'sin_visa', label: 'No tengo visa' },
  { value: 'ciudadano_usa', label: 'Soy ciudadano/residente USA' },
];

const vehicleTypeOptions = [
  { value: 'auto_sedan', label: 'Auto propio sedán/compacto' },
  { value: 'auto_suv', label: 'Auto propio SUV/camioneta' },
  { value: 'rentar_mexico', label: 'Rentar auto en México' },
  { value: 'rentar_usa', label: 'Rentar auto en USA' },
  { value: 'no_se', label: 'Aún no sé' },
];

const primaryDestinationOptions = [
  { value: 'yosemite', label: 'Yosemite National Park' },
  { value: 'sequoia', label: 'Sequoia/Kings Canyon' },
  { value: 'joshua_tree', label: 'Joshua Tree' },
  { value: 'death_valley', label: 'Death Valley' },
  { value: 'grand_canyon', label: 'Grand Canyon South Rim' },
  { value: 'zion', label: 'Zion National Park' },
  { value: 'bryce', label: 'Bryce Canyon' },
  { value: 'no_seguro', label: 'No estoy seguro' },
];

const secondaryDestinationOptions = [
  { value: 'solo_uno', label: 'No, solo 1 destino' },
  { value: 'joshua_tree', label: 'Joshua Tree' },
  { value: 'death_valley', label: 'Death Valley' },
  { value: 'sequoia', label: 'Sequoia/Kings Canyon' },
  { value: 'zion', label: 'Zion' },
  { value: 'bryce', label: 'Bryce Canyon' },
];

const tripDurationOptions = [
  { value: '2-3', label: '2-3 días' },
  { value: '4-5', label: '4-5 días' },
  { value: '6-7', label: '6-7 días' },
  { value: '8-10', label: '8-10 días' },
  { value: '10+', label: 'Más de 10 días' },
];

const dateFlexibilityOptions = [
  { value: 'fijas', label: 'Fechas fijas' },
  { value: 'flexible_3', label: 'Flexible ±3 días' },
  { value: 'flexible_semana', label: 'Flexible 1 semana' },
  { value: 'muy_flexible', label: 'Muy flexible' },
];

const monthOptions = [
  { value: 'enero', label: 'Enero' },
  { value: 'febrero', label: 'Febrero' },
  { value: 'marzo', label: 'Marzo' },
  { value: 'abril', label: 'Abril' },
  { value: 'mayo', label: 'Mayo' },
  { value: 'junio', label: 'Junio' },
  { value: 'julio', label: 'Julio' },
  { value: 'agosto', label: 'Agosto' },
  { value: 'septiembre', label: 'Septiembre' },
  { value: 'octubre', label: 'Octubre' },
  { value: 'noviembre', label: 'Noviembre' },
  { value: 'diciembre', label: 'Diciembre' },
];

const fitnessLevelOptions = [
  { value: 'baja', label: 'Baja (3 km)' },
  { value: 'media', label: 'Media (5-10 km)' },
  { value: 'alta', label: 'Alta (10-15 km+)' },
];

const tripStyleOptions = [
  { value: 'relax', label: 'Modo Relax' },
  { value: 'explorador', label: 'Modo Explorador' },
  { value: 'reto', label: 'Modo Reto' },
  { value: 'desconexion', label: 'Modo Desconexión' },
];

const budgetOptions = [
  { value: 'menos_500', label: 'Menos de $500' },
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1000-2000', label: '$1,000 - $2,000' },
  { value: '2000-3500', label: '$2,000 - $3,500' },
  { value: '3500+', label: '$3,500+' },
  { value: 'no_se', label: 'Aún no lo sé' },
];

const accommodationOptions = [
  { value: 'camping_equipo', label: 'Camping (tengo equipo)' },
  { value: 'camping_sin_equipo', label: 'Camping (necesito equipo)' },
  { value: 'hoteles', label: 'Hoteles económicos' },
  { value: 'lodges', label: 'Lodges/cabañas' },
  { value: 'mixto', label: 'Mixto' },
];

// Función para generar ID único
const generateSubmissionId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `NOM-${timestamp}-${randomStr}`.toUpperCase();
};

// Función para calcular lead score
const calculateLeadScore = (data: FormData): number => {
  let score = 0;
  
  // Presupuesto (mayor presupuesto = mayor score)
  const budgetScores: Record<string, number> = {
    'menos_500': 10,
    '500-1000': 20,
    '1000-2000': 35,
    '2000-3500': 50,
    '3500+': 70,
    'no_se': 15,
  };
  score += budgetScores[data.budgetusdperperson] || 0;
  
  // Documentos listos
  if (data.docsstatus === 'visa_lista' || data.docsstatus === 'ciudadano_usa') {
    score += 15;
  } else if (data.docsstatus === 'visa_ayuda') {
    score += 10;
  }
  
  // Flexibilidad de fechas
  if (data.dateflexibility === 'muy_flexible') {
    score += 10;
  } else if (data.dateflexibility === 'flexible_semana') {
    score += 7;
  }
  
  // Duración del viaje
  const durationScores: Record<string, number> = {
    '2-3': 5,
    '4-5': 10,
    '6-7': 15,
    '8-10': 20,
    '10+': 25,
  };
  score += durationScores[data.tripduration] || 0;
  
  // Tamaño del grupo
  const totalPeople = data.adultscount + data.childrencount;
  if (totalPeople >= 4) {
    score += 15;
  } else if (totalPeople >= 2) {
    score += 10;
  }
  
  return Math.min(score, 100);
};

export default function AdventureForm({ onSubmit, onBack, isLoading }: AdventureFormProps) {
  const [formData, setFormData] = useState<FormData>({
    clientname: '',
    clientemail: '',
    phonewhatsapp: '',
    leadsource: '',
    leadsourceother: '',
    departurecity: '',
    departurecityother: '',
    docsstatus: '',
    vehicletype: '',
    primarydestination: '',
    secondarydestinations: [],
    tripduration: '',
    dateflexibility: '',
    preferreddeparturedate: '',
    travelmonth: '',
    adultscount: 1,
    childrencount: 0,
    fitnesslevel: '',
    tripstyle: '',
    petsincluded: '',
    petsdetails: '',
    budgetusdperperson: '',
    accommodationpreference: '',
    additionalnotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentSection, setCurrentSection] = useState(1);

  // Validación de email en tiempo real
  useEffect(() => {
    if (formData.clientemail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.clientemail)) {
        setErrors(prev => ({ ...prev, clientemail: 'Email inválido' }));
      } else {
        setErrors(prev => {
          const { clientemail, ...rest } = prev;
          return rest;
        });
      }
    }
  }, [formData.clientemail]);

  const handleSecondaryDestinationChange = (value: string, checked: boolean) => {
    if (value === 'solo_uno') {
      if (checked) {
        setFormData({ ...formData, secondarydestinations: ['solo_uno'] });
      } else {
        setFormData({ ...formData, secondarydestinations: [] });
      }
    } else {
      if (formData.secondarydestinations.includes('solo_uno')) {
        return; // No permitir seleccionar otros si "solo 1 destino" está seleccionado
      }
      
      if (checked) {
        if (formData.secondarydestinations.length < 2) {
          setFormData({ 
            ...formData, 
            secondarydestinations: [...formData.secondarydestinations, value] 
          });
        }
      } else {
        setFormData({ 
          ...formData, 
          secondarydestinations: formData.secondarydestinations.filter(d => d !== value) 
        });
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Sección 1
    if (!formData.clientname || formData.clientname.length < 3) {
      newErrors.clientname = 'Nombre debe tener al menos 3 caracteres';
    }
    if (!formData.clientemail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientemail)) {
      newErrors.clientemail = 'Email inválido';
    }
    if (!formData.phonewhatsapp) {
      newErrors.phonewhatsapp = 'WhatsApp es requerido';
    }
    if (!formData.leadsource) {
      newErrors.leadsource = 'Selecciona cómo nos conociste';
    }
    if (formData.leadsource === 'otro' && !formData.leadsourceother) {
      newErrors.leadsourceother = 'Especifica cómo nos conociste';
    }
    
    // Sección 2
    if (!formData.departurecity) {
      newErrors.departurecity = 'Selecciona tu ciudad de salida';
    }
    if (formData.departurecity === 'otra' && !formData.departurecityother) {
      newErrors.departurecityother = 'Especifica tu ciudad';
    }
    if (!formData.docsstatus) {
      newErrors.docsstatus = 'Selecciona tu estatus de documentos';
    }
    if (!formData.vehicletype) {
      newErrors.vehicletype = 'Selecciona tipo de vehículo';
    }
    
    // Sección 3
    if (!formData.primarydestination) {
      newErrors.primarydestination = 'Selecciona un destino principal';
    }
    
    // Sección 4
    if (!formData.tripduration) {
      newErrors.tripduration = 'Selecciona la duración';
    }
    if (!formData.dateflexibility) {
      newErrors.dateflexibility = 'Selecciona tu flexibilidad';
    }
    
    // Sección 5
    if (formData.adultscount < 1) {
      newErrors.adultscount = 'Debe haber al menos 1 adulto';
    }
    if (!formData.fitnesslevel) {
      newErrors.fitnesslevel = 'Selecciona tu condición física';
    }
    if (!formData.tripstyle) {
      newErrors.tripstyle = 'Selecciona tu estilo de viaje';
    }
    if (!formData.petsincluded) {
      newErrors.petsincluded = 'Indica si llevas mascotas';
    }
    if (formData.petsincluded === 'si' && !formData.petsdetails) {
      newErrors.petsdetails = 'Describe tus mascotas';
    }
    
    // Sección 6
    if (!formData.budgetusdperperson) {
      newErrors.budgetusdperperson = 'Selecciona tu presupuesto';
    }
    if (!formData.accommodationpreference) {
      newErrors.accommodationpreference = 'Selecciona tipo de alojamiento';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Ir a la primera sección con error
      const errorKeys = Object.keys(errors);
      if (errorKeys.length > 0) {
        const sectionMap: Record<string, number> = {
          clientname: 1, clientemail: 1, phonewhatsapp: 1, leadsource: 1, leadsourceother: 1,
          departurecity: 2, departurecityother: 2, docsstatus: 2, vehicletype: 2,
          primarydestination: 3, secondarydestinations: 3,
          tripduration: 4, dateflexibility: 4,
          adultscount: 5, childrencount: 5, fitnesslevel: 5, tripstyle: 5, petsincluded: 5, petsdetails: 5,
          budgetusdperperson: 6, accommodationpreference: 6,
          additionalnotes: 7,
        };
        setCurrentSection(sectionMap[errorKeys[0]] || 1);
      }
      return;
    }
    
    const submissionData: FormData = {
      ...formData,
      submissionid: generateSubmissionId(),
      leadscore: calculateLeadScore(formData),
    };
    
    onSubmit(submissionData);
  };

  const sectionTitles = [
    'Contacto',
    'Logística base',
    'Destino',
    'Fechas y duración',
    'Grupo y ritmo',
    'Presupuesto y alojamiento',
    'Notas adicionales',
  ];

  return (
    <section className="min-h-screen bg-[#F8F6F3] noise-texture py-24 px-6 sm:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-[#2C3E50] hover:text-[#0A2540] mb-6"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Volver
          </Button>

          <h1 className="text-display text-4xl sm:text-5xl md:text-6xl font-black text-[#0A2540] mb-4">
            Formulario Nomaderia v3
          </h1>
          <p className="text-lg text-[#2C3E50]/70">
            Completa el formulario para planificar tu aventura perfecta.
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {sectionTitles.map((title, index) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index + 1)}
                className={`text-xs font-mono uppercase tracking-wider transition-colors ${
                  currentSection === index + 1
                    ? 'text-[#2D5F3F] font-bold'
                    : currentSection > index + 1
                    ? 'text-[#2D5F3F]/60'
                    : 'text-[#2C3E50]/40'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="h-2 bg-[#2C3E50]/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#2D5F3F]"
              initial={{ width: 0 }}
              animate={{ width: `${(currentSection / 7) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-center mt-2 text-sm text-[#2C3E50]/60 font-mono">
            Sección {currentSection}/7: {sectionTitles[currentSection - 1]}
          </p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Sección 1: Contacto */}
          {currentSection === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(10,37,64,0.08)] p-8">
                <h2 className="text-heading text-2xl font-bold text-[#0A2540] mb-6 flex items-center">
                  <span className="bg-[#2D5F3F] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                  Contacto
                </h2>
                
                <div className="space-y-6">
                  {/* Nombre completo */}
                  <div>
                    <Label htmlFor="clientname" className="text-[#0A2540] font-semibold mb-2 block">
                      Nombre completo *
                    </Label>
                    <Input
                      id="clientname"
                      type="text"
                      placeholder="Tu nombre completo"
                      value={formData.clientname}
                      onChange={(e) => setFormData({ ...formData, clientname: e.target.value })}
                      className={`text-lg py-6 ${errors.clientname ? 'border-red-500' : ''}`}
                      minLength={3}
                      required
                    />
                    {errors.clientname && (
                      <p className="text-red-500 text-sm mt-1">{errors.clientname}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="clientemail" className="text-[#0A2540] font-semibold mb-2 block">
                      Email *
                    </Label>
                    <Input
                      id="clientemail"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.clientemail}
                      onChange={(e) => setFormData({ ...formData, clientemail: e.target.value })}
                      className={`text-lg py-6 ${errors.clientemail ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.clientemail && (
                      <p className="text-red-500 text-sm mt-1">{errors.clientemail}</p>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <Label htmlFor="phonewhatsapp" className="text-[#0A2540] font-semibold mb-2 block">
                      WhatsApp con código de país *
                    </Label>
                    <Input
                      id="phonewhatsapp"
                      type="tel"
                      placeholder="Ej: +52 664 123 4567"
                      value={formData.phonewhatsapp}
                      onChange={(e) => setFormData({ ...formData, phonewhatsapp: e.target.value })}
                      className={`text-lg py-6 ${errors.phonewhatsapp ? 'border-red-500' : ''}`}
                      required
                    />
                    <p className="text-[#2C3E50]/60 text-sm mt-1">Formato: código país + número (ej: 52 664 123 4567)</p>
                    {errors.phonewhatsapp && (
                      <p className="text-red-500 text-sm mt-1">{errors.phonewhatsapp}</p>
                    )}
                  </div>

                  {/* ¿Cómo nos conociste? */}
                  <div>
                    <Label className="text-[#0A2540] font-semibold mb-2 block">
                      ¿Cómo nos conociste? *
                    </Label>
                    <Select
                      value={formData.leadsource}
                      onValueChange={(value) => setFormData({ ...formData, leadsource: value })}
                    >
                      <SelectTrigger className={`text-lg py-6 ${errors.leadsource ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        {leadSourceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.leadsource && (
                      <p className="text-red-500 text-sm mt-1">{errors.leadsource}</p>
                    )}
                  </div>

                  {/* Campo "Otro" condicional */}
                  {formData.leadsource === 'otro' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <Label htmlFor="leadsourceother" className="text-[#0A2540] font-semibold mb-2 block">
                        Especifica cómo nos conociste *
                      </Label>
                      <Input
                        id="leadsourceother"
                        type="text"
                        placeholder="Cuéntanos..."
                        value={formData.leadsourceother}
                        onChange={(e) => setFormData({ ...formData, leadsourceother: e.target.value })}
                        className={`text-lg py-6 ${errors.leadsourceother ? 'border-red-500' : ''}`}
                      />
                      {errors.leadsourceother && (
                        <p className="text-red-500 text-sm mt-1">{errors.leadsourceother}</p>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Sección 2: Logística base */}
          {currentSection === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(10,37,64,0.08)] p-8">
                <h2 className="text-heading text-2xl font-bold text-[#0A2540] mb-6 flex items-center">
                  <span className="bg-[#2D5F3F] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                  Logística base
                </h2>
                
                <div className="space-y-6">
                  {/* Ciudad de salida */}
                  <div>
                    <Label className="text-[#0A2540] font-semibold mb-2 block">
                      ¿Desde dónde sales? *
                    </Label>
                    <Select
                      value={formData.departurecity}
                      onValueChange={(value) => setFormData({ ...formData, departurecity: value })}
                    >
                      <SelectTrigger className={`text-lg py-6 ${errors.departurecity ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Selecciona tu ciudad" />
                      </SelectTrigger>
                      <SelectContent>
                        {departureCityOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.departurecity && (
                      <p className="text-red-500 text-sm mt-1">{errors.departurecity}</p>
                    )}
                  </div>

                  {/* Campo "Otra ciudad" condicional */}
                  {formData.departurecity === 'otra' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <Label htmlFor="departurecityother" className="text-[#0A2540] font-semibold mb-2 block">
                        Especifica tu ciudad *
                      </Label>
                      <Input
                        id="departurecityother"
                        type="text"
                        placeholder="Tu ciudad de salida"
                        value={formData.departurecityother}
                        onChange={(e) => setFormData({ ...formData, departurecityother: e.target.value })}
                        className={`text-lg py-6 ${errors.departurecityother ? 'border-red-500' : ''}`}
                      />
                      {errors.departurecityother && (
                        <p className="text-red-500 text-sm mt-1">{errors.departurecityother}</p>
                      )}
                    </motion.div>
                  )}

                  {/* Documentos */}
                  <div>
                    <Label className="text-[#0A2540] font-semibold mb-4 block">
                      Documentos para cruzar a USA *
                    </Label>
                    <RadioGroup
                      value={formData.docsstatus}
                      onValueChange={(value) => setFormData({ ...formData, docsstatus: value })}
                      className="space-y-3"
                    >
                      {docsStatusOptions.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <RadioGroupItem value={option.value} id={`docs-${option.value}`} className="mr-3" />
                          <Label htmlFor={`docs-${option.value}`} className="text-[#2C3E50] cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.docsstatus && (
                      <p className="text-red-500 text-sm mt-1">{errors.docsstatus}</p>
                    )}
                  </div>

                  {/* Tipo de vehículo */}
                  <div>
                    <Label className="text-[#0A2540] font-semibold mb-2 block">
                      ¿En qué vehículo viajas? *
                    </Label>
                    <Select
                      value={formData.vehicletype}
                      onValueChange={(value) => setFormData({ ...formData, vehicletype: value })}
                    >
                      <SelectTrigger className={`text-lg py-6 ${errors.vehicletype ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Selecciona tipo de vehículo" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.vehicletype && (
                      <p className="text-red-500 text-sm mt-1">{errors.vehicletype}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Sección 3: Destino */}
          {currentSection === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(10,37,64,0.08)] p-8">
                <h2 className="text-heading text-2xl font-bold text-[#0A2540] mb-6 flex items-center">
                  <span className="bg-[#2D5F3F] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                  Destino
                </h2>
                
                <div className="space-y-6">
                  {/* Destino principal */}
                  <div>
                    <Label className="text-[#0A2540] font-semibold mb-2 block">
                      Destino principal *
                    </Label>
                    <Select
                      value={formData.primarydestination}
                      onValueChange={(value) => setFormData({ ...formData, primarydestination: value })}
                    >
                      <SelectTrigger className={`text-lg py-6 ${errors.primarydestination ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Selecciona tu destino" />
                      </SelectTrigger>
                      <SelectContent>
                        {primaryDestinationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.primarydestination && (
                      <p className="text-red-500 text-sm mt-1">{errors.primarydestination}</p>
                    )}
                  </div>

                  {/* Destinos secundarios */}
                  <div>
                    <Label className="text-[#0A2540] font-semibold mb-2 block">
                      ¿Segundo destino cercano? (máximo 2)
                    </Label>
                    <p className="text-[#2C3E50]/60 text-sm mb-4">
                      Selecciona hasta 2 destinos adicionales o "No, solo 1 destino"
                    </p>
                    <div className="space-y-3">
                      {secondaryDestinationOptions.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <Checkbox
                            id={`secondary-${option.value}`}
                            checked={formData.secondarydestinations.includes(option.value)}
                            onCheckedChange={(checked) => 
                              handleSecondaryDestinationChange(option.value, checked as boolean)
                            }
                            disabled={
                              option.value !== 'solo_uno' && 
                              formData.secondarydestinations.includes('solo_uno')
                            }
                            className="mr-3"
                          />
                          <Label 
                            htmlFor={`secondary-${option.value}`} 
                            className={`cursor-pointer ${
                              option.value !== 'solo_uno' && 
                              formData.secondarydestinations.includes('solo_uno')
                                ? 'text-[#2C3E50]/40'
                                : 'text-[#2C3E50]'
                            }`}
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Sección 4: Fechas y duración */}
          {currentSection === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(10,37,64,0.08)] p-8">
                <h2 className="text-heading text-2xl font-bold text-[#0A2540] mb-6 flex items-center">
                  <span className="bg-[#2D5F3F] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">4</span>
                  Fechas y duración
                </h2>
                
                <div className="space-y-6">
                  {/* Duración */}
                  <div>
                    <Label className="text-[#0A2540] font-semibold mb-2 block">
                      Duración total *
                    </Label>
                    <Select
                      value={formData.tripduration}
                      onValueChange={(value) => setFormData({ ...formData, tripduration: value })}
                    >
                      <SelectTrigger className={`text-lg py-6 ${errors.tripduration ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Selecciona la duración" />
                      </SelectTrigger>
                      <SelectContent>
                        {tripDurationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.tripduration && (
                      <p className="text-red-500 text-sm mt-1">{errors.tripduration}</p>
                    )}
                  </div>

                  {/* Flexibilidad */}
                  <div>
                    <Label className="text-[#0A2540] font-semibold mb-2 block">
                      Flexibilidad de fechas *
                    </Label>
                    <Select
                      value={formData.dateflexibility}
                      onValueChange={(value) => setFormData({ ...formData, dateflexibility: value })}
                    >
                      <SelectTrigger className={`text-lg py-6 ${errors.dateflexibility ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Selecciona tu flexibilidad" />
                      </SelectTrigger>
                      <SelectContent>
                        {dateFlexibilityOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.dateflexibility && (
                      <p className="text-red-500 text-sm mt-1">{errors.dateflexibility}</p>
                    )}
                  </div>

                  {/* Fecha tentativa */}
                  <div>
                    <Label htmlFor="preferreddeparturedate" className="text-[#0A2540] font-semibold mb-2 block">
                      Fecha tentativa de salida (opcional)
                    </Label>
                    <Input
                      id="preferreddeparturedate"
                      type="date"
                      value={formData.preferreddeparturedate}
                      onChange={(e) => setFormData({ ...formData, preferreddeparturedate: e.target.value })}
                      className="text-lg py-6"
                    />
                  </div>

                  {/* Mes alternativo (solo si no hay fecha) */}
                  {!formData.preferreddeparturedate && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <Label className="text-[#0A2540] font-semibold mb-2 block">
                        Mes de viaje alternativa
                      </Label>
                      <Select
                        value={formData.travelmonth}
                        onValueChange={(value) => setFormData({ ...formData, travelmonth: value })}
                      >
                        <SelectTrigger className="text-lg py-6">
                          <SelectValue placeholder="Selecciona un mes" />
                        </SelectTrigger>
                        <SelectContent>
                          {monthOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Sección 5: Grupo y ritmo */}
          {currentSection === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(10,37,64,0.08)] p-8">
                <h2 className="text-heading text-2xl font-bold text-[#0A2540] mb-6 flex items-center">
                  <span className="bg-[#2D5F3F] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">5</span>
                  Grupo y ritmo
                </h2>
                
                <div className="space-y-6">
                  {/* Adultos */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="adultscount" className="text-[#0A2540] font-semibold mb-2 block">
                        Adultos *
                      </Label>
                      <Input
                        id="adultscount"
                        type="number"
                        min={1}
                        value={formData.adultscount}
                        onChange={(e) => setFormData({ ...formData, adultscount: parseInt(e.target.value) || 1 })}
                        className={`text-lg py-6 ${errors.adultscount ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.adultscount && (
                        <p className="text-red-500 text-sm mt-1">{errors.adultscount}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="childrencount" className="text-[#0A2540] font-semibold mb-2 block">
                        Niños (menores de 12) *
                      </Label>
                      <Input
                        id="childrencount"
                        type="number"
                        min={0}
                        value={formData.childrencount}
                        onChange={(e) => setFormData({ ...formData, childrencount: parseInt(e.target.value) || 0 })}
                        className="text-lg py-6"
                        required
                      />
                    </div>
                  </div>

                  {/* Condición física */}
                  <div>
                    <Label className="text-[#0A2540] font-semibold mb-2 block">
                      Condición física *
                    </Label>
                    <Select
                      value={formData.fitnesslevel}
                      onValueChange={(value) => setFormData({ ...formData, fitnesslevel: value })}
                    >
                      <SelectTrigger className={`text-lg py-6 ${errors.fitnesslevel ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Selecciona tu nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        {fitnessLevelOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.fitnesslevel && (
                      <p className="text-red-500 text-sm mt-1">{errors.fitnesslevel}</p>
                    )}
                  </div>

                  {/* Estilo de aventura */}
                  <div>
                    <Label className="text-[#0A2540] font-semibold mb-2 block">
                      Estilo de aventura *
                    </Label>
                    <Select
                      value={formData.tripstyle}
                      onValueChange={(value) => setFormData({ ...formData, tripstyle: value })}
                    >
                      <SelectTrigger className={`text-lg py-6 ${errors.tripstyle ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Selecciona tu estilo" />
                      </SelectTrigger>
                      <SelectContent>
                        {tripStyleOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.tripstyle && (
                      <p className="text-red-500 text-sm mt-1">{errors.tripstyle}</p>
                    )}
                  </div>

                  {/* Mascotas */}
                  <div>
                    <Label className="text-[#0A2540] font-semibold mb-4 block">
                      ¿Mascotas? *
                    </Label>
                    <RadioGroup
                      value={formData.petsincluded}
                      onValueChange={(value) => setFormData({ ...formData, petsincluded: value })}
                      className="flex gap-6"
                    >
                      <div className="flex items-center">
                        <RadioGroupItem value="si" id="pets-si" className="mr-2" />
                        <Label htmlFor="pets-si" className="text-[#2C3E50] cursor-pointer">Sí</Label>
                      </div>
                      <div className="flex items-center">
                        <RadioGroupItem value="no" id="pets-no" className="mr-2" />
                        <Label htmlFor="pets-no" className="text-[#2C3E50] cursor-pointer">No</Label>
                      </div>
                    </RadioGroup>
                    {errors.petsincluded && (
                      <p className="text-red-500 text-sm mt-1">{errors.petsincluded}</p>
                    )}
                  </div>

                  {/* Detalles de mascotas */}
                  {formData.petsincluded === 'si' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <Label htmlFor="petsdetails" className="text-[#0A2540] font-semibold mb-2 block">
                        Describe tus mascotas *
                      </Label>
                      <Input
                        id="petsdetails"
                        type="text"
                        placeholder="Ej: 1 perro labrador de 3 años"
                        value={formData.petsdetails}
                        onChange={(e) => setFormData({ ...formData, petsdetails: e.target.value })}
                        className={`text-lg py-6 ${errors.petsdetails ? 'border-red-500' : ''}`}
                      />
                      {errors.petsdetails && (
                        <p className="text-red-500 text-sm mt-1">{errors.petsdetails}</p>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Sección 6: Presupuesto y alojamiento */}
          {currentSection === 6 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(10,37,64,0.08)] p-8">
                <h2 className="text-heading text-2xl font-bold text-[#0A2540] mb-6 flex items-center">
                  <span className="bg-[#2D5F3F] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">6</span>
                  Presupuesto y alojamiento
                </h2>
                
                <div className="space-y-6">
                  {/* Presupuesto */}
                  <div>
                    <Label className="text-[#0A2540] font-semibold mb-2 block">
                      Presupuesto por persona (USD) *
                    </Label>
                    <Select
                      value={formData.budgetusdperperson}
                      onValueChange={(value) => setFormData({ ...formData, budgetusdperperson: value })}
                    >
                      <SelectTrigger className={`text-lg py-6 ${errors.budgetusdperperson ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Selecciona tu presupuesto" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.budgetusdperperson && (
                      <p className="text-red-500 text-sm mt-1">{errors.budgetusdperperson}</p>
                    )}
                  </div>

                  {/* Tipo de alojamiento */}
                  <div>
                    <Label className="text-[#0A2540] font-semibold mb-4 block">
                      Tipo de alojamiento *
                    </Label>
                    <RadioGroup
                      value={formData.accommodationpreference}
                      onValueChange={(value) => setFormData({ ...formData, accommodationpreference: value })}
                      className="space-y-3"
                    >
                      {accommodationOptions.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <RadioGroupItem value={option.value} id={`accom-${option.value}`} className="mr-3" />
                          <Label htmlFor={`accom-${option.value}`} className="text-[#2C3E50] cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.accommodationpreference && (
                      <p className="text-red-500 text-sm mt-1">{errors.accommodationpreference}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Sección 7: Notas */}
          {currentSection === 7 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(10,37,64,0.08)] p-8">
                <h2 className="text-heading text-2xl font-bold text-[#0A2540] mb-6 flex items-center">
                  <span className="bg-[#2D5F3F] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">7</span>
                  Notas adicionales
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="additionalnotes" className="text-[#0A2540] font-semibold mb-2 block">
                      Algo importante que debamos saber (opcional)
                    </Label>
                    <Textarea
                      id="additionalnotes"
                      placeholder="Alergias, restricciones alimenticias, fechas especiales, etc."
                      value={formData.additionalnotes}
                      onChange={(e) => {
                        if (e.target.value.length <= 500) {
                          setFormData({ ...formData, additionalnotes: e.target.value });
                        }
                      }}
                      className="text-lg min-h-[150px]"
                      maxLength={500}
                    />
                    <p className="text-[#2C3E50]/60 text-sm mt-1 text-right">
                      {formData.additionalnotes.length}/500 caracteres
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentSection(Math.max(1, currentSection - 1))}
              disabled={currentSection === 1}
              className="px-8 py-6 text-lg"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Anterior
            </Button>

            {currentSection < 7 ? (
              <Button
                type="button"
                onClick={() => setCurrentSection(Math.min(7, currentSection + 1))}
                className="bg-[#2D5F3F] hover:bg-[#2D5F3F]/90 text-white px-8 py-6 text-lg"
              >
                Siguiente
                <ChevronLeft className="w-5 h-5 ml-2 rotate-180" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#E8744F] hover:bg-[#E8744F]/90 text-white px-8 py-6 text-lg font-bold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'ENVIAR SOLICITUD'
                )}
              </Button>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
