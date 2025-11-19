// import sharp from "sharp";
// import fs from "fs";
// import path from "path";
//
// export async function optimizeImages() {
//   const imageDir = path.resolve("./dist/assets");
//
//   if (!fs.existsSync(imageDir)) {
//     console.log("Папка assets не знайдена, пропускаємо оптимізацію");
//     return;
//   }
//
//   const files = fs.readdirSync(imageDir);
//
//   for (const file of files) {
//     if (/\.(jpe?g|png)$/i.test(file)) {
//       const inputFilePath = path.join(imageDir, file);
//
//       // Конвертація в WebP
//       const outputFilePathWebP = path.join(
//         // imageDir,
//         path.dirname(inputFilePath),
//         `${path.basename(file, path.extname(file))}.webp`
//       );
//
//       await sharp(inputFilePath)
//         .webp({ lossless: true, quality: 75 })
//         .toFile(outputFilePathWebP);
//
//       // // in AVIF
//       // const outputFilePathAVIF = path.join(
//       //   imageDir,
//       //   `${path.basename(file, path.extname(file))}.avif`
//       // );
//       // await sharp(inputFilePath)
//       //   .avif({ quality: 75 })
//       //   .toFile(outputFilePathAVIF);
//     }
//   }
//
//   console.log("Оптимізація зображень завершена (тільки WebP)");
// }
//
// optimizeImages();

import sharp from "sharp";
import fs from "fs";
import path from "path";
import chokidar from "chokidar";

const imageDir = path.resolve("./src/image");

// Рекурсивно отримуємо всі файли в папці та підпапках
function getAllFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = entries.flatMap(entry => {
    const res = path.join(dir, entry.name);
    return entry.isDirectory() ? getAllFiles(res) : res;
  });
  return files;
}

// Конвертація одного файлу у WebP
async function convertToWebP(filePath) {
  if (!/\.(jpe?g|png)$/i.test(filePath)) return;

  const outputFilePathWebP = path.join(
    path.dirname(filePath),
    `${path.basename(filePath, path.extname(filePath))}.webp`
  );

  try {
    await sharp(filePath)
      .webp({ lossless: true, quality: 75 })
      .toFile(outputFilePathWebP);
    console.log(`Конвертовано: ${filePath}`);
  } catch (err) {
    console.error(`Помилка при конвертації ${filePath}:`, err);
  }
}

// Оптимізація всіх зображень
async function optimizeAllImages() {
  if (!fs.existsSync(imageDir)) return;
  const files = getAllFiles(imageDir);
  for (const file of files) {
    await convertToWebP(file);
  }
}

// Спостерігач за всіма підпапками
function watchImages() {
  const watcher = chokidar.watch(imageDir, {
    persistent: true,
    ignoreInitial: true,
    depth: 99, // рекурсивно
  });

  watcher.on("add", convertToWebP);
  watcher.on("change", convertToWebP);

  console.log(`Спостерігач запущено для ${imageDir}`);
}

// Запуск
(async () => {
  await optimizeAllImages(); // обробляємо всі наявні файли
  watchImages(); // слідкуємо за новими/змінними файлами
})();
