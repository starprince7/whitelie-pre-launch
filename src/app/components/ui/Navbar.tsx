'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Link,
} from '@heroui/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Join Waitlist', href: '/#email-capture', highlight: true }
  ];

  return (
    <HeroNavbar
      isBlurred={isScrolled}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll={false}
      className={`fixed top-0 h-20 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarBrand>
          <Link href="/" className="text-2xl font-bold text-black dark:text-white hover:opacity-90 transition-opacity">
            WhiteLie
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop nav links */}
      <NavbarContent className="hidden md:flex gap-6" justify="end">
        {navLinks.map((link) => (
          !link.highlight ? (
            <NavbarItem key={link.name} isActive={pathname === link.href}>
              <Link 
                href={link.href} 
                className={`text-sm font-medium ${pathname === link.href ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-300'} hover:text-black dark:hover:text-white transition-colors`}
              >
                {link.name}
              </Link>
            </NavbarItem>
          ) : (
            <NavbarItem key={link.name}>
              <Button 
                as={Link} 
                href={link.href} 
                color="primary"
                variant="solid"
                size="md"
                className="bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors px-6 py-2 font-medium"
              >
                {link.name}
              </Button>
            </NavbarItem>
          )
        ))}
      </NavbarContent>

      {/* Mobile menu toggle */}
      <NavbarContent className="md:hidden" justify="end">
        <NavbarMenuToggle 
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-black dark:text-white"
        />
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu className="pt-6 bg-white/95 dark:bg-black/95 backdrop-blur-md">
        {navLinks.map((link) => (
          <NavbarMenuItem key={link.name}>
            {!link.highlight ? (
              <Link 
                href={link.href}
                className={`block w-full py-4 text-base font-medium ${pathname === link.href ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-300'} hover:text-black dark:hover:text-white transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ) : (
              <Button 
                as={Link} 
                href={link.href} 
                color="primary"
                variant="solid"
                size="md"
                className="bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors my-2 px-6 py-2 font-medium w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Button>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroNavbar>
  );
}
