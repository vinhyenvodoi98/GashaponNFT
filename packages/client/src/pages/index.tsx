import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Layout from '@/components/layout/Layout';
import Collections from '@/components/Collections';

export default function HomePage() {
  const { address } = useAccount();
  const [collections, setCollections] = useState([])

  useEffect(() => {
    const getUserCollection = async (address: `0x${string}`) => {
      const bgResponse = await fetch(`/api/collections?creator=${address}`);
      const response = await bgResponse.json()
      setCollections(response.collections)
    }

    if(address) getUserCollection(address)
  }, [address])

  return (
    <Layout>
      <div className='container m-auto min-h-main mt-10'>
        <h1 className='mb-10'>Collections</h1>
        <Collections collections={collections}/>
      </div>
    </Layout>
  );
}
