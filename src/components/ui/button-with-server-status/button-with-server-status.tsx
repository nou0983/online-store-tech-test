"use client";

import { useFormStatus } from "react-dom";
import { Spinner, Button } from "../index.ui";

type ButtonWithServerStatusProps = {
  children: React.ReactNode;
  disabled?: boolean;
};

const ButtonWithServerStatus = ({
  children,
  disabled = false,
}: ButtonWithServerStatusProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={disabled || pending} color="green">
      {pending ? <Spinner size="small" /> : children}
    </Button>
  );
};

export default ButtonWithServerStatus;
