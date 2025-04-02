import { useState, useEffect } from "react";
import LanguageContext from "./language-context";
import axios from "axios";
import { Toast } from "../../constants";
const toast = new Toast();
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(null);
  const selectLanguage = async (type = "en") => {
    const selectedLanguage = type === "en" ? `English` : "Filipino";

    try {
      const res = await axios.get(`/opd/lab/language.json?rand=${Date.now()}`, {
        cache: "no-cache",
      });
      console.log(res.data);
      const selectedLang = res.data.find((lang) => lang.language === type);

      if (!selectedLang) {
        throw new Error(`Language '${type}' not found.`);
      }

      setLanguage(selectedLang);
      toast.message("success", selectedLanguage, "bottom-end");
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  useEffect(() => {
    selectLanguage("en");
  }, []);

  const languageValues = {
    language,
    selectLanguage,
  };

  return (
    <LanguageContext.Provider value={languageValues}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
