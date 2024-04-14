import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { BsTruck } from "react-icons/bs";
import { FaRegCopyright } from "react-icons/fa6";
import { FaRegCommentAlt } from "react-icons/fa";

import { Comment } from "../components/Comment";
import { useParams } from "react-router-dom";

export const ProductDetailPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"];
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await fetch(`/api/product/product/${id}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.error) {
          console.log(data.error);
          return;
        }
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    }
    getProduct();
  }, [id]);

  return (
    <div className="container mx-auto mt-6">
      <div className="flex gap-6">
        <div className="flex flex-col gap-4">
          <img
            src="https://cdn.myikas.com/images/20c102e9-75bf-47a9-9605-828b3a311626/a71f3963-64a0-4231-b4c5-d32569335773/3840/bushido-back-mockup-2k.webp"
            alt="productImage"
            className="max-w-[110px] h-[170px]"
          />
          <img
            src="https://cdn.myikas.com/images/20c102e9-75bf-47a9-9605-828b3a311626/a71f3963-64a0-4231-b4c5-d32569335773/3840/bushido-back-mockup-2k.webp"
            alt="productImage"
            className="max-w-[110px] h-[170px]"
          />
          <img
            src="https://cdn.myikas.com/images/20c102e9-75bf-47a9-9605-828b3a311626/a71f3963-64a0-4231-b4c5-d32569335773/3840/bushido-back-mockup-2k.webp"
            alt="productImage"
            className="max-w-[110px] h-[170px]"
          />
        </div>
        <img
          src="https://cdn.myikas.com/images/20c102e9-75bf-47a9-9605-828b3a311626/5894b771-935a-409a-a331-f26c2e676126/3840/bushido-front-mockup-2k.webp"
          alt="productImage"
          className="max-w-[850px] h-auto"
        />
        <div className=" w-full ">
          <p className="text-lg font-bold">Berserkr</p>
          <p className="text-lg font-light">The Ronin Oversize Tshirt</p>
          <div className="flex items-center gap-2">
            <div className="flex text-sm gap-0.5">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="text-white/30 text-sm">27 Degerlendirme</p>
          </div>
          <h2 className="font-bold text-lg my-6">₺849.00</h2>
          <div className="flex flex-col flex-wrap gap-3">
            <p className="font-light text-sm">Beden</p>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  className={`bg-black px-4 py-2 border hover:border-black ${
                    selectedSize === size && "border-black text-yellow-400"
                  }`}
                  key={size}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="text-lg flex flex-col gap-3 my-5">
            <button className="bg-[#662E2E] hover:bg-[#462020] transition duration-200 py-3 font-bold">
              SEPETE EKLE
            </button>
            <button className="bg-[#662E2E] hover:bg-[#462020] transition duration-200 py-3 font-bold">
              HEMEN AL
            </button>
          </div>
          <div className="flex items-center mb-5 gap-16">
            <div className="flex items-center gap-4">
              <BsTruck className="text-3xl" />
              <p className="text-sm font-light">Yurtiçi ücretsiz kargo</p>
            </div>
            <div className="flex items-center gap-4">
              <FaRegCopyright className="text-3xl" />
              <p className="text-sm font-light">
                Kişiye Özel <br /> Boyutlarda Üretim
              </p>
            </div>
          </div>
          <div className="px-4">
            <p className="font-light text-sm">Ürün Açıklaması</p>
            <div className="mt-5 px-4">
              <p className="text-center font-semibold text-sm">The Ronin</p>
              <p className="font-light text-sm mt-5">
                "Ronin" terimi, Japonya'nın feodal dönemlerinde ustasız
                samuraylara verilen bir isimdi. Samuraylar, efendileri
                öldüklerinde ya da onları terk etmek zorunda kaldıklarında bir
                Ronin olurlar ve yalnızca fiziksel olarak değil, aynı zamanda
                ruhsal olarak da yalnız bir içsel arayışa çıkarlardı.
              </p>
              <p className="font-light text-sm mt-5">
                Roninler hem geleneksel samuray ideallerine bağlı kalırlar hem
                de bağımsızlık ve özgürlük arayışı içinde olurlardı. Birçok
                ronin, hayatlarını dürüst bir şekilde yaşamak için zanaatlarına
                odaklanırken, bazıları da kendi iç savaşlarına ve maceralarına
                atılırdı.
              </p>
              <p className="font-light text-sm mt-5">
                Biz de "The Ronin" tasarımımızda tam olarak bu ruhu aktarmaya
                çalıştık. Sırtta doğan güneşin ülkesi Japonya'ya ithafen kızıl
                bir güneş ve önünde mağrur, yalnız bir Ronin silüeti. Üstteki
                yazıda{" "}
                <span className="text-red-500">
                  "Onurun gölgesinde, bir ronin yalnız yürür"
                </span>
                , alttaki yazıda ise{" "}
                <span className="text-red-500">"Kılıç ve Onur"</span>{" "}
                yazmaktadır.
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm mt-8 mb-3">
                Ürün Özellikleri:
              </p>
              <div className="pl-10">
                <p className="font-light text-sm ">Kumaş: 20/1 Pamuk İplik</p>
                <p className="font-light text-sm ">200 gr./m2 ağırlık</p>
                <p className="font-light text-sm ">Süprem Örgü</p>
                <p className="font-light text-sm ">Dikiş: Pamuk İplik</p>
                <p className="font-light text-sm ">
                  Sırt Baskısı: %100 Doğal Kumaş boyası ile Serigrafi Baskı
                </p>
                <p className="font-light text-sm ">Pamuklu ısı ütüleme</p>
                <p className="font-light text-sm ">
                  Ön Nakış: 2 renk iplik, endüstriyel kabartmalı nakış
                </p>
              </div>
              <p className="text-red-500 text-sm font-light mt-3">
                Ayrıntılı bilgi için size chart'ı inceleyiniz. 30 derecede
                yıkayınız.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-48">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-light">Yorumlar</h2>
          <button className="text-xl font-light flex items-center gap-2">
            <FaRegCommentAlt /> <span>Yorum yap</span>
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
};
