export const operationStatuses = [
  { key: 0, value: "active" },
  { key: 1, value: "maintenance" },
  { key: 2, value: "inactive" }
] as const;

type OperationStatusValue = (typeof operationStatuses)[number]["value"];

export const operationStatusOptions = operationStatuses.map((item) => ({
  value: String(item.key),
  label: item.value
}));

export const getValueByLabel = (value: OperationStatusValue) => {
  const option = operationStatuses.find((status) => status.value === value);
  return String(option!.key);
};
