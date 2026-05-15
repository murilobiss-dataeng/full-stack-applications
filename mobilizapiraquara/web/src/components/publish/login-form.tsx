"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { publishLoginSchema, type PublishLoginInput } from "@/lib/validations";
import { publishLogin } from "@/app/actions/publish";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export function PublishLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PublishLoginInput>({ resolver: zodResolver(publishLoginSchema) });

  async function onSubmit(data: PublishLoginInput) {
    setLoading(true);
    const result = await publishLogin(data);
    setLoading(false);
    if (result.success) {
      toast.success("Acesso autorizado");
      router.push("/publique/nova");
      router.refresh();
    } else {
      toast.error(result.error ?? "Falha no login");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Usuário</Label>
        <Input
          id="username"
          type="text"
          autoComplete="username"
          {...register("username")}
          className="bg-slate-900"
        />
        {errors.username && <p className="text-sm text-red-400">{errors.username.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
          className="bg-slate-900"
        />
        {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
      </Button>
    </form>
  );
}
