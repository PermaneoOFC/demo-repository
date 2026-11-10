import { createContext, createElement, useContext } from 'react';

// The recovered student views share the platform's existing hash navigation.
export const StudentNavigationContext = createContext(null);

function useNavigation() {
  const value = useContext(StudentNavigationContext);
  if (!value) throw new Error('A navegação do aluno precisa estar dentro da plataforma.');
  return value;
}

export function useLocation() {
  return { pathname: '/' + useNavigation().page };
}

export function Link({ to, onClick, ...props }) {
  const { navigate } = useNavigation();
  const destination = to.replace(/^\//, '');
  return createElement('a', {
    ...props,
    href: '#' + destination,
    onClick(event) {
      onClick?.(event);
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      navigate(destination);
    },
  });
}

export function NavLink({ to, end, className, ...props }) {
  const { page } = useNavigation();
  const active = page === to.replace(/^\//, '');
  return createElement(Link, {
    ...props,
    to,
    className: typeof className === 'function' ? className({ isActive: active }) : className,
    'aria-current': active ? 'page' : undefined,
  });
}
