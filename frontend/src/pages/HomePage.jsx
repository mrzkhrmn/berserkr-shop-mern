import { Carousel } from "flowbite-react";
import { FiTruck } from "react-icons/fi";
import { FaRegCopyright } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";
import { Footer } from "../components/Footer";

export const HomePage = () => {
  return (
    <div>
      <section className="h-56 sm:h-64 xl:h-[600px] 2xl:h-[800px]">
        <Carousel>
          <img
            src="https://cdn.myikas.com/images/theme-images/20a84cf9-3c9b-4691-bd77-41207c43e57f/image_3840.webp"
            alt=""
          />
          <img
            src="https://cdn.myikas.com/images/theme-images/20a84cf9-3c9b-4691-bd77-41207c43e57f/image_3840.webp"
            alt=""
          />
        </Carousel>
      </section>
      <div className="text-center max-w-4xl mx-auto space-y-6 my-20 px-4">
        <h1 className="text-2xl font-bold">BERSERKR: SAVAŞÇININ YOLU</h1>
        <p className="font-semibold text-[16px] leading-9">
          Tarih boyunca farklı uygarlıkların farklı savaşçıları belirli kural,
          düstur ve yaşam kodlarıyla <br /> hayatlarını sürdürmüşlerdir.
          <br />
          Bushido, japon savaşçısı samuraiların hayatları boyunca uyması gereken
          yaşam tarzı kurallarıdır. Onur, sadelik, sadakat ve savaş alanında
          cesaret gibi erdemler savaşçının yolu;
          <br /> Bushido&apos;yu oluşturuyordu.
        </p>
        <p className="font-semibold text-[16px] leading-9">
          Biz de Bushido olarak tarihin farklı uygarlıklarının savaşçılarının
          ruhlarını, özgürlüklerini ve cesaretlerini ürünlerimizle sizlere
          sunuyoruz...
        </p>
      </div>
      <section>
        <div className="grid  grid-cols-3 gap-2 my-8">
          <div className="w-full overflow-hidden relative">
            <img
              className="h-full object-cover hover:scale-110 transition-all duration-300 absolute"
              src="https://cdn.myikas.com/images/theme-images/7a815f08-72f1-4dee-8155-95f5d72ed4ab/image_1512.webp"
              alt=""
            />
            <button className="uppercase font-semibold  text-xs md:text-base absolute top-[80%] left-[27%] md:left-[33%] bg-[#232323] hover:bg-black transition duration-300 px-3 py-2 md:px-16 md:py-2">
              Satin Al
            </button>
          </div>
          <div className="w-full overflow-hidden relative">
            <img
              className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
              src="https://cdn.myikas.com/images/theme-images/c3cfae97-3fd4-4b20-bea7-9cba1178811e/image_1512.webp"
              alt=""
            />
            <button className="uppercase font-semibold  text-xs md:text-base absolute top-[80%] left-[27%] md:left-[33%] bg-[#232323] hover:bg-black transition duration-300 px-3 py-2 md:px-16 md:py-2">
              Satin Al
            </button>
          </div>
          <div className="w-full overflow-hidden relative">
            <img
              className={`w-full h-full object-cover  hover:scale-110 duration-300 transition-all`}
              src="https://cdn.myikas.com/images/theme-images/856ab03f-3a56-41b9-9ccd-7d6ee517d4ff/image_1512.webp"
              alt=""
            />
            <button className="uppercase font-semibold  text-xs md:text-base absolute top-[80%] left-[27%] md:left-[33%] bg-[#232323] hover:bg-black transition duration-300 px-3 py-2 md:px-16 md:py-2">
              Satin Al
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 my-8">
          <div className="w-full overflow-hidden relative">
            <img
              className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
              src="https://cdn.myikas.com/images/theme-images/65dd468f-9cca-46f6-bd8b-9ee54f7813d0/image_1512.webp"
              alt=""
            />
            <button className="uppercase font-semibold  text-xs md:text-base absolute top-[80%] left-[27%] md:left-[33%] bg-[#232323] hover:bg-black transition duration-300 px-3 py-2 md:px-16 md:py-2">
              Yakinda
            </button>
          </div>
          <div className="w-full overflow-hidden relative">
            <img
              className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
              src="https://cdn.myikas.com/images/theme-images/d65f1c99-c2c8-40b4-9273-e0e263fe7e3b/image_1512.webp"
              alt=""
            />
            <button className="uppercase font-semibold  text-xs md:text-base absolute top-[80%] left-[27%] md:left-[33%] bg-[#232323] hover:bg-black transition duration-300 px-3 py-2 md:px-16 md:py-2">
              Yakinda
            </button>
          </div>
          <div className="w-full  overflow-hidden relative">
            <img
              className="w-full h-full object-cover hover:scale-110 duration-300 transition-all"
              src="https://cdn.myikas.com/images/theme-images/8f11c226-d785-4dd3-b7a3-3ab1fd895c2d/image_1512.webp"
              alt=""
            />
            <button className="uppercase font-semibold  text-xs md:text-base absolute top-[80%] left-[27%] md:left-[33%] bg-[#232323] hover:bg-black transition duration-300 px-3 py-2 md:px-16 md:py-2">
              Yakinda
            </button>
          </div>
        </div>
      </section>
      <section className="my-20">
        <div className="flex justify-center gap-2 lg:gap-64 md:gap-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <GrSecure className="text-4xl" />{" "}
            <p className="font-[200]">256 Bit SSL ile güvende alışveriş</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <FiTruck className="text-4xl" />{" "}
            <p className="font-[200]">Türkiye içi kargo bedava</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <FaRegCopyright className="text-4xl" />{" "}
            <p className="font-[200]">Kişiye özel ürünler</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
