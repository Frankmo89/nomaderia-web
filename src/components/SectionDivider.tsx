import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant: 'mountain' | 'wave' | 'canyon';
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
}

export default function SectionDivider({
  variant,
  fromColor = '#F8F6F3',
  toColor = '#0A2540',
  flip = false,
}: SectionDividerProps) {
  const paths: Record<string, string> = {
    mountain:
      'M0,96 L48,80 C96,64,192,32,288,42.7 C384,53,480,107,576,122.7 C672,139,768,117,864,101.3 C960,85,1056,75,1152,85.3 C1248,96,1344,128,1392,144 L1440,160 L1440,0 L1392,0 C1344,0,1248,0,1152,0 C1056,0,960,0,864,0 C768,0,672,0,576,0 C480,0,384,0,288,0 C192,0,96,0,48,0 L0,0 Z',
    wave:
      'M0,64 C120,100,240,120,360,96 C480,72,600,10,720,10 C840,10,960,72,1080,96 C1200,120,1320,100,1380,90 L1440,80 L1440,0 L0,0 Z',
    canyon:
      'M0,160 L80,144 C160,128,320,96,480,106.7 C640,117,800,171,960,176 C1120,181,1280,139,1360,117.3 L1440,96 L1440,0 L1360,0 C1280,0,1120,0,960,0 C800,0,640,0,480,0 C320,0,160,0,80,0 L0,0 Z',
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        marginTop: '-1px',
        marginBottom: '-1px',
        transform: flip ? 'rotate(180deg)' : 'none',
        background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="w-full h-16 sm:h-24 md:h-32 block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.path
          d={paths[variant]}
          fill={toColor}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </motion.svg>
    </div>
  );
}
