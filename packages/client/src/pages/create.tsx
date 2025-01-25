'use client';

import Loading from '@/components/Loading';
import Wallet from '@/components/Providers/wallet';
import UploadImage from '@/components/UploadImage';
import { uploadWeb3Storage, web3StorageLink } from "@/services/web3Storage"
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';

export default function DeployContract() {
    const [image, setImage] = useState<File | null>(null);
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [price, setPrice] = useState(0)
    const [prompt, setPrompt] = useState('')
    const [status, setStatus] = useState(0)
    const [cid, setCid] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

    const { address } = useAccount();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus(1) // start upload
      const cid = await uploadWeb3Storage(image)
      setCid(web3StorageLink(cid))
      // sendAsync()
      console.log(cid)
      await uploadContractData(web3StorageLink(cid), "")
      setStatus(0) // set contract
    };

    const uploadContractData = async (cid:any, contractAddress:any) => {
      const body = {
        creator: address as string,
        image: cid,
        name: name,
        symbol: symbol,
        contractAddress,
        prompt,
        price
      }
      const bgResponse = await fetch('/api/collections', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      console.log(bgResponse)
    }

    return (
      <div className="min-h-main flex items-center justify-center">
        <Loading state={status} description='Creating contract'/>
        <div className="container mx-auto px-4 max-w-lg">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
            Let's create a smart contract for your drop.
          </h1>
          <p className='mb-4'>You will need to deploy an ERC-721 contract onto the blockchain before you can create a drop.</p>

          <form className="p-6 rounded-lg" onSubmit={handleSubmit}>

            {/* Image Upload */}
            <div className="mb-10">
              <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">
                Upload logo Image
              </label>
              <UploadImage setFile={setImage}/>
            </div>
            {/* Name Input */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Contract Name
              </label>
              <input
                type="text"
                id="name"
                className="input input-bordered block w-full text-gray-700 border border-gray-300 p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter contract name"
              />
            </div>

            {/* Symbol Input */}
            <div className="mb-4">
              <label htmlFor="symbol" className="block text-gray-700 font-semibold mb-2">
                Contract Symbol
              </label>
              <input
                type="text"
                id="symbol"
                className="input input-bordered block w-full text-gray-700 border border-gray-300 p-2"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Enter contract symbol"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="symbol" className="block text-gray-700 font-semibold mb-2">
                Prompt
              </label>
              <input
                type="text"
                id="prompt"
                className="input input-bordered block w-full text-gray-700 border border-gray-300 p-2"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter NFT prompt"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="symbol" className="block text-gray-700 font-semibold mb-2">
                Price
              </label>
              <input
                type="text"
                id="price"
                className="input input-bordered block w-full text-gray-700 border border-gray-300 p-2"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Input price of each NFT"
              />
            </div>

            {/* Submit Button */}
            {
              address ?
                <button
                  type="submit"
                  className="w-full btn btn-primary text-white py-2 px-4 rounded-full transition"
                >
                  Create
                </button> :
                <div className='w-full items-center'>
                  <Wallet/>
                </div>
            }
          </form>
        </div>
      </div>
    );
  };
