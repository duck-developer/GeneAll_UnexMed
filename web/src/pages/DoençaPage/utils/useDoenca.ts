import { db } from "@/services/firebaseconnection";
import type { Doenca } from "@/types/type";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { useState } from "react";

const doencasCollection = collection(db, "doencas");

const useDoenca = () => {
  const [doencas, setDoencas] = useState<Doenca[]>([]);

  const getAllDoencas = async () => {
    const snapshot = await getDocs(doencasCollection);
    const list: Doenca[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Doenca[];
    setDoencas(list);
  };
  const addDoenca = async (novaDoenca: Doenca) => {
    let doencaCriada: Doenca;

    if (novaDoenca.id) {
      // ID fixo (se algum dia você quiser usar)
      const ref = doc(doencasCollection, novaDoenca.id);
      await setDoc(ref, { ...novaDoenca, ativo: true });
      doencaCriada = { ...novaDoenca, ativo: true };
    } else {
      // ID automático
      const docRef = await addDoc(doencasCollection, {
        ...novaDoenca,
        ativo: true,
      });
      await updateDoc(doc(db, "doencas", docRef.id), { id: docRef.id });
      doencaCriada = { ...novaDoenca, ativo: true, id: docRef.id };
    }

    setDoencas((prev) => [...prev, doencaCriada]);
  };

  // Alterna ativo/inativo
  async function ToggleDetailsDoenca(item?: Doenca) {
    if (!item?.id) return;

    try {
      const novoValor = !item.ativo;
      const ref = doc(db, "doencas", item.id);
      await updateDoc(ref, { ativo: novoValor });
      console.log("Item atualizado:", item.id, "->", novoValor);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  }
  const updateDoenca = async (id: string, dados: Omit<Doenca, "id">) => {
    const ref = doc(db, "doencas", id);
    await updateDoc(ref, dados);
    await getAllDoencas();
  };

  return {
    doencas,
    getAllDoencas,
    addDoenca,
    ToggleDetailsDoenca,
    updateDoenca,
  };
};

export default useDoenca;
