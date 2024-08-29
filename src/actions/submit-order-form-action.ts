export const submitOrderFormAction = async (
  formState: { message: string },
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
      message: "Please fill out all fields.",
    };

  const URL = `https://api.helpdesk.com/v1/tickets`;
  const authHeader = `Bearer ${process.env.HELPDESK_API_KEY || ""}`;
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
  //     throw new Error(`Failed to submit contact form`);
  //   }

  //   await response.json();
  // } catch (error) {
  //   if (error instanceof Error) {
  //     return { message: error.message };
  //   } else {
  //     return { message: "Something went wrong..." };
  //   }
  // }

  return { message: "success" };
};
