const removeSpecialChars = (str: string) => {
  return str
    .normalize("NFD") // tách dấu (ví dụ: "Đồng" → "Dòng")
    .replace(/[\u0300-\u036f]/g, "") // xoá dấu kết hợp
    .replace(/đ/g, "d") // thay đ → d
    .replace(/Đ/g, "D") // thay Đ → D
    .replace(/[^\w\s-]/g, "") // chỉ giữ chữ, số, dấu cách và dấu -
    .trim();
};

export const urlFormat = (productName: string, id: string) => {
  const cleaned = removeSpecialChars(productName);
  return cleaned.replace(/\s+/g, "-") + `-i,${id}`;
};

export const getIdFromURL = (URLname: string) => {
  const parts = URLname.split("-i,");
  return parts[parts.length - 1];
};
