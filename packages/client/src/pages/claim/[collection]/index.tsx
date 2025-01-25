'use client';

import Loading from '@/components/Loading';
import Wallet from '@/components/Providers/wallet';
import { shortenAddress } from '@/utils/string';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount, useContractRead, useContractReads, useContractWrite } from 'wagmi';
import MantleMistrery from '../../../../../contracts-foundry/out/MantleMistrery.sol/MantleMistrery.json'
import { formatEther, parseEther, parseGwei } from 'viem';

export default function Mint() {
  const [nft, setNft] = useState<any>()
  const [status, setStatus] = useState(0)
  const { address } = useAccount();
  const router = useRouter()
  const { collection } = router.query;
  const encoder = new TextEncoder();

  const handleSubmit = async () => {
    setStatus(1)
    write()
    setStatus(0)
  };

  const { data } = useContractReads({
    contracts:[
      {
        address: collection as `0x${string}`,
        abi: MantleMistrery.abi as any,
        functionName: 'estimateFee',
        args: [50] //https://docs.ora.io/doc/ai-oracle/ai-oracle/references#stable-diffusion-v2-1
      },
      {
        address: collection as `0x${string}`,
        abi: MantleMistrery.abi as any,
        functionName: 'price',
      },
    ]
  })

  const fee = useMemo(() => {
    if(data?.[0].result && data?.[1].result) {
      return Number(data?.[0].result.toString()) +  Number(data?.[1].result.toString())
    } else{
      return 'loading'
    }
  }, [data])

  const { data: mintNFTData, write } = useContractWrite({
    address: collection as `0x${string}`,
    abi: MantleMistrery.abi as any,
    functionName: 'mintNFT',
    args: [address, 50],
    value: fee === 'loading' ? 0 : fee.toString() as any,
  })

  useEffect(() => {
    if(mintNFTData) {
      toast.success(`Transaction: ${JSON.stringify(mintNFTData)}`)
    }
  }, [mintNFTData])

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
            <div>
              Fee: {fee === "loading" ? "loading" : formatEther(fee as any).toString()} ETH
            </div>
            {/* <div className='badge badge-secondary'>
              {data?.[0].result ? formatEther(2*data?.[0].result as any) : "loading"} ETH as AI fee
            </div>
            <div className='badge badge-accent'>
              {data?.[1].result ? formatEther(data?.[1].result as any) : "loading"} ETH as NFT price
            </div> */}
            <div className="card-actions justify-between">
              <div>{collection && shortenAddress(collection as string)}</div>
              <div className="badge badge-outline">{nft ? nft.id : <div className='skeleton w-10 h-3'/>}</div>
            </div>
          </div>
        </div>
        { address ?
          <div className='w-96' onClick={() => handleSubmit()}>
            <button className='btn btn-primary w-full'>Mint</button>
          </div>
          :
          <Wallet/>
        }
      </div>
    </div>
  );
};