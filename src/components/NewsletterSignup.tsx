import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import type { NewLead } from "@/types/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 120;

const sanitizeEmail = (raw: string) => raw.trim().toLowerCase().replace(/[<>"'`\\]/g, '').slice(0, MAX_EMAIL_LENGTH);

export default function NewsletterSignup() {
  const { toast } = useToast();

  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevenir doble envío
    setError(null);
    setSuccess(false);

    const trimmed = sanitizeEmail(email);
    if (!trimmed) {
      toast({
        title: "Correo requerido",
        description: "Por favor ingresa un correo electrónico.",
        variant: "destructive",
      });
      setError("Por favor ingresa un correo electrónico.");
      return;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      toast({
        title: "Correo inválido",
        description: "El correo ingresado no es válido.",
        variant: "destructive",
      });
      setError("Correo inválido.");
      return;
    }

    setLoading(true);

    const newLead: NewLead = {
      email: trimmed,
      source: "form",
      status: 'new',
      created_at: new Date().toISOString(),
    } as NewLead;

    try {
      const { error: supaError } = await (supabase as any)
        .from("leads")
        .insert([newLead]);

      if (supaError) {
        // No mostrar detalles técnicos al usuario
        toast({
          title: "Error al registrarte",
          description: "No se pudo guardar tu correo. Intenta de nuevo.",
          variant: "destructive",
        });
        setError("No se pudo registrar el correo. Intenta nuevamente.");
      } else {
        setSuccess(true);
        setEmail("");
        toast({
          title: "¡Registro exitoso!",
          description: "Gracias por suscribirte.",
        });
      }
    } catch {
      toast({
        title: "Error inesperado",
        description: "Ocurrió un error inesperado. Intenta más tarde.",
        variant: "destructive",
      });
      setError("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-2" aria-label="Formulario de suscripción al newsletter">
      <div className="flex flex-col gap-2">
        <Label htmlFor="newsletter-email" className="sr-only">Correo electrónico</Label>
        <div className="flex gap-2">
          <Input
            id="newsletter-email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            aria-required="true"
            aria-invalid={!!error}
            aria-describedby={error ? "newsletter-error" : undefined}
            className="flex-1"
          />
          <Button type="submit" disabled={loading} aria-busy={loading}>
            {loading ? "Enviando..." : "Suscribirse"}
          </Button>
        </div>

        {error ? (
          <p id="newsletter-error" className="text-sm text-destructive mt-1" aria-live="assertive">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="text-sm text-green-600 mt-1" aria-live="polite">Gracias, verás novedades pronto.</p>
        ) : null}
      </div>
    </form>
  );
}
