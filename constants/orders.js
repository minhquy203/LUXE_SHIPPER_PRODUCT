// Define status transitions in a configuration object for easy maintenance

export const STATUS_TRANSITIONS = {
  "Shipper đã nhận hàng": "Đang giao",
  "Đang giao": "Đã giao",
  "Đã giao": "Giao hàng thành công",
};

export const ALLOW_UPDATE_STATUS = [
  "Shipper đã nhận hàng",
  "Đang giao",
  "Đã giao",
];
