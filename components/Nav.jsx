"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {sigin, signout, useSession, getProviders, signIn} from 'next-auth/react'
const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setproviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)
  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setproviders(response);
    } 
    setProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
    <Link href='/' className='flex gap-2 flex-center'>
      <Image className="object-contain" src='/assets/images/logo.svg'
        alt='Promtopia logo'
        width={30}
        height={30}
      />
      <p className='logo_text'>Promtopia</p>
    </Link>
    {/* DeskTop Navigation */}
    <div className='sm:flex hidden'>
      {isUserLoggedIn ? 
      <div className='flex gap-3 md:gap-5'>
        <Link className='black_btn' href={'/create-prompt'}>Create Post</Link>
        <button type='button' className='outline_btn'>signout</button>
        <Link href={'/profile'}>
          <Image 
          src={'/assets/images/logo.svg'}
          width={37}
          height={37}
          className='object-contain'
          alt='profile'
          />
        </Link>
      </div>
      : 
      <>
        {
          providers && Object.values(providers).map((provider) => (
            <button 
            type='button'
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className='black_btn'
            >
            SignIn</button>
          ))
        }
      </>
      }
    </div>
    {/* Mobile Nav */}
    <div className='sm:hidden flex relative'>
      {isUserLoggedIn ? 
      <>
        <div className='flex'>
          <Image 
          src={'/assets/images/logo.svg'}
          width={37}
          height={37}
          className='object-contain'
          alt='profile'
          onClick={() => setToggleDropdown((prev) => !prev)}
          />
           {toggleDropdown && 
           <div className='dropdown'>
              <Link 
              href={'/profile'}
              className='dropdown_link'
              onClick={() => setToggleDropdown(false)}
              >
                My Profile
              </Link>
              <Link 
              href={'/create-prompt'}
              className='dropdown_link'
              onClick={() => setToggleDropdown(false)}
              >
                Create Post
              </Link>
              <button 
              className='mt-5 w-full black_btn'
              type='button'
              onClick={() => {
                setToggleDropdown(false)
                signout()
                }}
              >Sign Out</button>
           </div>
           } 
        </div>
      </> : <>
        {
          providers && Object.values(providers).map((provider) => (
            <button 
            type='button'
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className='black_btn'
            >
            SignIn</button>
          ))
        }
      </>}
    </div>
    </nav>
  )
}

export default Nav