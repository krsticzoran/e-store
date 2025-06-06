import validationSubmitOrder from "@/schemas/submit-order";

export function validateFormInput(formData) {
  const {
    firstName: first_name,
    lastName: last_name,
    address1: address_1,
    city,
    postcode,
    country,
    email,
    phone,
  } = Object.fromEntries(formData);

  const error = validationSubmitOrder({
    first_name,
    last_name,
    address_1,
    city,
    postcode,
    country,
    email,
    phone,
  });

  if (error) return error;

  return {
    first_name,
    last_name,
    address_1,
    city,
    postcode,
    country,
    email,
    phone,
  };
}
