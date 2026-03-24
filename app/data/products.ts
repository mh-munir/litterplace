export type Product = {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  amazonUrl: string;
  imageUrl: string;
};

// NOTE: For real Amazon product images, replace these with the image URL from the product's page.
// Example pattern: https://m.media-amazon.com/images/I/<ASIN>._AC_SL1500_.jpg
export const products: Record<string, Product> = {
  easyclean: {
    id: "easyclean",
    name: "EasyClean Disposable Litter Box",
    description: "A simple no-fuss litter box that keeps things clean without any hassle — great for tight budgets and small spaces.",
    priceRange: "Around $45",
    amazonUrl: "https://www.amazon.com/s?k=disposable+litter+box&ref=nb_sb_noss_2",
    imageUrl: "https://m.media-amazon.com/images/I/71MYSCuJ86L._AC_UL320_.jpg",
  },
  autoselfie: {
    id: "autoselfie",
    name: "AutoSelfie Litter Box",
    description: "A smart litter box with self-cleaning features to save time and keep smells under control.",
    priceRange: "Around $120",
    amazonUrl: "https://www.amazon.com/s?k=self+cleaning+litter+box",
    imageUrl: "https://m.media-amazon.com/images/I/81FgBFZwwUL._AC_UL320_.jpg",
  },
  smartclean: {
    id: "smartclean",
    name: "SmartClean Elite Litter System",
    description: "A premium self-cleaning litter system designed for busy households and multiple cats.",
    priceRange: "Around $350",
    amazonUrl: "https://www.amazon.com/s?k=premium+self+cleaning+litter+box",
    imageUrl: "https://m.media-amazon.com/images/I/71IM3LawNQL._AC_UL320_.jpg",
  },
  classic: {
    id: "classic",
    name: "Classic Litter Box",
    description: "A solid all-around litter box that works well for most cats and living situations.",
    priceRange: "Varies",
    amazonUrl: "https://www.amazon.com/s?k=litter+box",
    imageUrl: "https://m.media-amazon.com/images/I/71dLY5-S3HL._AC_UL320_.jpg",
  },
};
