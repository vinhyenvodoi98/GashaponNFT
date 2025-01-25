import * as React from 'react';

import Wallet from '@/components/Providers/wallet';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='sticky top-0 z-50'>
      <div className='layout flex items-center justify-between'>
        <div className="navbar bg-base-200 rounded-full mt-4 px-6">
          <div className="navbar-start">
            <Link href='/'>
              <p className="btn btn-ghost text-xl">Home</p>
            </Link>
          </div>
          <div className="navbar-end gap-4">
            <Link href='/create'>
              <button className='btn btn-primary w-24 rounded-lg'>Create</button>
            </Link>
            <Wallet />
          </div>
        </div>
      </div>
    </header>
    // <header className='sticky top-0 z-50 bg-white'>
    //   <div className='layout flex h-14 items-center justify-between'>
    //     <div>Home</div>
    //     <Wallet />
    //   </div>
    // </header>
  );
}
