import { useMediaQuery } from 'react-responsive';

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ query: "(max-width:767px)" });
  return <>{isMobile && children}</>;
};

const PC = ({ children }) => {
  const isPc = useMediaQuery({ query: "(min-width:1024px)" });
  return <>{isPc && children}</>;
};

const IsMobile = () => {
  return useMediaQuery({ query: "(max-width:767px)" });
};

export { Mobile, PC, IsMobile }