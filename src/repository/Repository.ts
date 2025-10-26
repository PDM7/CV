import type { Perfil, Experiencia, NovaExperiencia, Campo, NovoCampo } from "../types/perfil";
import { demonstracao } from "../demonstracao";

//get (pegar) -> operação para pegar/obter um determinado dado do banco de dados
//post (salvar) -> operação para inserir ou atualizar um determinado dado no banco de dados

class Bd {
  static montarChavePerfil(id: number): string {
    return `perfil-00000${id}`
  }

  private static postPerfil(perfil: Perfil): Perfil { 
    const experiencias = Bd.postExperiencias(perfil.experiencias);
    const campos = Bd.postCampos(perfil.campos);

    const perfilAtualizado = {
      ...perfil,
      experiencias,
      campos
    };
    
    const chave_perfil = Bd.montarChavePerfil(perfil.chave);
    localStorage.setItem(chave_perfil, JSON.stringify(perfilAtualizado));
    return perfilAtualizado;
  }

  private static postExperiencias(experiencias: (Experiencia | NovaExperiencia)[] ): Experiencia[] {
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

  private static postCampos(
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
  
  //public
  static salvarPerfil(perfil: Perfil): Perfil { 
    return Bd.postPerfil(perfil)
  }

  static getPerfil(id: number): Perfil {
    const chave_perfil = Bd.montarChavePerfil(id);
    return JSON.parse( 
      localStorage.getItem(chave_perfil) || JSON.stringify(demonstracao)
    );
  }

}

export default Bd;
