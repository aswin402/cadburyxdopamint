import { Link } from "react-router-dom";
import logoCad from "../assets/logocad.svg";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent py-6">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoCad}
            alt="Cadbury Logo"
            className="h-10 md:h-12 w-auto object-contain hover:scale-105 transition-transform cursor-pointer select-none"
          />
        </Link>
      </div>
    </header>
  );
}
