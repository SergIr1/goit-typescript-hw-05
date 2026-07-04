import { NavLink, NavLinkRenderProps } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';

const getLinkStyles = ({ isActive }: NavLinkRenderProps) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  const navItems = [
    { ref: '/', label: 'Home' },
    { ref: 'movies', label: 'Movies' },
  ];

  return (
    <header className={css.header}>
      <nav>
        <ul className={css.list}>
          {navItems.map(({ ref, label }) => (
            <li key={ref}>
              <NavLink to={ref} className={getLinkStyles}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
