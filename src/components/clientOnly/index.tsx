'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ClientOnlyProps {
  /**
   * Use this to server render a skeleton or loading state
   */
  ssr?: ReactNode | null;
  children: ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children, ssr }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <> {ssr ? ssr : null} </>;
  }
  return <>{children}</>;
};

export default ClientOnly;
