import { MultiSelectTag, ParticlesBackground } from "../components/ui";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { Context } from "@/context/Context";
import type { Doenca, Sintoma } from "@/types/type";
import { LateralBarDoenças } from "@/components/layout";

const Sintomas = () => {
  const { categorias, doencas, sintomas, selected, setSelected } =
    useContext(Context);

  const [openId, setOpenId] = useState<string | null>(null);

  const [openLateralBar, setopenLateralBar] = useState<boolean | null>(false);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const toggleSelect = (option: Sintoma) => {
    setSelected((prev) => [...prev, option]);
  };

  const removeItem = (id: string) => {
    setSelected((prev) => prev.filter((opt) => opt.id !== id));
  };

  const doencasFiltradas: Doenca[] =
    selected.length === 0
      ? []
      : doencas.filter((doenca) =>
          selected.every((sintoma) => doenca.sintomas.includes(sintoma.id))
        );

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.8 }}
      className=" mt-10"
    >
      <ParticlesBackground />
      {openLateralBar && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-white bg-[rgba(15,23,42,0.9)] opacity-90 border border-[#1E293B] h-full w-5/12 absolute top-0 z-40 transition-all ease-in-out"
        >
          <IoMdClose
            size={30}
            className=" absolute right-0 mr-4 mt-4 cursor-pointer"
            onClick={() => setopenLateralBar(!openLateralBar)}
          />

          <LateralBarDoenças
            doencasSearch={doencasFiltradas}
            sintomasSearch={selected}
          />
        </motion.div>
      )}
      {/* SELECT */}
      <div className=" relative w-full  flex  items-center  justify-between pr-10 pl-20 ">
        <div className="w-full">
          <div
            onClick={() => setopenLateralBar(!openLateralBar)}
            className=" cursor-pointer relative  border-2 border-white text-white  border-dashed w-10  h-10 rounded-full text-center flex items-center justify-center "
          >
            {selected.length > 0 ? (
              <h1 className="">{doencasFiltradas.length}</h1>
            ) : (
              <h1>0</h1>
            )}
          </div>
        </div>
        <div className="w-full flex items-end justify-end ">
          <MultiSelectTag options={sintomas} />
        </div>
      </div>

      {/* SECTIONS */}
      <main className=" mt-20 flex flex-col items-center ">
        {categorias.length > 0 ? (
          <>
            {categorias.map((categorias) => (
              <>
                {categorias.ativo && (
                  <section className="mb-8 w-full">
                    <div className="relative  w-full flex flex-col items-center justify-center">
                      <hr className="w-full border-[#1E293B]  absolute z-0 " />
                      <div className="z-10">
                        <button
                          key={categorias.id}
                          onClick={() => handleToggle(categorias.id)}
                          type="button"
                          className={` bg-[#0F172A] cursor-pointer ${
                            openId === categorias.id
                              ? " rounded-b-none rounded-t-[10px]"
                              : "rounded-[10px] "
                          } border border-[#1E293B] px-[40px] py-[10px] hover:border-[#334155] ease-in-out transition-all`}
                        >
                          <p className="text-[#94A3B8] text-[18px]">
                            {categorias.nome}
                          </p>
                        </button>
                      </div>
                    </div>
                    {openId === categorias.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className=" bg-[#0F172A] pt-4 pb-8 px-4 border-[#1E293B] border  flex-wrap overflow-hidden rounded-lg mx-10 flex gap-4"
                      >
                        {categorias.sintomas.map((sintomaId) => {
                          const sintoma = sintomas.find(
                            (sint) => sint.id === sintomaId && sint.ativo
                          );
                          if (!sintoma) return null;
                          const isSelected = selected.some(
                            (sel) => sel.id === sintoma.id
                          );
                          return (
                            <div
                              className={`rounded-full cursor-pointer px-4 py-1 flex gap-2 items-center
                              ${
                                isSelected
                                  ? "bg-green-600 text-white"
                                  : "bg-[#2A3248] text-white"
                              }
                            `}
                              onClick={() => {
                                if (isSelected) {
                                  removeItem(sintoma.id);
                                }
                                if (!isSelected) {
                                  toggleSelect(sintoma);
                                }
                              }}
                            >
                              <p key={sintoma.id} className="">
                                {sintoma.nome}
                              </p>

                              {isSelected ? (
                                <IoMdCheckmark size={20} />
                              ) : (
                                <IoMdClose size={20} />
                              )}
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </section>
                )}
              </>
            ))}
          </>
        ) : (
          <div className=" mt-7">
            <h1 className=" text-white text-3xl font-bold">
              Nenhuma categoria foi encontrada
            </h1>
          </div>
        )}
      </main>
    </motion.div>
  );
};

export default Sintomas;
