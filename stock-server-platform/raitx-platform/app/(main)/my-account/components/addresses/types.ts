export interface Address {
  id: string;
  type: "shipping" | "billing";
  fullName: string;
  phone: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
}

export interface AddressFormData {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
}

