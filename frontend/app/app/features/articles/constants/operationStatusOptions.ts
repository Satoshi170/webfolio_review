import { candidateOperationStatusData } from "./operationStatuses";

import type { MapSelectOptions, SelectOption } from "@/app/components/molecules";

const operationStatusMappingOptions: MapSelectOptions<
  typeof candidateOperationStatusData
> = {
  active: { label: "稼働中", value: candidateOperationStatusData.active.toString() },
  maintenance: {
    label: "メンテナンス中",
    value: candidateOperationStatusData.maintenance.toString()
  },
  inactive: {
    label: "サービス終了",
    value: candidateOperationStatusData.inactive.toString()
  }
};

export const operationStatusOptions: SelectOption[] = Object.values(
  operationStatusMappingOptions
);
