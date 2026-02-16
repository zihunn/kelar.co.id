import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import logoWhite from "../../image/kelar-white.png";

// TikTok icon component
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export function Footer() {
  const { aboutUs, socialMedia } = useData();
  const { t } = useLanguage();

  return (
    <footer className="bg-[var(--kelar-secondary)] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <img
              src={logoWhite}
              alt="Kelar.co.id"
              className="h-16 md:h-20 mb-4"
            />
            <p className="text-gray-300 text-sm">{t("footer.description")}</p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4">{t("footer.contactTitle")}</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>{aboutUs.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="flex-shrink-0" />
                <a
                  href={`mailto:${aboutUs.email}`}
                  className="hover:text-white transition-colors"
                >
                  {aboutUs.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="flex-shrink-0" />
                <a
                  href={`tel:${aboutUs.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {aboutUs.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4">{t("footer.followUs")}</h3>
            <div className="flex gap-4">
              <a
                href={socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--kelar-primary)] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href={socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--kelar-primary)] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href={socialMedia.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--kelar-primary)] transition-colors"
              >
                <TikTokIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center text-sm text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} Kelar.co.id.{" "}
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
