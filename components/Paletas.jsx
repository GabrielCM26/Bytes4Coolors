import { useState } from "react";

// Função que retorna uma string com uma cor aleatória em hexadecimal 
function randomHexColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

const unlockIcon = "/unlock.png";
const lockIcon = "/padlock.png";
const copyIcon = "/copy.png";
const removeIcon = "/remove.png";

export default function Bytes() {
  const [paleta, setPaleta] = useState([
    { hex: randomHexColor(), locked: false },
    { hex: randomHexColor(), locked: false },
    { hex: randomHexColor(), locked: false },
    { hex: randomHexColor(), locked: false },
    { hex: randomHexColor(), locked: false }
  ]);

  function gerarNovaPaleta() {
    setPaleta(
      paleta.map(cor => (cor.locked ? cor : { ...cor, hex: randomHexColor() }))
    );
  }

  function adicionarNovaPaleta() {
    const novaCor = { hex: randomHexColor(), locked: false }
    setPaleta([...paleta, novaCor])
  }


  function lockColor(index) {
    setPaleta(
      paleta.map((cor, i) =>
        i === index ? { ...cor, locked: !cor.locked } : cor
      )
    );
  }

  function copyHex(hex) {
    navigator.clipboard.writeText(hex);
    alert(`Copied ${hex} to clipboard!`);
  }


  function removerNovaPaleta(index) {
    setPaleta(paleta.filter((cor, i) => i !== index || cor.locked));
  }


  return (
    <div className="h-screen flex flex-col md:flex-row">
      {paleta.map((cor, index) => (
        <div
          key={index}
          className="flex-1 flex flex-col items-center justify-center transition-transform duration-300 relative"
          style={{ backgroundColor: cor.hex }}
        >
          {/* Hex code */}
          <span className="text-white font-bold text-2xl drop-shadow-lg mb-3">
            {cor.hex}
          </span>

          {/* Buttons container */}
          <div className="flex flex-col items-center gap-3 mt-3">
            {/* Lock/Unlock button */}
            <button
              onClick={() => lockColor(index)}
              className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:scale-110 transition cursor-pointer"
            >
              <img
                src={cor.locked ? lockIcon : unlockIcon}
                alt={cor.locked ? "Locked" : "Unlocked"}
                className="w-12 h-12"
              />
            </button>

            {/* Copy button */}
            <button
              onClick={() => copyHex(cor.hex)}
              className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:scale-110 transition cursor-pointer"
            >
              <img
                src={copyIcon}
                alt="Copy"
                className="w-12 h-12"
              />
            </button>

            {/* Remove button */}
            <button
              onClick={() => removerNovaPaleta(index)}
              className="flex items-center justify-center w-12 h-12 rounded-full hover:scale-110 transition cursor-pointer"
            >
              <img
                src={removeIcon}
                alt="Remove"
                className="w-7 h-7"
              />
            </button>
          </div>
        </div>
      ))}

      {/* Add button */}
      <button className=" fixed bottom-20 right-5 px-4 py-2 bg-white text-black font-bold rounded-lg shadow-lg hover:bg-gray-200 transition" onClick={adicionarNovaPaleta}> Adicionar paleta</button>
      {/* Generate button */}
      <button
        onClick={gerarNovaPaleta}
        className="fixed bottom-5 right-5 px-4 py-2 bg-white text-black font-bold rounded-lg shadow-lg hover:bg-gray-200 transition"
      >
        Gerar Nova Paleta
      </button>
    </div>
  );
}
