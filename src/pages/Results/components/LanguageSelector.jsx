import { useContext, useMemo } from "react";
import LanguageContext from "../../../context/Global/language-context";
const LanguageSelector = () => {
  const { language, selectLanguage } = useContext(LanguageContext);

  const lang = useMemo(() => {
    return language?.language.toUpperCase();
  }, [language]);

  const handleLanguageChange = () => {
    const revLang = lang.toLowerCase() === "en" ? "fil" : "en";

    selectLanguage(revLang);
  };
  console.log("component re-renders");
  console.log("lang", language);
  return (
    <div
      className="language"
      title="Change Language"
      onClick={handleLanguageChange}
    >
      {lang}
    </div>
  );
};

export default LanguageSelector;
