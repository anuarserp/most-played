import { createCanvas, loadImage } from "canvas";

interface Colors {
  [color: string]: number;
}

export const getPredominantColor = async (
  url: string
): Promise<{ color: string; luminance: number }> => {
  const buffer = await fetch(url).then((res) => res.arrayBuffer());
  const binary = Buffer.from(buffer).toString("base64");
  const base64Flag = `data:image/jpeg;base64,${binary}`;

  const img = await loadImage(base64Flag);
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return {
      color: "#000000",
      luminance: 0,
    };
  }
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, img.width, img.height);
  const data = imageData.data;
  const colors: Colors = {};
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const rgb = `rgba(${r}, ${g}, ${b}, 1)`;
    colors[rgb] = (colors[rgb] || 0) + 1;
  }
  const color = Object.keys(colors).reduce((a, b) =>
    colors[a] > colors[b] ? a : b
  );
  return {
    color,
    luminance: luminancia(color),
  };
};

export const luminancia = (color: string): number => {
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};
