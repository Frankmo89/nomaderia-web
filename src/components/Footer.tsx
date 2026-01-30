import { Instagram, Twitter, Facebook, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A2540] topo-pattern py-20 px-6 sm:px-8 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8744F]/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <h3 className="font-display text-3xl font-bold text-white">
                NOMADERÍA
              </h3>
            </div>
            <p className="text-white/60 text-base leading-relaxed max-w-xs mx-auto md:mx-0">
              Tu arquitecto de aventuras. Diseñamos tu viaje perfecto a Parques Nacionales de EE.UU.
            </p>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <h4 className="text-mono text-sm uppercase tracking-[0.2em] text-[#E8744F] font-medium mb-5">Contacto</h4>
            <div className="space-y-3">
              <a 
                href="mailto:nomaderia.travel@gmail.com" 
                className="flex items-center justify-center gap-2 text-white/80 font-medium transition-all hover:text-[#E8744F] focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 active:scale-95 hover:scale-105 hover:shadow-xl outline-none"
              >
                <Mail className="w-4 h-4" />
                nomaderia.travel@gmail.com
              </a>
              <p className="flex items-center justify-center gap-2 text-white/60">
                <MapPin className="w-4 h-4" />
                Tecate, Baja California
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h4 className="text-mono text-sm uppercase tracking-[0.2em] text-[#E8744F] font-medium mb-5">Síguenos</h4>
            <div className="flex items-center gap-5 justify-center md:justify-end">
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#2D5F3F] hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#2D5F3F] hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#2D5F3F] hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            © 2025 Nomadería. Todos los derechos reservados.
          </p>
          <p className="text-mono text-xs uppercase tracking-wider text-white/30 mt-2">
            Creado para aventureros, por aventureros
          </p>
        </div>
      </div>
    </footer>
  );
}
