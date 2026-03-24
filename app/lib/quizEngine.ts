// /lib/quizEngine.ts

import { products } from "@/data/products";

export type QuizResult = {
  productName: string;
  priceRange: string;
  description: string;
  amazonUrl: string;
  imageUrl: string;
  alternatives: Array<{ name: string; url: string; note?: string; imageUrl?: string }>;
};

export function getResult(answers: any): QuizResult {
  const budget = answers?.q4;

  if (budget === "under50") {
    const p = products.easyclean;
    return {
      productName: p.name,
      priceRange: p.priceRange,
      description: p.description,
      amazonUrl: p.amazonUrl,
      imageUrl: p.imageUrl,
      alternatives: [
        {
          name: products.classic.name,
          url: products.classic.amazonUrl,
          note: "A low-cost, easy-to-clean option.",
          imageUrl: products.classic.imageUrl,
        },
        {
          name: "Litter Mat + Scoop Set",
          url: "https://www.amazon.com/s?k=litter+mat+set",
          note: "Keep litter tracked on the floor to a minimum.",
          imageUrl: "https://m.media-amazon.com/images/I/71Zt+8s9nDL._AC_UL320_.jpg",
        },
      ],
    };
  }

  if (budget === "50to150") {
    const p = products.autoselfie;
    return {
      productName: p.name,
      priceRange: p.priceRange,
      description: p.description,
      amazonUrl: p.amazonUrl,
      imageUrl: p.imageUrl,
      alternatives: [
        {
          name: products.easyclean.name,
          url: products.easyclean.amazonUrl,
          note: "A practical upgrade from basic litter options.",
          imageUrl: products.easyclean.imageUrl,
        },
        {
          name: products.classic.name,
          url: products.classic.amazonUrl,
          note: "A trusty classic if you want a basic, dependable option.",
          imageUrl: products.classic.imageUrl,
        },
      ],
    };
  }

  if (budget === "150to400" || budget === "400plus") {
    const p = products.smartclean;
    return {
      productName: p.name,
      priceRange: p.priceRange,
      description: p.description,
      amazonUrl: p.amazonUrl,
      imageUrl: p.imageUrl,
      alternatives: [
        {
          name: products.autoselfie.name,
          url: products.autoselfie.amazonUrl,
          note: "A strong mid-tier alternative with automated features.",
          imageUrl: products.autoselfie.imageUrl,
        },
        {
          name: products.classic.name,
          url: products.classic.amazonUrl,
          note: "Good value fallback with simple reliability.",
          imageUrl: products.classic.imageUrl,
        },
      ],
    };
  }

  // Fallback recommendation
  const p = products.classic;
  return {
    productName: p.name,
    priceRange: p.priceRange,
    description: p.description,
    amazonUrl: p.amazonUrl,
    imageUrl: p.imageUrl,
    alternatives: [
      {
        name: products.easyclean.name,
        url: products.easyclean.amazonUrl,
        note: "Quick solid alternative for basic home use.",
        imageUrl: products.easyclean.imageUrl,
      },
      {
        name: products.autoselfie.name,
        url: products.autoselfie.amazonUrl,
        note: "More features if you want a moderate upgrade.",
        imageUrl: products.autoselfie.imageUrl,
      },
    ],
  };
}
