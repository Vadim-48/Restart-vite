export const hero = {
  class: "picture--hero",
  fallback: "./src/image/sto.jpg",
  alt: "Головне зображення",
  sources: [
    { src: "./src/image/sto-400.webp", type: "image/webp", media: "(max-width: 400px)" },
    { src: "./src/image/sto-800.jpg", type: "image/jpeg", media: "(min-width: 401px)" }
  ]
};

// Можеш додати інші partial сюди пізніше
export const otherPartial = {
  // приклад
};
