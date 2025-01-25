'use client';

import Loading from '@/components/Loading';
import Wallet from '@/components/Providers/wallet';
import { shortenAddress } from '@/utils/string';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';

export default function Mint() {
  const [nft, setNft] = useState<any>()
  const [status, setStatus] = useState(0)
  const { address } = useAccount();
  const router = useRouter()
  const { collection, tokenid } = router.query;
  const encoder = new TextEncoder();

  const handleSubmit = async () => {
    setStatus(1)
    setStatus(0)
  };

  return (
    <div className="min-h-main flex items-center justify-center">
      <Loading state={status} description='Minting'/>
      <div className="container mx-auto px-4 max-w-lg flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Claim your NFT
        </h1>
        <div className="card bg-base-100 w-96 shadow-xl mb-8">
          <figure className='h-80'>
            {/* {nft ? <img
              src={`${nft.image}`}
              alt="Shoes"
              className='h-full w-full object-contain' /> :
              <div className='skeleton w-full h-full'></div>
            } */}
            <div className='w-full h-full'>
              <img src='/img/mystery-gift.webp' alt='default-img' className='image-full'/>
            </div>
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {nft ? nft.name : <div className='skeleton w-36 h-8'/>}
            </h2>
            <p>{nft ? nft.description : <div className='skeleton w-full h-20'></div>}</p>
            <div className="card-actions justify-between">
              <div>{collection && shortenAddress(collection as string)}</div>
              <div className="badge badge-outline">{nft ? nft.id : <div className='skeleton w-10 h-3'/>}</div>
            </div>
          </div>
        </div>
        { address ?
          <div className='w-96' onClick={() => handleSubmit()}>
            <button className='btn btn-primary w-full'>Claim</button>
          </div>
          :
          <Wallet/>
        }
      </div>
    </div>
  );
};