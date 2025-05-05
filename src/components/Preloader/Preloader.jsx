import React, { useEffect, useState } from 'react';

function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000); // 2 segundos

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="preloader">
      <div className="preloader__spinner" />
      <p>Cargando...</p>
    </div>
  );
}

export default Preloader;
