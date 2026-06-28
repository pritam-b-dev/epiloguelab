import NavBar from "../../components/NavBar";

export default function AuthLayout({ children }) {
  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
        {children}
      </div>
    </>
  );
}
