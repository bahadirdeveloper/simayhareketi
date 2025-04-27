import { Link } from "wouter";

type Language = {
  code: string;
  name: string;
  direction?: "rtl" | "ltr";
};

const languages: Language[] = [
  { code: "tr", name: "Türkçe" },
  { code: "en", name: "English" },
  { code: "ar", name: "العربية", direction: "rtl" },
  { code: "ru", name: "Русский" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" }
];

export default function LanguageSelector() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-12">
      {languages.map((lang) => (
        <Link 
          key={lang.code}
          href={`/${lang.code}`}
          className={`lang-btn text-center py-2 sm:py-3 px-3 sm:px-6 text-xs sm:text-sm border border-matrix-green rounded-md font-roboto-mono hover:border-faded-green transition-all duration-300 ${lang.direction === "rtl" ? "rtl-support" : ""}`}
        >
          {lang.name}
        </Link>
      ))}
    </div>
  );
}
