import React from "react";

interface conversionDataProps {
  textToDisplay: string | number;
}

function ConversionCard({ textToDisplay }: conversionDataProps) {
  return (
    <p
      className={
        "p-6 font-bold border-2 border-slate-300 rounded text-white text-center text-xl"
      }
    >
      {textToDisplay}
    </p>
  );
}

export default ConversionCard;