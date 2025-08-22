import type { Doenca, Sintoma } from "@/types/type";
import { Link } from "react-router-dom";

interface LateralBarDoençasProps {
  doencasSearch: Doenca[];
  sintomasSearch: Sintoma[];
}

const LateralBarDoenças = ({
  doencasSearch,
  sintomasSearch,
}: LateralBarDoençasProps) => {
  console.log(doencasSearch);
  return (
    <div className="mt-4">
      <h1 className=" text-center text-2xl font-bold">
        Doenças relacionadas aos sintomas
      </h1>

      {sintomasSearch.length > 0 ? (
        <div className=" my-7 flex mx-4 flex-wrap gap-4">
          {sintomasSearch.map((sintoma, index) => (
            <>
              {sintoma.ativo && (
                <div className="hover:bg-[#1E293B] text-sm rounded-full cursor-pointer px-4 py-1 flex gap-2 items-center bg-[#2A3248] text-white">
                  <h1 key={index}>{sintoma.nome}</h1>
                </div>
              )}
            </>
          ))}
        </div>
      ) : (
        <h1 className="text-center text-sm text-gray-500 my-7">
          Nenhum Sintoma selecionado
        </h1>
      )}
      <hr className="w-full border-[#1E293B]" />

      {doencasSearch.length > 0 ? (
        <div className=" my-7 flex mx-4 flex-wrap gap-4">
          {doencasSearch.map((doenca, index) => (
            <>
              {doenca.ativo && (
                <Link
                  target="_blank"
                  to={`/doenças/${doenca.id}`}
                  className=" cursor-pointer hover:bg-[#1E293B] bg-[#151E33] border border-[#1E293B] text-md font-bold text-wrap w-[140px] h-[100px] px-4 py-4 text-center flex items-center justify-center rounded-md"
                >
                  <h1 key={index}>{doenca.nome}</h1>
                </Link>
              )}
            </>
          ))}
        </div>
      ) : (
        <h1 className="text-center text-sm text-gray-500 my-7">
          Nenhuma Doença encontrada
        </h1>
      )}
    </div>
  );
};

export default LateralBarDoenças;
