import React, { ReactElement } from "react";
import {Button} from "antd";

interface CurrexButtonProps {
  label: string;
  disabled?: boolean;
  icon?: ReactElement;
  style?:object
}

function CurrexButton({ disabled,style, label, icon }: CurrexButtonProps) {
  return (
    <>
      <Button
        size={"large"}
        disabled={disabled}
        type="primary"
        className={"text-white w-full flex items-center justify-center"}
        style={{ backgroundColor: !disabled ? "#1677ff" : "#85898f" ,...style}}
      >
        {label} &nbsp;{icon}
      </Button>
    </>
  );
}

export default CurrexButton;
