"use client"; // Mark this as a Client Component

import { useEffect, useState } from "react";

const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // Render nothing on the server
  }

  return children; // Render children on the client
};

export default ClientOnly;