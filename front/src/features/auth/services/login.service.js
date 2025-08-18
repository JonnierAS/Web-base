import { http } from "@/services/api";
import { toast } from 'sonner';
import { setLocalService } from "./local.service";
import { getUserInfo } from "@/redux/features/userSlice";

export const loginService = async(email, password, navigate, setIsSubmiting, dispatch)=>{
    try {
        setIsSubmiting(true)
        const { data } = await http.post("/user/login", {
            email: email,
            password: password,
        })
        setLocalService(data.data.access_token, data.data.refresh_token)
        setIsSubmiting(false)
        await dispatch(getUserInfo()).unwrap();
        navigate(`/map`)
        return
    } catch (error) {
        console.log(error);
        
        toast.error("Credenciales Incorrectas")
        setIsSubmiting(false)
    }
}     