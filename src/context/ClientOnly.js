"use client"

import { useEffect, useState } from "react";

// This component ensures its children only render on the client side
const ClientOnly = ({ children, key }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  // Apply the key to force re-rendering when it changes
  return <div key={key}>
    <div className="text-4xl bg-white my-2">This rendering but components are not rendering</div>
    {children}</div>;
};

export default ClientOnly;