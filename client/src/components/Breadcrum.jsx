import React from 'react'
import { Link } from 'react-router-dom'
import arrow_icon from '../assets/breadcrum_arrow.png'
import { useTranslation } from 'react-i18next';
const Breadcrum = () => {
  const { t } = useTranslation();
  return (
    <nav aria-label="Breadcrumb" className="mt-5 ml-5 mb-0">
      <ol className="flex items-center space-x-2 text-m">
        <li>
          <Link to="/" className="text-gray-500 hover:text-blue-600 hover:font-bo transition">
            {t('Home')}
          </Link>
        </li>
        <li aria-hidden="true">
          <img
            className="w-3 h-3 opacity-50"
            src={arrow_icon}
            alt="breadcrumb arrow"
          />
        </li>
        <li className="font-semibold text-gray-900"> {t('Apply')}</li>
      </ol>
    </nav>
  )
}

export default Breadcrum
