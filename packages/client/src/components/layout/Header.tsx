import * as React from 'react';

import Wallet from '@/components/Providers/wallet';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='sticky top-0 z-50'>
      <div className='layout flex items-center justify-between'>
        <div className="navbar bg-base-200 rounded-full mt-4 px-6">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Homepage</a></li>
                <li><a>Portfolio</a></li>
                <li><a>About</a></li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <a className="btn btn-ghost text-xl">Home</a>
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
