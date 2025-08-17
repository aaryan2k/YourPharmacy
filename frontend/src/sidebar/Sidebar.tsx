import { FaBeer, FaFire, FaPoo, FaSun, FaMoon, FaDesktop } from 'react-icons/fa';
import useDarkMode from '../useDarkMode';
import "./Sidebar.css"

function Sidebar() {

  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white m-0 border-gray-400 border-2"> 
        <SidebarIcon icon={<FaBeer size="32" />}/>
        <SidebarIcon icon={<FaFire size="32" />}/>
        <SidebarIcon icon={<FaPoo size="32" />}/>
        <ThemeIcon />
    </div>
    
  )
}

const SidebarIcon = ({ icon, text = 'tooltip' }: { icon: any; text?: string }) => (
    <div className="sidebar-icon group">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
)

const ThemeIcon = () => {
  const [theme, setTheme] = useDarkMode();
  const handleMode = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };
  return (
    <span onClick={handleMode}>
      {theme === "light" && <FaSun size='24' className='top-navigation-icon text-yellow-300 hover:text-blue-700 ' />}
      {theme === "dark" && <FaMoon size='24' className='top-navigation-icon text-blue-300 hover:text-blue-700 ' />}
      {theme === "system" && <FaDesktop size='24' className='top-navigation-icon text-white hover:text-blue-700 ' />}
    </span>
  );
};



export default Sidebar;
