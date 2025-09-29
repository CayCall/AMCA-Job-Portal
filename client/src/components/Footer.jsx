import React from 'react'
import { assets } from '../assets/assets'
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n} = useTranslation();
  return (

    <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-5'>
      <img width={160} src={assets.logo} alt=''></img>
      <p className='flex-1 border-1 border-gray-400 pl-4 text-lg text-gray-500 max-sm:hidden'> {t('Copyright © 2025 AMCA | All rights reserved.')}</p>
      <div className='flex gap-2.5'>
        <img width={38} src={assets.facebook_icon} />
        <img width={38} src={assets.twitter_icon} />
        <img width={38} src={assets.instagram_icon} />
      </div>
    </div>
  )
}

export default Footer