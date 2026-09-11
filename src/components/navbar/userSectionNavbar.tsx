import Image from "next/image";

export default function UserSectionNavbar(
    { name, picture }: { name: string; picture: string; }
) {
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
            <Image 
                src={picture} alt="User profile" 
                width={32} height={32} className="shrink-0 rounded-full" 
            /> 
        </div>);
}