export interface Warranty {
  id: string;
  text: string;
  price: number;
}

export interface Color {
  name: string;
  value: string;
  hex: string;
}

export const WARRANTIES: Warranty[] = [
  { id: "36", text: "گارانتی 36 ماهه، رایانه همراه", price: 0 },
  { id: "18", text: "گارانتی 18 ماهه، رایانه همراه", price: -500000 },
  { id: "12", text: "گارانتی 12 ماهه، رایانه همراه", price: -1000000 },
];

export const COLORS: Color[] = [
  { name: "black", value: "black", hex: "#000000" },
  { name: "red", value: "red", hex: "#ff0000" },
  { name: "white", value: "white", hex: "#ffffff" },
  { name: "blue", value: "blue", hex: "#3b82f6" },
];

export const PRODUCT_IMAGES: string[] = [
  "/Images/Shop/product-pic1.jpg",
  "/Images/Shop/product-pic10.png",
  "/Images/Shop/product-pic11.png",
  "/Images/Shop/product-pic12.png",
];
