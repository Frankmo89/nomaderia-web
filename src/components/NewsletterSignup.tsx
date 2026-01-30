import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import type { NewLead } from "@/types/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterSignup() {
  const { toast } = useToast();

  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Por favor ingresa un correo electrónico.");
      return;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
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
      const { data, error: supaError } = await (supabase as any)
        .from("leads")
        .insert([newLead]);

      if (supaError) {
        console.error("Supabase insert error:", supaError);
        setError("No se pudo registrar el correo. Intenta nuevamente.");
        toast({
          title: "Error al registrarte",
          description: "No se pudo guardar tu correo. Intenta de nuevo.",
        });
      } else {
        setSuccess(true);
        setEmail("");
        toast({
          title: "¡Registro exitoso!",
          description: "Gracias por suscribirte.",
        });
      }
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error inesperado.");
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white/60 dark:bg-slate-900/60 rounded-md p-4 shadow-sm"
      aria-live="polite"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="newsletter-email">Suscríbete al newsletter</Label>
        <div className="flex gap-2">
          <Input
            id="newsletter-email"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? "newsletter-error" : undefined}
            className="mr-0"
          />
          <Button type="submit" disabled={loading} className="shrink-0">
            {loading ? "Enviando..." : "Suscribir"}
          </Button>
        </div>

        {error ? (
          <p id="newsletter-error" className="text-sm text-destructive mt-1">
            {error}
          </p>
        ) : null}

        {success ? (
          <p className="text-sm text-green-600 mt-1">Gracias, verás novedades pronto.</p>
        ) : null}
      </div>
    </form>
  );
}
