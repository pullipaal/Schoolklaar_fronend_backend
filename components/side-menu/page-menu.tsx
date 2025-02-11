'use client'

import Link from "next/link";
import { Icons } from "../icons";
import Typography from "../typography";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";


export default function PageMenu() {
    const router = usePathname();
    const [activeRoute, setActiveRoute] = useState('');
  

    useEffect(() => {
        if (router.includes('maak-sessie')) {
            setActiveRoute('maak-sessie');
        } else if (router.includes('voeg-leerling-toe')) {
            setActiveRoute('voeg-leerling-toe');
        } else if (router.includes('leerling-overzicht')) {
            setActiveRoute('leerling-overzicht');
        } else if (router.includes('sessie-details')) {
            setActiveRoute('sessie-details');
        } else if (router.includes('overzicht-materiaal')) {
            setActiveRoute('overzicht-materiaal');
        } else if (router.includes('voeg-materiaal-toe')) {
            setActiveRoute('voeg-materiaal-toe');
        } 
        else {
            setActiveRoute('');
        }
    }, [router]);

    return (
        <div className="grid grid-cols-1 gap-8 mt-16 mb-16">

            <MenuLink 
                activeRoute={activeRoute}
                route="maak-sessie"
                link="/authenticated/maak-sessie"
                icon={<Icons.scrollText className = 'text-[#62C8F4]'/>}
                text="Maak Sessie"
            />


            <MenuLink 
                activeRoute={activeRoute}
                route="leerling-overzicht"
                link="/authenticated/leerling-overzicht"
                icon={<Icons.contact className = 'text-[#62C8F4]'/>}
                text="Leerling Overzicht"
            />


            <MenuLink 
                activeRoute={activeRoute}
                route="overzicht-materiaal"
                link="/authenticated/overzicht-materiaal"
                icon={<Icons.layers className = 'text-[#62C8F4]'/>}
                text="Overzicht Materiaal"
            />

            <MenuLink 
                activeRoute={activeRoute}
                route="voeg-materiaal-toe"
                link="/authenticated/voeg-materiaal-toe"
                icon={<Icons.folderPlus className = 'text-[#62C8F4]'/>}
                text="Voeg Materiaal Toe"
            />

            <MenuLink 
                activeRoute={activeRoute}
                route=""
                link="/"
                icon={<Icons.logOut className = 'text-[#62C8F4]'/>}
                text="Log Uit"
                onClick={()=>signOut()}
            />

        </div>
    )
}

function MenuLink({ activeRoute, route, link, icon, text, onClick } : any) {
    
    return (
        <div className={`${activeRoute === route ? 'border-primary border-l-[4px]' : 'ml-1'} h-[40px] flex flex-row items-center `}>
            <div className={` ${activeRoute === route ? 'py-2 bg-tertairy w-[280px] ml-4 lg:ml-6 pl-4 lg:pl-10 rounded-xl' : 'ml-8 lg:ml-16'}`}>
                <Link href={link} onClick={onClick}>
                    <div className="flex items-center " onClick={onClick}>
                        {icon}
                        <Typography variant='muted' className="hover:font-bold text-quadrairy lg:text-[16px] ml-6 lg:ml-12 mt-[1px]">{text}</Typography>
                    </div>
                </Link>
            </div>
        </div>
    )
}