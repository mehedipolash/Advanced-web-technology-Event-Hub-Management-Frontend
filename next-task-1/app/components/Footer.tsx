// app/components/Footer.tsx
import { FaGithub, FaFacebook, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#708993] text-black py-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Copyright */}
        <p className="text-lg mb-4 md:mb-0">
          © EventHub — {new Date().getFullYear()}
        </p>

        {/* Social Links */}
        <div className="flex space-x-6 text-2xl">
          <a
            href="https://github.com/mehedipolash"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://web.facebook.com/mh.polash.009"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            <FaFacebook />
          </a>
          <a
            href="www.linkedin.com/in/m-mehedi-hasan-polash"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

