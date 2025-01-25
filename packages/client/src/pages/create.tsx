'use client';

import Loading from '@/components/Loading';
import Wallet from '@/components/Providers/wallet';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';

export default function DeployContract() {
    const [image, setImage] = useState<File | null>(null);
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [status, setStatus] = useState(0)
    const [cid, setCid] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

    const { address } = useAccount();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // await uploadContractData("")
    };

    return (
      <div className="min-h-main flex items-center justify-center">
        <Loading state={status} description='Creating contract'/>
        {/* <button onClick={()=> getPublickey()}>Test</button> */}
        <div className="container mx-auto px-4 max-w-lg">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
            Let's create a smart contract for your drop.
          </h1>
          <p className='mb-4'>You will need to deploy an ERC-721 contract onto the blockchain before you can create a drop.</p>

          <form className="p-6 rounded-lg" onSubmit={handleSubmit}>
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
