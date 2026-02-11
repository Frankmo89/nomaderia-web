# CLAUDE.md - Nomaderia Web Design System & Guidelines

## Project Overview
**Nomaderia** - "Tu Arquitecto de Aventuras" - is an adventure travel planning platform focused on US National Parks for travelers from Mexico/Latin America.

## Tech Stack
- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS 3.4 + CSS Variables
- **Animations:** Framer Motion 11
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** Lucide React
- **Fonts:** Fraunces (display), Space Grotesk (headings), Inter (body), JetBrains Mono (mono)
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel

## Design Tokens

### Color Palette
| Token           | Hex       | Usage                          |
|-----------------|-----------|--------------------------------|
| Ocean Blue      | `#0A2540` | Primary backgrounds, nav, text |
| Forest Green    | `#2D5F3F` | CTAs, nature elements          |
| Burnt Orange    | `#E8744F` | Accents, highlights, badges    |
| Neutral Base    | `#F8F6F3` | Page backgrounds               |
| Neutral Dark    | `#2C3E50` | Body text                      |

### Typography Scale
- **Hero:** 5xl-8xl Fraunces, font-black, tracking-tight
- **Section Title:** 4xl-6xl Fraunces, font-black
- **Subheading:** xl-2xl Space Grotesk, font-bold
- **Body:** base-lg Inter, font-normal
- **Label/Mono:** sm JetBrains Mono, uppercase, tracking-widest

## Architecture Conventions

### Component Structure
```
src/components/
  ui/            # shadcn/ui primitives (do not modify)
  admin/         # Admin dashboard components
  *.tsx          # Feature/page components
```

### Animation Patterns
- Use `framer-motion` for all scroll-triggered animations
- Standard reveal: `initial={{ opacity: 0, y: 40 }}` + `whileInView={{ opacity: 1, y: 0 }}`
- Stagger children with `delay: index * 0.1`
- Image hover: `group-hover:scale-110 transition-transform duration-700`
- Use `viewport={{ once: true }}` to prevent re-triggering

### Section Layout Pattern
```tsx
<section className="py-24 px-6 sm:px-8 bg-[background-color]">
  <div className="max-w-7xl mx-auto">
    {/* Section Header */}
    <motion.div initial/whileInView className="text-center mb-16">
      <p className="text-mono ...">Label</p>
      <h2 className="text-display ...">Title</h2>
      <p className="text-xl ...">Description</p>
    </motion.div>
    {/* Content */}
  </div>
</section>
```

## Build & Dev Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build (strict)
npm run build-no-errors  # Build ignoring TS errors
npm run lint         # ESLint check
npm run preview      # Preview production build
```

## Key Design Principles

1. **Cinematic & Immersive** - Full-bleed imagery, video backgrounds, parallax effects
2. **Adventure-First** - Every section should evoke the feeling of being outdoors
3. **Mobile-First** - All layouts designed for mobile, enhanced for desktop
4. **Performance** - Lazy load routes, optimize images, code-split vendors
5. **Trust & Credibility** - Real photos, testimonials, transparent pricing

## Recent Enhancements

### Video Integration
- Hero section uses HTML5 video background with cinematic overlay
- VideoShowcase section with curated adventure YouTube embeds
- Gallery supports mixed photo/video content

### Visual Effects
- Parallax scrolling on hero and section backgrounds
- Floating particle animations (mountain/compass themed)
- Animated wave/mountain SVG dividers between sections
- Gradient text animations on hover
- Enhanced scroll-triggered reveal animations

### Performance
- Video backgrounds use `preload="metadata"` and `poster` fallback
- YouTube embeds use `loading="lazy"` with facade pattern
- CSS animations use `will-change` and GPU-accelerated transforms
