import { useEffect, useState } from "react";

const useProviderLogo = ({ providers, curId }) => {
  const [providerLogo, setProviderLogo] = useState('');

  useEffect(() => {
    if (providers.some(p => p.id === curId)) {
      setProviderLogo(providers.find(p => p.id === curId).logo);
    }
  }, [providers]);

  return { providerLogo }
}

export default useProviderLogo;
