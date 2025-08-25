import { SwitchToggleUi } from "@/components/ui";
import { Context } from "@/context/Context";
import type { Categoria } from "@/types/type";
import { useContext, useState } from "react";
import CatedoryPageDetails from "./CatedoryPageDetails";

const CategoryPage = () => {
  const { categorias, setCategorias } = useContext(Context);

  const [activeDetails, setActiveDetails] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState<Categoria | null>();

  function update(item: Categoria, state: boolean) {
    setCategorias((prevCategorias: Categoria[]) =>
      prevCategorias.map((cat: Categoria) =>
        cat.id === item.id ? { ...cat, ativo: state } : cat
      )
    );
  }

  function ToggleDetails(item?: Categoria) {
    if (activeDetails) {
      setActiveDetails(false);
      setCategoryDetails(null);
    } else if (item && item.ativo) {
      setActiveDetails(true);
      setCategoryDetails(item);
    }
  }
  return (
    <>
      <div className="bg-[#070d1c] h-[100%] absolute px-4 py-4 text-white">
        <div className=" flex  flex-wrap gap-4 ">
          {categorias.map((item) => (
            <div
              onClick={() => {
                ToggleDetails(item);
              }}
              key={item.id}
              className={` ${
                item.ativo ? "bg-[#0F172A] " : "bg-gray-500"
              } px-6 py-2 rounded-md cursor-pointer`}
            >
              <h1>{item.nome}</h1>
              <h1>Total de sintomas: {item.sintomas.length}</h1>
              <div className=" my-2 w-0" onClick={(e) => e.stopPropagation()}>
                <SwitchToggleUi
                  boolean={item.ativo}
                  onToggle={(state) => update(item, state)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeDetails && (
        <CatedoryPageDetails
          categoryDetailsProps={categoryDetails ?? null}
          ToggleDetailsProps={ToggleDetails}
        />
      )}
    </>
  );
};

export default CategoryPage;
