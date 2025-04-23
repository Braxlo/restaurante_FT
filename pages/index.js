import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Página de redirección al dashboard principal
const Home = () => {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/dashboard');
  }, []);
  
  return null;
};

export default Home;