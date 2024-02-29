import { candidateOperationStatusData } from "@/app/constants/datas/portfolios/operationStatuses";

import type { MapOptions, Option } from "./types";

const operationStatusMappingOptions: MapOptions<typeof candidateOperationStatusData> = {
  active: { label: "active", value: candidateOperationStatusData.active.toString() },
  maintenance: {
    label: "maintenance",
    value: candidateOperationStatusData.maintenance.toString()
  },
  inactive: {
    label: "inactive",
    value: candidateOperationStatusData.inactive.toString()
  }
};

export const operationStatusOptions: Option[] = Object.values(
  operationStatusMappingOptions
);
