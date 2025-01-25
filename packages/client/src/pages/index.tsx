import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Layout from '@/components/layout/Layout';
import Collections from '@/components/Collections';

export default function HomePage() {
  const { address } = useAccount();
  const [collections, setCollections] = useState([])

  useEffect(() => {
    const getUserCollection = async () => {
      const bgResponse = await fetch(`/api/collections`);
      const response = await bgResponse.json()
      setCollections(response.collections)
    }

    getUserCollection()
  }, [])

  return (
    <Layout>
      <div className='container m-auto min-h-main mt-10'>
        <h1 className='mb-10'>Collections</h1>
        <Collections collections={collections}/>
      </div>
    </Layout>
  );
}
