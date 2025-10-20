import type { Perfil, Experiencia, NovaExperiencia, Campo, NovoCampo } from "../types/profile";
import { defaultData } from "../default.data";

class Repository {
  getProfile(id: number): Perfil {
    return JSON.parse(
      localStorage.getItem("profile") || JSON.stringify(defaultData)
    );
  }

  saveProfile(profile: Perfil): Perfil {
    const experienciasAtualizadas = this.createExperience(profile.experiencias);

    const camposAtualizados = this.createCampos(profile.campos);

    const perfilAtualizado = {
      ...profile,
      experiencias: experienciasAtualizadas,
      campos: camposAtualizados
    };

    localStorage.setItem("profile", JSON.stringify(perfilAtualizado));
    return perfilAtualizado;
  }

  createExperience(
    experiencias: (Experiencia | NovaExperiencia)[]
  ): Experiencia[] {
    return experiencias.map((exp, index) => {
      if ("chave" in exp && exp.chave != null) {
        // experiência existente
        return exp;
      }

      return {
        ...exp,
        chave: index+Date.now()
      } as Experiencia;
    });
  }


   createCampos(
    campos: (Campo | NovoCampo)[]
  ): Campo[] {
    return campos.map((c, index) => {
      if ("chave" in c && c.chave != null) {
        // campo existente
        return c;
      }

      return {
        ...c,
        chave: index+Date.now()
      } as Campo;
    });
  }

}

export default Repository;
