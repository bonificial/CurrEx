import React, {ReactElement} from "react";

interface CurrexButtonProps {

  label: string;
  icon?:ReactElement
}

function CurrexButton({ label,icon }: CurrexButtonProps) {
  return (
    <>
      <button className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded flex items-center justify-center">
          Convert  {icon}
      </button>
    </>
  );
}

export default CurrexButton;