// src/hooks/useSintomas.ts
import { useState } from "react";
import type { Sintoma } from "@/types/type";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/services/firebaseconnection";

const sintomasCollection = collection(db, "sintomas");

const useSintomas = () => {
  const [sintomas, setSintomas] = useState<Sintoma[]>([]);

  // Busca todos os sintomas
  async function getAllSintomas() {
    const snapshot = await getDocs(sintomasCollection);

    const lista: Sintoma[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Sintoma[];

    setSintomas(lista);
  }

  // Adiciona um sintoma, agora com opção de ID fixo
  async function addSintoma(nome: string, id?: string) {
    let novoSintoma: Sintoma;

    if (id) {
      // ID fixo usando setDoc
      const ref = doc(sintomasCollection, id);
      await setDoc(ref, { id, nome, ativo: true }); // aqui incluímos o id
      novoSintoma = { id, nome, ativo: true };
    } else {
      // ID automático usando addDoc
      const docRef = await addDoc(sintomasCollection, { nome, ativo: true });
      // agora salvamos também o id no documento
      await updateDoc(doc(db, "sintomas", docRef.id), { id: docRef.id });
      novoSintoma = { id: docRef.id, nome, ativo: true };
    }

    setSintomas((prev) => [...prev, novoSintoma]);
  }
  // Alterna ativo/inativo
  async function ToggleDetailsSintomas(item?: Sintoma) {
    if (!item?.id) return;

    try {
      const novoValor = !item.ativo;
      const ref = doc(db, "sintomas", item.id);
      await updateDoc(ref, { ativo: novoValor });
      console.log("Item atualizado:", item.id, "->", novoValor);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  }

  // Edita nome do sintoma
  async function editSintoma(id: string, nome: string) {
    const ref = doc(db, "sintomas", id);
    await updateDoc(ref, { nome });
    await getAllSintomas();
  }

  return {
    sintomas,
    getAllSintomas,
    addSintoma,
    ToggleDetailsSintomas,
    editSintoma,
  };
};

export default useSintomas;
