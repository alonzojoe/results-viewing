import { useState, useEffect } from "react";
import LanguageContext from "./language-context";
import axios from "axios";

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(null);
  const selectLanguage = async (type = "en") => {
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
