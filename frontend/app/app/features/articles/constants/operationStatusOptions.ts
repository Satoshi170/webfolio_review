import { candidateOperationStatusData } from "@/app/constants/datas/portfolios/operationStatuses";

import type {
  MapOptions,
  Option
} from "@/app/components/molecules/fields/SelectBoxField/types";

const operationStatusMappingOptions: MapOptions<typeof candidateOperationStatusData> = {
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

export const operationStatusOptions: Option[] = Object.values(
  operationStatusMappingOptions
);
