export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <hr className="border-gray-200" />

      <footer className="py-8 text-center text-[15px] text-gray-500">
        Copyright &copy; {currentYear} quikoro
      </footer>
    </>
  );
}
