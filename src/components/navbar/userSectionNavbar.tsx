"use client";

import AuthServices from "@/services/auth";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useToast } from "../contexts/toastContext";

type UserSectionNavbarProps = {
    name: string;
    picture: string;
};

export default function UserSectionNavbar(
    { name, picture }: UserSectionNavbarProps
) {

    const { logout } = useAuth();
    const { showToast } = useToast();

    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await AuthServices.logout()
            logout()

            // showToast({
            //     type: "success",
            //     title: `Logout Successfully`,
            //     message: res.message
            // })
            
        } catch (error) {
            //toast here
            showToast({
                type: "error",
                title: `Google login fail`,
                message: `${error}`
            })
        } finally {
            setIsOpen(false)
        }
    }

    return (
        <div className="flex min-w-0 items-center gap-3"> 
            <button 
                type="button" 
                className=" hidden min-w-0 w-40 justify-center items-center 
                    rounded-md bg-brand px-4 py-2 text-body-sm 
                    font-medium text-black transition hover:opacity-90 " 
            > 
                <span className="truncate"> Hi! {name} </span> 
            </button> 

            {/* Profile button */}
            <button
                title="more"
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Open user menu"
                aria-expanded={isOpen}
                className="
                    hover:cursor-pointer
                    shrink-0 rounded-full
                    transition
                    hover:opacity-80
                    focus:outline-none
                    focus:ring-2
                    focus:ring-brand
                    focus:ring-offset-2
                    focus:ring-offset-black
                "
            >
                <Image
                    src={picture}
                    alt="User profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="
                        absolute md:right-2 top-full z-50 mt-2
                        w-44
                        overflow-hidden
                        rounded-lg
                        border border-white/10
                        bg-black
                        shadow-lg
                    "
                >
                    <button
                        type="button"
                        title="Setting"
                        className="
                            flex w-full items-center gap-3
                            px-4 py-3
                            text-left text-body-sm
                            text-white
                            transition
                            hover:bg-white/10
                            cursor-pointer
                        "
                    >
                        <span>⚙</span>
                        <span>Settings</span>
                    </button>

                    <button
                        type="button"
                        title="Logout"
                        className="
                            flex w-full items-center gap-3
                            border-t border-white/10
                            px-4 py-3
                            text-left text-body-sm
                            text-red-400
                            transition
                            hover:bg-white/10
                            cursor-pointer
                        "
                        onClick={handleLogout}
                    >
                        <span>↪</span>
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </div>);
}