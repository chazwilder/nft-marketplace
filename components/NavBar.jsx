import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import images from '../assets';
/* eslint import/no-unresolved:0 */
import { Button } from '@/components';

const MenuItems = ({ isMobile, active, setActive }) => {
  const generateLink = (i) => {
    switch (i) {
      case 0:
        return '/';
      case 1:
        return '/created-nfts';
      case 2:
        return '/my-nfts';
      default:
        break;
    }
  };
  return (
    <ul className={`list-none flex-row flexCenter ${isMobile === true ? 'flex-col h-full' : undefined}`}>
      {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item);
          }}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-ntf-dark mx-3
        ${active === item
            ? 'dark:text-white text-nft-red-violet'
            : 'dark:text-ntf-gray-3 text-nft-gray-2'}`}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = ({ setActive, router }) => {
  const hasConnected = true;
  return hasConnected ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive('');
        router.push('/create-nft');
      }}
    />
  ) : (
    <Button
      btnName="Connect"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive('');
        router.push('/create-nft');
      }}
    />
  );
};

const NavBar = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState('Explore NFTs');
  const [isOpen, setisOpen] = useState(false);

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div className="flexCenter md:hidden cursor-pointer" onClick={() => {}}>
            <Image
              src={images.logo02}
              alt="logo"
              style={{ objectFit: 'contain' }}
              width={32}
              height={32}
            />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-3">CryptoKet</p>
          </div>
        </Link>
        <Link href="/">
          <div className="hidden md:flex" onClick={() => {}}>
            <Image
              src={images.logo02}
              alt="logo"
              style={{ objectFit: 'contain' }}
              width={32}
              height={32}
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input type="checkbox" className="checkbox" id="checkbox" onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
          <label htmlFor="checkbox" className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label">
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>
      </div>
      <div className="md:hidden flex">
        <MenuItems active={active} setActive={setActive} router={router} />
        <div className="ml-4">
          <ButtonGroup setActive={setActive} router={router} />
        </div>
      </div>
      <div className="hidden md:flex ml-2">
        {isOpen ? (
          <Image
            onClick={() => setisOpen(false)}
            style={{ objectFit: 'contain' }}
            width={20}
            height={20}
            alt="close menu"
            className={theme === 'light' ? 'filter invert' : undefined}
            src={images.cross}
          />
        )
          : (
            <Image
              onClick={() => setisOpen(true)}
              style={{ objectFit: 'contain' }}
              width={25}
              height={25}
              alt="menu"
              className={theme === 'light' ? 'filter invert' : undefined}
              src={images.menu}
            />
          )}

        {isOpen && (
        <div className="fixed w-full inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
          <div className="flex-1 p-4">
            <MenuItems active={active} setActive={setActive} isMobile />
          </div>
          <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
            <ButtonGroup setActive={setActive} router={router} />
          </div>
        </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
