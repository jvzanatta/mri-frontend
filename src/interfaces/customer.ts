
export interface Customer {
  firstName: string;
  lastName: string;
  address: CustomerAddress;
};

export interface CustomerAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
}