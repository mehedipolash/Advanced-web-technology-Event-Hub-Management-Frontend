// app/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-violet-700 text-white text-2xl p-4 text-center mt-8">
      © EventHub — {new Date().getFullYear()}
    </footer>
  );
}
