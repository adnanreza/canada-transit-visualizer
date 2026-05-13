import { useSyncExternalStore, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

const subscribe = () => () => {};
const getClient = () => true;
const getServer = () => false;

export default function ClientOnly({ children, fallback = null }: Props) {
  const isClient = useSyncExternalStore(subscribe, getClient, getServer);
  return <>{isClient ? children : fallback}</>;
}
