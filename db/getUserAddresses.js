import { query } from 'db';
import { defaultAddressText, otherAddressesText } from 'db/queries/addressText';

export const getDefaultAddress = async (id) => {
  const defaultAddress = await query(defaultAddressText, [id]);
  return defaultAddress;
};

export const getOtherAddresses = async (id) => {
  const otherAddresses = await query(otherAddressesText, [id]);
  return otherAddresses;
};
