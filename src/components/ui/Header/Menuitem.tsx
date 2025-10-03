import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

type Menuitemdetails = {
  title: string;
  address: string;
  Icon?: IconType;
  disableHover?: boolean;
}

export default function Menuitem({title, address, Icon, disableHover = false }: Menuitemdetails) {

  // only enable hover styles on Windows or macOS
  const isDesktopOS = (() => {
    if (typeof navigator === 'undefined') return false;
    const uaData = (navigator as any).userAgentData;
    if (uaData?.platform) {
      return /win|mac|linux/i.test(String(uaData.platform));
    }
    const ua = navigator.userAgent || '';
    // treat Android / iOS as mobile; everything else as desktop
    if (/android/i.test(ua) || /iPhone|iPad|iPod/i.test(ua)) return false;
    return /Windows|Macintosh|Linux|Win32|Win64/i.test(ua);
  })();

  // when disableHover is true we avoid hover classes so header items stay static
  const hoverClass = isDesktopOS && disableHover ? '' : 'hover:text-amber-400';

  return (
    <Link to={address} className="group flex items-center gap-2">
      {Icon && <Icon className="block sm:hidden text-4xl" />}
      <p className={`hidden sm:block uppercase text-base ${hoverClass}`}>{title}</p>
    </Link>
  );

}
