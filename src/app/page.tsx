'use client';

import Image from 'next/image';
import SideMenu from '@/components/pages/Menu';
import { HiOutlineFolderOpen } from 'react-icons/hi';
import TextInput from '@/components/global/TextInput/TextInput';
import ActiveProjectSelect from '@/components/pages/ActiveProjectSelect';
import CreateProjectButton from '@/components/pages/NewProject';
import CreateFirstProject from '@/components/pages/CreateFirstProject';

export default function Home() {
  const handleInputChange = (value: string) => {
    console.log('Input Value:', value);
  };

  return (
    <div className="flex">
      <SideMenu />
      <div className="flex-1 ml-64 p-4">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-4xl">
            <div className="flex items-center gap-3">
              <HiOutlineFolderOpen className="w-12 h-12 text-black-500 mb-4" />
              <h1 className="text-2xl font-normal leading-48 text-center font-poppins mb-2">
                Meus Projetos
              </h1>
            </div>

            <div className="flex justify-center p-4 space-x-2">
              <TextInput
                onInputChange={handleInputChange}
                placeholder="Faça sua busca..."
                className="flex-grow"
              />
              <ActiveProjectSelect />
              <div className="flex flex-col items-center space-y-2">
                <CreateProjectButton />
                <Image
                  src={'/images/image-seta.png'}
                  alt="seta img"
                  width={70}
                  height={70}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="text-center">
                <CreateFirstProject />
                <Image
                  src={'/images/image-home.png'}
                  alt="Curiosity Search"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
