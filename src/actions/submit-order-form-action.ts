import type {
  FormStateType,
  MessageType,
  ErrorsType,
} from "@/components/ui/modal/modal";

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

  // Perform validation
  const errors: ErrorsType = {};

  // if (!email || email.trim() === "") {
  //   errors.email = "Email is required";
  // } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
  //   errors.email = "Invalid email address";
  // }

  // if (!fullName || fullName.trim() === "") {
  //   errors.fullName = "Name is required";
  // }

  // if (!address || address.trim() === "") {
  //   errors.address = "Address is required";
  // }

  // if (!cardNumber || cardNumber.trim() === "") {
  //   errors.cardNumber = "Card number is required";
  // } else if (!/^\d{16}$/.test(cardNumber)) {
  //   errors.cardNumber = "Card number must be 16 digits";
  // }

  // if (!cardHolderName || cardHolderName.trim() === "") {
  //   errors.cardHolderName = "Cardholder name is required";
  // }

  // if (!expiryDate || expiryDate.trim() === "") {
  //   errors.expiryDate = "Expiry date is required";
  // } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
  //   errors.expiryDate = "Expiry date must be in MM/YY format";
  // }

  // if (!cvc || cvc.trim() === "") {
  //   errors.cvc = "CVC is required";
  // } else if (!/^\d{3,4}$/.test(cvc)) {
  //   errors.cvc = "CVC must be 3 or 4 digits";
  // }

  // If there are errors, return them
  if (Object.keys(errors).length > 0) {
    return { message: "fail" as MessageType, errors };
  }

  const URL = "REPLACE_WITH_YOUR_API_URL";
  const authHeader = "Bearer REPLACE_WITH_YOUR_AUTH_TOKEN";
  const payload = Object.fromEntries(formData.entries());

  const requestConfig = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: authHeader,
    }),
    body: JSON.stringify(payload),
  };

  try {
    // const response = await fetch(URL, requestConfig);
    const response = await new Promise<Response>((resolve) => {
      setTimeout(resolve, 5000);
    });

    if (!response.ok) {
      throw new Error(`Failed to submit contact form.`);
    }

    await response.json();
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: "fail" as MessageType,
        errors: { form: error.message },
      };
    } else {
      return {
        message: "fail" as MessageType,
        errors: {
          form: "An unknown error occurred while submitting your form",
        },
      };
    }
  }

  return {
    message: "success" as MessageType,
    errors: {},
  };
};
