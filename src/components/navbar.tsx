"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import LoginModal from "./auth/loginModal";
import { useAuth } from "./contexts/authContext";
import AuthSkeletonNavbar from "./navbar/authSkeletonNavbar";
import UserSectionNavbar from "./navbar/userSectionNavbar";

export default function NavBar() { 

    const { user, isLoading } = useAuth(); 

    const [clientState, setClientState] = useState({
        isLoginOpen : false,
        isMobileMenuOpen : false
    })

    return ( 
        <> 
            <header className=" sticky top-0 z-50 border-b border-white/10 bg-black text-white " > 
                <nav className=" mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 " > 

                    {/* ================================================= LEFT — Logo ================================================= */} 
                    <Link href="/" className=" flex shrink-0 items-center text-subtitle font-bold text-white transition hover:opacity-90 " > 
                        <Image 
                            src='/official_logo.png' alt="Logo" 
                            width={32}
                            height={32}
                            className="shrink-0 rounded-full mr-1 h-8" 
                            // style={{ height: "auto", width: "auto" }}
                        /> 
                        <span className="text-brand">Money</span> 
                        <span>Monkey</span> 
                    </Link> 
                    
                    {/* ===================================================== DESKTOP — Center Navigation ====================================================== */} 

                    {/* ===================================================== DESKTOP — Auth ====================================================== */}
                    <div className="shrink-0 hidden md:flex items-center gap-8 text-body-sm "> 
                        <Link href="/#how-it-works" className=" text-white/70 transition hover:text-white hover:bg-white/10 p-2 rounded-md" > 
                            How It Works 
                        </Link> 

                        <Link href="/#about" className=" text-white/70 transition hover:text-white hover:bg-white/10 p-2 rounded-md" > 
                            About 
                        </Link> 

                        { isLoading ? ( <AuthSkeletonNavbar /> ) : 
                                user ? ( <UserSectionNavbar 
                                            name={user.name} 
                                            picture={user.picture} 
                                        /> ) : 
                                    ( <button 
                                            type="button" 
                                            onClick={() => setClientState(prev => ({
                                                ...prev,
                                                isLoginOpen : true
                                            }))} 
                                            className=" rounded-md bg-brand px-4 py-2 text-body-sm font-medium text-black transition hover:opacity-90 " 
                                       > 
                                            Login 
                                        </button> 
                                    )
                        } 
                    </div>

                    {/* ===================================================== MOBILE — Menu Button ====================================================== */}
                    
                    <button 
                        type="button" 
                        aria-label="Open navigation menu" 
                        className=" flex h-10 w-10 items-center justify-center rounded-md text-white transition hover:bg-white/10 md:hidden hover:cursor-pointer" 
                        onClick={() => setClientState(prev => ({
                            ...prev,
                            isMobileMenuOpen : !prev.isMobileMenuOpen
                        }))}
                    > 
                        {/* Hamburger icon */} 
                        <span className="flex flex-col gap-1.5"> 
                            <span className="block h-0.5 w-5 bg-white" /> 
                            <span className="block h-0.5 w-5 bg-white" /> 
                            <span className="block h-0.5 w-5 bg-white" /> 
                        </span> 
                    </button>
                    
                

                </nav> 

                {/* ========================================================= MOBILE MENU ========================================================== */} 
                { clientState.isMobileMenuOpen && 
                    <div className=" border-t border-white/10 bg-black md:hidden " > 
                        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6"> 
                            <div className="flex flex-col gap-1"> 
                                <Link 
                                    href="/#how-it-works" 
                                    className=" rounded-md px-3 py-3 text-body-sm text-white/80 transition hover:bg-white/10 hover:text-white " 
                                    onClick={() => setClientState(prev => ({
                                        ...prev,
                                        isMobileMenuOpen : false
                                    }))}
                                > 
                                    How It Works 
                                </Link> 
                                <Link 
                                    href="/#about" 
                                    className=" rounded-md px-3 py-3 text-body-sm text-white/80 transition hover:bg-white/10 hover:text-white " 
                                    onClick={() => setClientState(prev => ({
                                        ...prev,
                                        isMobileMenuOpen : false
                                    }))}
                                > 
                                    About 
                                </Link> 

                                {/* Mobile auth section */} 
                                <div className=" mt-2 border-t border-white/10 pt-3 px-3" > 
                                    {/* Login / User / Skeleton */} 
                                    { isLoading ? ( <AuthSkeletonNavbar /> ) : 
                                            user ? ( <UserSectionNavbar 
                                                        name={user.name} 
                                                        picture={user.picture} 
                                                    /> ) : 
                                                ( <button 
                                                        type="button" 
                                                        onClick={() => setClientState(prev => ({
                                                            ...prev,
                                                            isLoginOpen : true
                                                        }))} 
                                                        className=" rounded-md bg-brand px-4 py-2 text-body-sm font-medium text-black transition hover:opacity-90 " 
                                                > 
                                                        Login 
                                                    </button> 
                                                )
                                    }
                                </div>

                                
                            </div> 
                        </div>
                    </div>
                }
                

            </header> 

            {clientState.isLoginOpen && ( 
                <LoginModal 
                    isLoginOpen={clientState.isLoginOpen} 
                    setIsLoginOpen={(boolean) => {
                        setClientState(prev => ({
                            ...prev,
                            isLoginOpen : boolean
                        }))
                    }} 
                /> 
            )} 
        </> 
    ); 
}