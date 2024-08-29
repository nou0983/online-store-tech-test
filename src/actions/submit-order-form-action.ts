import type { FormStateType, MessageType } from "@/components/ui/modal/modal";

export const submitOrderFormAction = async (
  formState: FormStateType,
  formData: FormData
) => {
  const email = formData.get("email") as string;
  const fullName = formData.get("fullName") as string;
  const address = formData.get("address") as string;
  const cardNumber = formData.get("cardNumber") as string;
  const cardHolderName = formData.get("cardHolderName") as string;
  const expiryDate = formData.get("expiryDate") as string;
  const cvc = formData.get("cvc") as string;

  // Validate form data
  if (email.length <= 0 || fullName.length <= 0)
    return {
      message: "fail" as MessageType,
      errorObj: {
        name: "Name is required",
        email: "Email is required",
        address: null,
        cardNumber: null,
        cardHolderName: null,
        expiry: null,
        cvc: null,
      },
    };

  const URL = "REPLACE_WITH_YOUR_API_URL";
  const authHeader = "Bearer REPLACE_WITH_YOUR_AUTH_TOKEN";
  const payload = Object.fromEntries(formData.entries());
  console.log(payload);

  const requestConfig = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: authHeader,
    }),
    body: JSON.stringify(payload),
  };

  // try {
  //   const response = await fetch(URL, requestConfig);

  //   if (!response.ok) {
  //     throw new Error(`Failed to submit contact form.`);
  //   }

  //   await response.json();
  // } catch (error) {
  //   if (error instanceof Error) {
  //     return { message: error.message };
  //   } else {
  //     return { message: "Something went wrong..." };
  //   }
  // }

  return {
    message: "success" as MessageType,
    errorObj: {
      name: null,
      email: null,
      address: null,
      cardNumber: null,
      cardHolderName: null,
      expiry: null,
      cvc: null,
    },
  };
};
