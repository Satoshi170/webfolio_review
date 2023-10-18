import { notFound } from "next/navigation";

interface Props {
  pathname: string;
  routeKey: string;
}

export const getIdOrTriggerNotFound = ({ pathname, routeKey }: Props) => {
  const regex = new RegExp(`\\/${routeKey}\\/(\\d+)`);
  const match = pathname.match(regex);

  if (match && match[1] && /^\d+$/.test(match[1])) {
    return Number(match[1]);
  } else {
    notFound();
  }
};
