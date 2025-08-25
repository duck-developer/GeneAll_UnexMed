import { IconsUi } from "@/components/ui";
import { Context } from "@/context/Context";
import type { Categoria } from "@/types/type";
import { useContext } from "react";
import { IoMdClose } from "react-icons/io";

interface CatedoryPageDetailsProps {
  ToggleDetailsProps: () => void;
  categoryDetailsProps: Categoria | null;
}
const CatedoryPageDetails = ({
  ToggleDetailsProps,
  categoryDetailsProps,
}: CatedoryPageDetailsProps) => {
  const { sintomas } = useContext(Context);

  // ✅ sintomas que pertencem à categoria
  const sintomasDaCategoria =
    sintomas.filter((sint) =>
      categoryDetailsProps?.sintomas.includes(sint.id)
    ) ?? [];

  // ✅ sintomas que faltam (não estão na categoria)
  const sintomasFaltando =
    sintomas.filter(
      (sint) => !categoryDetailsProps?.sintomas.includes(sint.id)
    ) ?? [];

  return (
    <div className="w-[100%] h-[100vh] flex justify-center text-white relative">
      <div className="bg-[rgba(15,23,42,0.8)] w-[90%] h-[80%] absolute top-0 mt-[3rem] rounded-lg p-5 overflow-y-auto">
        <div onClick={ToggleDetailsProps}>
          <IconsUi
            active
            icon={IoMdClose}
            color="white"
            className="absolute right-0 mr-5 mt-5 cursor-pointer"
            size={28}
          />
        </div>

        <h1 className="text-xl font-bold mb-4">
          Todos os sintomas do {categoryDetailsProps?.nome}
        </h1>

        {/* ✅ Sintomas da categoria */}
        <h2 className="text-lg font-semibold mb-2">Incluídos:</h2>
        {sintomasDaCategoria.map((sintoma) => (
          <div key={sintoma.id} className="pl-2">
            <p>✔️ {sintoma.nome}</p>
          </div>
        ))}

        {/* ✅ Sintomas que faltam */}
        <h2 className="text-lg font-semibold mt-4 mb-2">Faltando:</h2>
        {sintomasFaltando.map((sintoma) => (
          <div key={sintoma.id} className="pl-2 opacity-70">
            <p>❌ {sintoma.nome}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatedoryPageDetails;
