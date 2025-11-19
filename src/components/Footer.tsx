export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black py-8 text-center">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Lumina Photography. All rights reserved.
      </p>
    </footer>
  );
}