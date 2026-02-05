import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#cfc3f4]">
      <main className="px-4 pb-16 pt-6 lg:px-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
