"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import LoginModal from "./auth/loginModal";
import { useAuth } from "./contexts/authContext";
import { useApi } from "@/hooks/useApi";


export default function NavBar() {

    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

    const { user, isLoading } = useAuth();

    const { get } = useApi();

    const ButtonClick = async() => {
        const req = await get('/api/predictions/find/resultHistory/21')

        console.log('button',req)
    }

    return(
        <>
            <header className="sticky top-0 z-50 bg-black text-white">
                <nav className="mx-auto h-16 max-w-6xl flex items-center justify-between px-6">
                    {/* Logo */}
                    <Link href="/" onClick={() => ButtonClick()} className="text-lg font-bold">
                        MoneyMonkey
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center gap-6 text-sm">
                        <Link href="/#how-it-works" className="text-gray-300 transition hover:text-white">
                            How It Works
                        </Link>

                        <Link href="/#about" className="text-gray-300 transition hover:text-white">
                            About
                        </Link>

                        { isLoading ?
                            <>
                                <button className="bg-white rounded-md text-black px-4 py-2 font-medium transition hover:bg-gray-200 hover:cursor-pointer">
                                    Loading...
                                </button>
                                {/* <Image src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg" alt="user_picture" width={32} height={32} /> */}
                            </>
                                :
                                user ? 
                                    <>
                                        <button className="bg-white rounded-md text-black px-4 py-2 font-medium transition hover:bg-gray-200 hover:cursor-pointer">
                                            Hi! {user.name}
                                        </button>
                                        <Image src={user.picture} alt="user_picture" width={32} height={32} />
                                    </>
                                    :
                                        <button onClick={() => setIsLoginOpen(true)} className="bg-white rounded-md text-black px-4 py-2 font-medium transition hover:bg-gray-200 hover:cursor-pointer">
                                            Login
                                        </button>
                        }
                        
                    </div>
                    
                </nav>
            </header>
            { isLoginOpen === true ? 
                <LoginModal isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen}/> : 
                <></>
            }
        </>
    );    
}