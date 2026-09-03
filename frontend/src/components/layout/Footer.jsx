import { Link } from "react-router-dom";
import {
  Globe,
  Mail,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#343E4F] text-white">

      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-1">

            <div className="mb-5 flex items-center gap-2">
              <div className="h-8 w-8 bg-white">
                
              </div>

              <span className="text-lg font-bold">
                D-Agro AI
              </span>
            </div>

            <p className="max-w-xs text-sm leading-6 text-gray-300">
              Bridging the gap between traditional wisdom and modern
              intelligence for the Ethiopian agricultural revolution.
            </p>

            <div className="mt-6 flex gap-4 text-gray-300">
              <a href="#" aria-label="Website">
                <Globe size={17} />
              </a>

              <a href="#" aria-label="Social media">
                <span className="text-sm font-bold">
                  IG
                </span>
              </a>

              <a href="#" aria-label="Email">
                <Mail size={17} />
              </a>
            </div>

          </div>

          {/* Marketplace */}
          <div>
            <h3 className="mb-5 text-sm font-bold">
              Marketplace
            </h3>

            <div className="flex flex-col gap-3 text-sm text-gray-300">

              <Link to="/marketplace" className="hover:text-white">
                Buy Crops
              </Link>

              <Link to="/marketplace" className="hover:text-white">
                Supplies
              </Link>

              <Link to="/marketplace" className="hover:text-white">
                Equipment
              </Link>

            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-sm font-bold">
              Services
            </h3>

            <div className="flex flex-col gap-3 text-sm text-gray-300">

              <Link to="/ai" className="hover:text-white">
                AI Advisor
              </Link>

              <Link to="/ai/disease" className="hover:text-white">
                Disease Scan
              </Link>

              <Link to="/orders" className="hover:text-white">
                Logistics
              </Link>

            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-sm font-bold">
              Company
            </h3>

            <div className="flex flex-col gap-3 text-sm text-gray-300">

              <a href="#about" className="hover:text-white">
                About Us
              </a>

              <a href="#contact" className="hover:text-white">
                Support
              </a>

              <a href="#" className="hover:text-white">
                Privacy
              </a>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs text-gray-400">
            © 2024 D-Agro Market AI. Supporting Ethiopia's Agricultural Growth.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;