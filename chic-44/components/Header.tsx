import React, { useState, useEffect } from 'react';
import type { Page, Category, MainCategory } from '../types';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../context/LanguageContext';
import { Icon } from './Icon';
import { fetchAndActivate } from 'firebase/remote-config';
import { remoteConfig } from '@/config';
import { getValue } from "firebase/remote-config";

interface HeaderProps {
    onNavigate: (page: Page) => void;
    onCategoryClick: (category: Category) => void;
}

const NavItem: React.FC<{
    label: MainCategory;
    onCategoryClick: (category: Category) => void;
}> = ({ label, onCategoryClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [titulo, setTitulo] = useState('');
    const { t } = useTranslation();
    const categories: { key: Category, name: string }[] = [
        { key: 'Bolsos', name: t('category_bags') },
        { key: 'Ropa', name: t('category_clothing') },
        { key: 'Accesorios', name: t('category_accessories') }
    ];





    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button className="text-sm tracking-wider uppercase hover:text-gray-500 transition-colors duration-200 py-4">{label}</button>
            {isHovered && (
                <div className="absolute top-full left-0 w-max bg-white shadow-lg p-6 z-20">
                    <div className="grid grid-cols-3 gap-x-12">
                        {categories.map(catType => (
                            <div key={catType.key}>
                                <h3 className="font-bold text-sm uppercase mb-3">{catType.name}</h3>
                                <ul>
                                    {[...Array(3)].map((_, i) => (
                                        <li key={i}><a href="#" onClick={(e) => { e.preventDefault(); onCategoryClick(catType.key); }} className="block text-sm text-gray-600 hover:text-black py-1">{t('category_item').replace('{number}', (i + 1).toString())}</a></li>
                                    ))}
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); onCategoryClick(catType.key); }} className="block text-sm text-black font-semibold hover:underline py-1 mt-2">{t('view_all')}</a></li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export const Header: React.FC<HeaderProps> = ({ onNavigate, onCategoryClick }) => {
    const { cartCount } = useCart();
    const { t, language, setLanguage } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [titulo, setTitulo] = useState('');

    const mainCategories: { key: string, label: string }[] = [
        { key: 'woman', label: t('nav_woman') },
        { key: 'man', label: t('nav_man') },
        { key: 'discounts', label: t('nav_discounts') }
    ];

    const subCategories: { key: Category, name: string }[] = [
        { key: 'Bolsos', name: t('category_bags') },
        { key: 'Ropa', name: t('category_clothing') },
        { key: 'Accesorios', name: t('category_accessories') }
    ];

    async function setupRemoteConfig() {
        try {
            // Extrae la configuración de Remote Config
            await fetchAndActivate(remoteConfig);

            const val = getValue(remoteConfig, "tienda");
            setTitulo(val.asString());

            console.log('Valor de configuración remota:', val.asString());
        } catch (error) {
            console.error('Error al obtener la configuración remota:', error);
        }
    }

    const toggleLanguage = () => {
        setLanguage(language === 'es' ? 'en' : 'es');
    };

    useEffect(() => {
        console.log('Configuración remota inicializada');
        setupRemoteConfig();
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left side: Desktop Nav or Hamburger */}
                        <div className="flex-1 flex items-center">
                            <nav className="hidden md:flex items-center space-x-8">
                                {mainCategories.map(cat => (
                                    <NavItem key={cat.key} label={cat.label} onCategoryClick={onCategoryClick} />
                                ))}
                            </nav>
                            <div className="md:hidden">
                                <button
                                    onClick={() => setIsMobileMenuOpen(true)}
                                    className="p-2 -ml-2 text-gray-600 hover:text-black"
                                    aria-label="Abrir menú"
                                >
                                    <Icon type="menu" />
                                </button>
                            </div>
                        </div>

                        {/* Center: Logo */}
                        <div className="shrink-0">
                            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex flex-col items-center">
                                <span className="text-xl sm:text-2xl font-bold tracking-widest">{titulo}</span>
                                <span className="hidden sm:block text-xs tracking-wider text-gray-500">{t('brand_subtitle')}</span>
                            </a>
                        </div>

                        {/* Right side: Icons */}
                        <div className="flex-1 flex items-center justify-end space-x-1 sm:space-x-4">
                            <button className="hidden md:block p-2 text-gray-600 hover:text-black"><Icon type="search" /></button>
                            <button className="hidden md:block p-2 text-gray-600 hover:text-black"><Icon type="user" /></button>
                            <button onClick={() => onNavigate('cart')} className="p-2 text-gray-600 hover:text-black relative" aria-label={t('cart_aria_label').replace('{count}', cartCount.toString())}>
                                <Icon type="cart" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{cartCount}</span>
                                )}
                            </button>
                            <button onClick={toggleLanguage} className="p-2 hidden sm:block">
                                {language === 'es' ? (
                                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="24" height="18" fill="#FFCD00" />
                                        <rect y="9" width="24" height="9" fill="#003087" />
                                        <rect y="13.5" width="24" height="4.5" fill="#C1272D" />
                                    </svg>
                                ) : (
                                    <svg width="24" height="18" viewBox="0 0 72 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0H72V54H0V0Z" fill="#BF0A30" />
                                        <path d="M0 9H72V18H0V9ZM0 27H72V36H0V27ZM0 45H72V54H0V45Z" fill="white" />
                                        <path d="M0 0H36V27H0V0Z" fill="#002868" />
                                        <g fill="white">
                                            <path d="M7.2 4.5L8.18554 7.42705H11.2222L8.71833 9.27295L9.70387 12.2L7.2 10.3541L4.69613 12.2L5.68167 9.27295L3.17778 7.42705H6.21446L7.2 4.5Z" />
                                            <path d="M14.4 4.5L15.3855 7.42705H18.4222L15.9183 9.27295L16.9039 12.2L14.4 10.3541L11.8961 12.2L12.8817 9.27295L10.3778 7.42705H13.4145L14.4 4.5Z" />
                                            <path d="M21.6 4.5L22.5855 7.42705H25.6222L23.1183 9.27295L24.1039 12.2L21.6 10.3541L19.0961 12.2L20.0817 9.27295L17.5778 7.42705H20.6145L21.6 4.5Z" />
                                            <path d="M28.8 4.5L29.7855 7.42705H32.8222L30.3183 9.27295L31.3039 12.2L28.8 10.3541L26.2961 12.2L27.2817 9.27295L24.7778 7.42705H27.8145L28.8 4.5Z" />
                                            <path d="M7.2 13.5L8.18554 16.4271H11.2222L8.71833 18.273L9.70387 21.2L7.2 19.3541L4.69613 21.2L5.68167 18.273L3.17778 16.4271H6.21446L7.2 13.5Z" />
                                            <path d="M14.4 13.5L15.3855 16.4271H18.4222L15.9183 18.273L16.9039 21.2L14.4 19.3541L11.8961 21.2L12.8817 18.273L10.3778 16.4271H13.4145L14.4 13.5Z" />
                                            <path d="M21.6 13.5L22.5855 16.4271H25.6222L23.1183 18.273L24.1039 21.2L21.6 19.3541L19.0961 21.2L20.0817 18.273L17.5778 16.4271H20.6145L21.6 13.5Z" />
                                            <path d="M28.8 13.5L29.7855 16.4271H32.8222L30.3183 18.273L31.3039 21.2L28.8 19.3541L26.2961 21.2L27.2817 18.273L24.7778 16.4271H27.8145L28.8 13.5Z" />
                                        </g>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-white z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                <div className="flex justify-between items-center p-4 border-b">
                    <span className="font-bold text-lg">Menú</span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2" aria-label="Cerrar menú">
                        <Icon type="close" />
                    </button>
                </div>
                <nav className="flex flex-col p-4">
                    {mainCategories.map(mainCat => (
                        <div key={mainCat.key} className="py-2 border-b last:border-b-0">
                            <h3 className="font-bold uppercase text-gray-500 text-sm mb-2 px-2">{mainCat.label}</h3>
                            <div className="flex flex-col space-y-1">
                                {subCategories.map(cat => (
                                    <a href="#" key={cat.key} onClick={(e) => {
                                        e.preventDefault();
                                        onCategoryClick(cat.key);
                                        setIsMobileMenuOpen(false);
                                    }} className="block text-lg py-2 hover:bg-gray-100 rounded-md px-2 transition-colors">{cat.name}</a>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>
        </>
    );
};