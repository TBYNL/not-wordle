import CryptoJS from "crypto-js";

export const encryptData = (data, key) => {
  let dataToBeEncrypted;
  if (typeof data === "string") dataToBeEncrypted = data;
  else if (typeof data === "number") dataToBeEncrypted = data.toString();
  return CryptoJS.AES.encrypt(dataToBeEncrypted, key).toString();
};