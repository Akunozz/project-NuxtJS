import type { ICaminhao } from "~/types/ICaminhao";

export function useCaminhaoService() {
    const apiUrl = "https://67a9ea7365ab088ea7e4f65e.mockapi.io/api/estudo/carro";
  
    // 🔹 Listar todos os caminhões
    const listar = async (): Promise<ICaminhao[]> => {
      const { data, error } = await useFetch<ICaminhao[]>(apiUrl);
      if (error.value) throw new Error(error.value.message);
      return data.value ?? [];
    };
  
    // 🔹 Buscar um caminhão pelo ID
    const buscarPorId = async (id: string) => {
      const { data, error } = await useFetch(`${apiUrl}/${id}`);
      if (error.value) throw new Error(error.value.message);
      return data.value;
    };
  
 // Cria um novo caminhão
 const criar = async (caminhao: Omit<ICaminhao, "id">): Promise<ICaminhao> => {
  const { data, error } = await useFetch<ICaminhao>(apiUrl, {
    method: "POST",
    body: caminhao,
  });
  if (error.value) throw new Error(error.value.message);
  return data.value!;
};
  
    // 🔹 Atualizar caminhão
    const atualizar = async (id: string, caminhao: object) => {
      const { data, error } = await useFetch(`${apiUrl}/${id}`, {
        method: "PUT",
        body: caminhao,
      });
      if (error.value) throw new Error(error.value.message);
      return data.value;
    };
  
    // 🔹 Excluir caminhão
    const excluir = async (id: string) => {
      const { data, error } = await useFetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      if (error.value) throw new Error(error.value.message);
      return data.value;
    };
  
    return { listar, buscarPorId, criar, atualizar, excluir };
  }
  