"use client";

import React, { createContext, useContext, useState } from "react";

export type LanguageCode = "id" | "en" | "zh";

type Translations = {
  nav: {
    home: string;
    arca: string;
    lingga: string;
    literacy: string;
    others: string;
    exploreTemple: string;
    searchPlaceholder: string;
  };
  home: {
    discoverPrambanan: string;
    subtitle: string;
    exploreBtn: string;
  };
  others: {
    title: string;
  };
  jaladwara: {
    backBtn: string;
    category: string;
    title: string;
    desc1: string;
    desc2: string;
  };
};

// 📍 ADD YOUR TRANSLATION DICTIONARY HERE:
const dictionaries: Record<LanguageCode, Translations> = {
  id: {
    nav: {
      home: "Beranda",
      arca: "Arca",
      lingga: "Lingga",
      literacy: "Literasi",
      others: "Lainnya",
      exploreTemple: "Jelajahi Candi",
      searchPlaceholder: "Cari destinasi...",
    },
    home: {
      discoverPrambanan: "Jelajahi Candi Prambanan",
      subtitle:
        "Prambanan adalah rumah bagi simbol-simbol keagamaan Hindu utama yang dibangun pada abad ke-9.",
      exploreBtn: "Bawa saya ke sana",
    },
    others: {
      title: "Lainnya",
    },
    jaladwara: {
      backBtn: "← Kembali ke Lainnya",
      category: "Detail Artefak",
      title: "Jaladwara",
      desc1:
        "Jaladwara adalah pancuran air batu suci dengan ukiran rumit yang berfungsi untuk tujuan praktis dan spiritual di kompleks candi Hindu-Buddha.",
      desc2:
        "Dirancang secara fungsional untuk saluran air, pancuran ini memungkinkan air hujan dan cairan ritual keluar dari ruang dalam candi secara aman, sekaligus menyimbolkan pemurnian air suci melalui saluran arsitektur sakral.",
    },
  },
  en: {
    nav: {
      home: "Home",
      arca: "Arca",
      lingga: "Lingga",
      literacy: "Literacy",
      others: "Others",
      exploreTemple: "Explore the Temple",
      searchPlaceholder: "Search destinations...",
    },
    home: {
      discoverPrambanan: "Discover Prambanan Temple",
      subtitle:
        "Prambanan is home to major Hindu religious symbols that were built in the 9th century.",
      exploreBtn: "Take me there",
    },
    others: {
      title: "Others",
    },
    jaladwara: {
      backBtn: "← Back to Others",
      category: "Artifact Details",
      title: "Jaladwara",
      desc1:
        "Jaladwara is a sacred stone water spout carved intricately to serve both functional and spiritual purposes within ancient Hindu-Buddhist temple complexes.",
      desc2:
        "Functionally designed for drainage, these spouts allowed rainwater and ritual liquids to exit the temple inner chambers safely, while spiritually symbolizing holy water purified through sacred architectural conduits.",
    },
  },
  zh: {
    nav: {
      home: "首页",
      arca: "雕像",
      lingga: "林伽",
      literacy: "文献",
      others: "其他",
      exploreTemple: "探索寺庙",
      searchPlaceholder: "搜索目的地...",
    },
    home: {
      discoverPrambanan: "探索普兰巴南寺庙",
      subtitle: "普兰巴南是9世纪建造的主要印度教宗教象征的所在地。",
      exploreBtn: "带我去那里",
    },
    others: {
      title: "其他",
    },
    jaladwara: {
      backBtn: "← 返回其他",
      category: "文物详情",
      title: "Jaladwara (排水口)",
      desc1:
        "Jaladwara 是雕刻精美的神圣石制排水口，在古印度教和佛教寺庙群中兼具实用与精神功能。",
      desc2:
        "在功能上用于排水，使雨水和仪式液体安全排出寺庙内室；在精神上则象征着通过神圣建筑管道净化圣水。",
    },
  },
};

type LanguageContextType = {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>("en");

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: dictionaries[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
