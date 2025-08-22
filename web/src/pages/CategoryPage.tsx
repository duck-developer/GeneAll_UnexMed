import { SwitchToggleUi } from "@/components/ui";
import { Context } from "@/context/Context";
import React, { useContext, useState } from "react";

const CategoryPage = () => {
  const { categorias } = useContext(Context);
  // const [ligado, setLigado] = useState(false);
  return (
    <div className="bg-[#070d1c] h-[100vh] px-4 py-4 text-white">
      <div className=" flex  flex-wrap gap-4 ">
        {categorias.map((item, index) => (
          <div
            className={` ${
              item.ativo ? "bg-[#0F172A] " : "bg-gray-500"
            } px-6 py-2 rounded-md cursor-pointer`}
          >
            <h1>{item.nome}</h1>
            <h1>Total de sintomas: {item.sintomas.length}</h1>
            <div className=" my-2">
              <SwitchToggleUi boolean={item.ativo} onToggle={() => {}} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
