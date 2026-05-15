"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { joinSchema, type JoinInput } from "@/lib/validations";
import { submitJoinForm } from "@/app/actions/leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export function JoinForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JoinInput>({
    resolver: zodResolver(joinSchema),
    defaultValues: { fullName: "", whatsapp: "" },
  });

  async function onSubmit(data: JoinInput) {
    const result = await submitJoinForm(data);
    if (result.success) {
      if ("redirect" in result && result.redirect) {
        window.open(result.redirect, "_blank", "noopener,noreferrer");
      }
      toast.success("Cadastro recebido! Em breve entraremos em contato.");
      reset();
    } else {
      toast.error(result.error ?? "Não foi possível enviar. Tente novamente.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="fullName">Nome e Sobrenome</Label>
        <Input
          id="fullName"
          placeholder="Seu nome completo"
          autoComplete="name"
          {...register("fullName")}
          aria-invalid={!!errors.fullName}
        />
        {errors.fullName && (
          <p className="text-sm text-red-400" role="alert">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <Input
          id="whatsapp"
          type="tel"
          placeholder="(41) 99999-9999"
          autoComplete="tel"
          {...register("whatsapp")}
          aria-invalid={!!errors.whatsapp}
        />
        {errors.whatsapp && (
          <p className="text-sm text-red-400" role="alert">
            {errors.whatsapp.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Quero Saber Mais"
        )}
      </Button>
    </form>
  );
}
