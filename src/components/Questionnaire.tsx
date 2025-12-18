import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface Question {
  id: number;
  question: string;
  options: { value: string; label: string; image?: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: '¿Qué tipo de aventura te llama?',
    options: [
      { value: 'mountain', label: 'Senderismo de Montaña', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80' },
      { value: 'camping', label: 'Campamento en la Naturaleza', image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&q=80' },
      { value: 'backpacking', label: 'Mochilero Multi-Día', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80' },
      { value: 'climbing', label: 'Escalada en Roca', image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400&q=80' },
    ],
  },
  {
    id: 2,
    question: '¿Cuánto tiempo quieres explorar?',
    options: [
      { value: 'weekend', label: '2-3 Días (Escapada de Fin de Semana)' },
      { value: 'week', label: '5-7 Días (Aventura de Semana)' },
      { value: 'extended', label: '10-14 Días (Viaje Extendido)' },
      { value: 'month', label: '3-4 Semanas (Expedición Épica)' },
    ],
  },
  {
    id: 3,
    question: '¿Cuál es tu nivel de experiencia?',
    options: [
      { value: 'beginner', label: 'Principiante - Nuevo en aventuras al aire libre' },
      { value: 'intermediate', label: 'Intermedio - Algo de experiencia' },
      { value: 'advanced', label: 'Avanzado - Aventurero experimentado' },
      { value: 'expert', label: 'Experto - Desafíos extremos bienvenidos' },
    ],
  },
  {
    id: 4,
    question: '¿Qué clima prefieres?',
    options: [
      { value: 'alpine', label: 'Alpino y Montaña', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80' },
      { value: 'desert', label: 'Desierto y Árido', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80' },
      { value: 'forest', label: 'Bosque y Arbolado', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80' },
      { value: 'coastal', label: 'Costero y Playa', image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&q=80' },
    ],
  },
  {
    id: 5,
    question: '¿Cuál es tu rango de presupuesto?',
    options: [
      { value: 'budget', label: '$500 - $1,000 (Económico)' },
      { value: 'moderate', label: '$1,000 - $2,500 (Moderado)' },
      { value: 'comfortable', label: '$2,500 - $5,000 (Cómodo)' },
      { value: 'luxury', label: '$5,000+ (Experiencia Premium)' },
    ],
  },
  {
    id: 6,
    question: '¿Viajas solo o acompañado?',
    options: [
      { value: 'solo', label: 'Aventura en Solitario' },
      { value: 'couple', label: 'Con Pareja' },
      { value: 'friends', label: 'Grupo Pequeño (3-5)' },
      { value: 'family', label: 'Viaje Familiar' },
    ],
  },
];

interface QuestionnaireProps {
  onComplete: (answers: Record<number, string>) => void;
}

export default function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState(1);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const isAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <section className="min-h-screen bg-[#F8F6F3] noise-texture py-24 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-mono text-sm uppercase tracking-wider text-[#2C3E50]/60">
              Pregunta {currentStep + 1} de {questions.length}
            </span>
            <span className="text-mono text-sm font-semibold text-[#2D5F3F]">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-white rounded-xl shadow-[0_4px_24px_rgba(10,37,64,0.08)] p-12 md:p-16"
          >
            <h2 className="text-heading text-3xl md:text-4xl font-bold text-[#0A2540] mb-12">
              {currentQuestion.question}
            </h2>

            <RadioGroup
              value={answers[currentQuestion.id]}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {currentQuestion.options.map((option) => (
                <div key={option.value}>
                  <Label
                    htmlFor={option.value}
                    className={`flex items-center gap-4 p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      answers[currentQuestion.id] === option.value
                        ? 'border-[#2D5F3F] bg-[#2D5F3F]/5'
                        : 'border-gray-200 hover:border-[#2D5F3F]/50 hover:bg-gray-50'
                    }`}
                  >
                    {option.image && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={option.image}
                          alt={option.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                    <span className="text-lg font-medium text-[#2C3E50]">{option.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-12">
          <Button
            onClick={handleBack}
            variant="ghost"
            disabled={currentStep === 0}
            className="text-[#2C3E50] hover:text-[#0A2540] disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Atrás
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="bg-[#2D5F3F] hover:bg-[#E8744F] text-white px-8 py-6 disabled:opacity-50 transition-all duration-300"
          >
            {currentStep === questions.length - 1 ? 'Generar Itinerario' : 'Siguiente'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
