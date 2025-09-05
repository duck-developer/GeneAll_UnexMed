import { db } from "@/services/firebaseconnection";
import type { Categoria } from "@/types/type";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

import { useState } from "react";

const categoriasCollection = collection(db, "categorias");

const useCategory = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  async function getAllCategory() {
    const snapshot = await getDocs(categoriasCollection);

    const lista: Categoria[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Categoria[];

    setCategorias(lista);
  }

  // Alterna ativo/inativo
  async function ToggleDetailsCategorias(item?: Categoria) {
    if (!item?.id) return;

    try {
      const novoValor = !item.ativo;
      const ref = doc(db, "categorias", item.id);
      await updateDoc(ref, { ativo: novoValor });
      console.log("Item atualizado:", item.id, "->", novoValor);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  }

  async function updateCategory(id: string, sintomas: string[]) {
    try {
      const ref = doc(db, "categorias", id);
      await updateDoc(ref, { sintomas });
      console.log("Sintomas atualizados com sucesso:", sintomas);

      // Atualiza local state
      setCategorias((prev) =>
        prev.map((cat) => (cat.id === id ? { ...cat, sintomas } : cat))
      );
    } catch (error) {
      console.error("Erro ao atualizar sintomas:", error);
    }
  }
  return {
    categorias,
    getAllCategory,
    ToggleDetailsCategorias,
    updateCategory,
  };
};

export default useCategory;
