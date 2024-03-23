export const Footer = () => {
  return (
    <footer className="container mx-auto flex md:flex-row flex-col gap-6 md:gap-0 justify-between px-10 my-20">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg">Koleksiyonlar</h3>
        <p className="font-[200] text-md">The Berserkr</p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg">Hesabim</h3>
        <p className="font-[200] text-md">Giriş Yap</p>
        <p className="font-[200] text-md">Kayıt Ol</p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg">Hakkimizda</h3>
        <p className="font-[200] text-md">Iletişim</p>
        <p className="font-[200] text-md">S.S.S</p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg">Destek</h3>
        <p className="font-[200] text-md">Kargo ve Iade</p>
        <p className="font-[200] text-md">Gizlilik Sözleşmesi</p>
        <p className="font-[200] text-md">Kullanıcı Sözleşmesi</p>
        <p className="font-[200] text-md">Mesafeli Satış Sözleşmesi</p>
      </div>
      <div>
        <h1 className="text-2xl">BERSERKR-SHOP</h1>
      </div>
    </footer>
  );
};
