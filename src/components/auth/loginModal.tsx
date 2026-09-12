import AuthServices from "@/services/auth";
import { LoginModalProps } from "@/types/loginModal";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../contexts/authContext";
import { useToast } from "../contexts/toastContext";


export default function LoginModal( { setIsLoginOpen } : LoginModalProps ) {
    
    const { login } = useAuth();

    const { showToast } = useToast();

    const GoogleResponse =  async (credential : string | undefined) => {
        try {
            if (credential === undefined) {throw new Error}

            const idToken = credential
            const { access_Token, user_info } = await AuthServices.googleLogin(idToken)

            login(user_info, access_Token) // call login method in context to create a gloval state of user and accessToken
            setIsLoginOpen(false) // to close log in popup after finish login
            
        } catch (error) {
            //toast here
            showToast({
                type: "error",
                title: `Google login fail`,
                message: `${error}`
            })
        }
    }

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4">
        
            <div className="relative w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-2xl">

                {/* Close */}
                <button
                onClick={() => setIsLoginOpen(false)}
                    className="absolute right-4 top-4 text-xl text-gray-400 transition hover:text-black hover:cursor-pointer"
                >
                ×
                </button>

                {/* Header */}
                <div className="text-center">

                <h2 className="text-2xl font-bold text-black">
                    MoneyMonkey
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    Sign in to continue
                </p>

                </div>


                <GoogleLogin
                    onSuccess={(response) => GoogleResponse(response.credential)}
                    onError={() => {
                        showToast({
                            type: "error",
                            title: `Google login fail`,
                            message: `Google login fail`
                        })
                        }
                    }
                />
 

                {/* Terms */}
                <p className="mt-6 text-center text-xs leading-5 text-gray-400">
                By continuing, you agree to our Terms of Service
                and Privacy Policy.
                </p>

            </div>

        </div>
    );

}