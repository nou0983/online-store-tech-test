import { CartProvider } from "@/contexts/cart/cart-context";
import { ModalProvider } from "@/contexts/modal/modal-context";

type ContextProvidersProps = {
  children: React.ReactNode;
};

const ContextProviders = ({ children }: ContextProvidersProps) => {
  return (
    <CartProvider>
      <ModalProvider>{children}</ModalProvider>
    </CartProvider>
  );
};

export default ContextProviders;
