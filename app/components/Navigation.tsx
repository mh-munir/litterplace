import Link from 'next/link';

export default function Navigation() {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/litter-box-odor-control', label: 'Odor Control' },
    { href: '/best-automatic-litter-box', label: 'Automatic Litter Box' },
    { href: '/best-litter-box-multiple-cats', label: 'Multiple Cats' },
    { href: '/litter-box-small-apartment', label: 'Small Apartment' },
    { href: '/hidden-litter-box-furniture', label: 'Hidden Furniture' },
    { href: '/stop-litter-tracking', label: 'Stop Tracking' },
  ];

  return (
    <nav aria-label="Main navigation" className="hidden md:block">
      <ul className="flex space-x-4 text-sm">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-gray-600 hover:text-gray-900 hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}