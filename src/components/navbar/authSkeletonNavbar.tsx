export default function AuthSkeletonNavbar() {
    
    return ( 
        <div className="flex items-center gap-3" aria-hidden="true"> 
            <div className="hidden h-9 w-40 rounded-md shimmer" /> 
            <div className="h-8 w-8 rounded-full shimmer" /> 
        </div> 
    );
}