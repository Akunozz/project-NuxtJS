import type { IMotorista } from "~/types/IMotorista";

export function useMotoristaService() {
    const apiUrl = "https://67a9ea7365ab088ea7e4f65e.mockapi.io/api/estudo/motorista";
  
    // 🔹 Listar todos os motoristas
    const listar = async (): Promise<IMotorista[]> => {
      const { data, error, status } = await useFetch<IMotorista[]>(apiUrl);
      if (error.value) throw new Error(error.value.message);
      return data.value ?? [];
    };
  
    // 🔹 Buscar um motorista pelo ID
    const buscarPorId = async (id: string) => {
      const { data, error } = await useFetch(`${apiUrl}/${id}`);
      if (error.value) throw new Error(error.value.message);
      return data.value;
    };
  
 // Cria um novo motorista
 const criar = async (motorista: Omit<IMotorista, "id">): Promise<IMotorista> => {
  const { data, error } = await useFetch<IMotorista>(apiUrl, {
    method: "POST",
    body: motorista,
  });
  if (error.value) throw new Error(error.value.message);
  return data.value!;
};
  
    // 🔹 Atualizar motorista
    const atualizar = async (id: string, motorista: object) => {
      const { data, error } = await useFetch(`${apiUrl}/${id}`, {
        method: "PUT",
        body: motorista,
      });
      if (error.value) throw new Error(error.value.message);
      return data.value;
    };
  
    // 🔹 Excluir motorista
    const excluir = async (id: string) => {
      const { data, error } = await useFetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      if (error.value) throw new Error(error.value.message);
      return data.value;
    };
  
    return { listar, buscarPorId, criar, atualizar, excluir };
  }
  