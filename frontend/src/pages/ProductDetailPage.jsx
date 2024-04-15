import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { BsTruck } from "react-icons/bs";
import { FaRegCopyright } from "react-icons/fa6";
import { FaRegCommentAlt } from "react-icons/fa";

import { Comment } from "../components/Comment";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, increaseQuantity } from "../redux/cart/cartSlice";
import { toast } from "react-toastify";

export const ProductDetailPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"];
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const dispatch = useDispatch();

  function handleAddToCart(item, quantity = 1) {
    dispatch(addToCart({ ...item, size: selectedSize, quantity }));
    toast.success("Product added to cart!");
  }

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

  if (!product.imageUrls) return;

  return (
    product && (
      <div className="container mx-auto mt-6">
        <div className="flex gap-6">
          <div className="flex flex-col gap-4">
            {product?.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="productImage"
                className="max-w-[110px] h-[170px] cursor-pointer"
                onClick={() => setSelectedImageUrl(url)}
              />
            ))}
          </div>
          <img
            src={selectedImageUrl || product?.imageUrls[0]}
            alt="productImage"
            className="max-w-[850px] h-auto"
          />
          <div className=" w-full ">
            <p className="text-lg font-bold">{product.brand}</p>
            <p className="text-lg font-light">{product.name}</p>
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
            <h2 className="font-bold text-lg my-6">
              ₺{product.price.toFixed(2)}
            </h2>
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
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-[#662E2E] hover:bg-[#462020] transition duration-200 py-3 font-bold"
              >
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
                <p className="text-center font-semibold text-sm">
                  The {product.brand}
                </p>
                <p className="font-light text-sm mt-5 leading-8">
                  {product.description}
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
    )
  );
};
