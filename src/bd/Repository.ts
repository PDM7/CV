import type { Perfil, Experiencia, NovaExperiencia, Campo, NovoCampo } from "../types/profile";
import { defaultData, emptyData } from "../default.data";

class Repository {

  async login(email: string, senha: string): Promise<Perfil | null> {
    let data: Perfil | null = null;

    if (email === "admin" && senha === "admin") {
      data = { ...defaultData };
    } else if (email === "demo" && senha === "1234") {
      data = { ...emptyData, nome: "Usuário Demo" };
    }

    if (data) {
      localStorage.setItem("profile", JSON.stringify(data));
      return data;
    }

    return null;
  }

 async uploadToImgBB(file: File): Promise<string> {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    if (!apiKey) throw new Error("Chave do imgBB não encontrada");

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) return data.data.url;

    throw new Error("Erro ao enviar imagem para o imgBB");
  }

 async saveProfile(profile: Perfil, file?: File): Promise<Perfil> {
  let fotoURL = profile.foto;

  if (file) {
    try {
      fotoURL = await this.uploadToImgBB(file);
    } catch (err) {
      console.error("Falha ao enviar imagem:", err);
    }
  }

  const experienciasAtualizadas = this.createExperience(profile.experiencias);
  const camposAtualizados = this.createCampos(profile.campos);

  const perfilAtualizado = {
    ...profile,
    foto: fotoURL,
    experiencias: experienciasAtualizadas,
    campos: camposAtualizados,
  };

  localStorage.setItem("profile", JSON.stringify(perfilAtualizado));

  return perfilAtualizado;
}


  createExperience(
    experiencias: (Experiencia | NovaExperiencia)[]
  ): Experiencia[] {
    return experiencias.map((exp, index) => {
      if ("chave" in exp && exp.chave != null) return exp;

      return { ...exp, chave: index + Date.now() } as Experiencia;
    });
  }

  createCampos(campos: (Campo | NovoCampo)[]): Campo[] {
    return campos.map((c, index) => {
      if ("chave" in c && c.chave != null) return c;

      return { ...c, chave: index + Date.now() } as Campo;
    });
  }
}

export default Repository;
