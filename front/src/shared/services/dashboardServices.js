import { getLocalService } from "@/features/auth/services/local.service";
import { http } from "./api";
import { toast } from "sonner";


export const getAllUsers = async () => {
    try {
        const { access_token } = getLocalService()
        if(!access_token) return;
        return await http.get(`/user/get-all`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
    } catch (error) {
        console.log(error);
    }
}

export const addUser = async (data) => {
    try {
        const { access_token } = getLocalService()
        if(!access_token) return;
        return await http.post(`/user/add`, {
            ...data
        },{
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
    } catch (error) {
        if(error?.response){
            toast.warning(error.response.data.message)
        }
        console.log(error);
    }
}

export const updateUser = async (id, data) => {
    try {
        const { access_token } = getLocalService()
        if(!access_token) return;
        return await http.put(`/user/update/${id}`, {
            ...data
        },{
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
    } catch (error) {
        console.log(error);
    }
}

export const resetPasswordUser = async (user_id) => {
    try {
        const { access_token } = getLocalService()
        if(!access_token) return;
        return await http.get(`/user/reset-password/${user_id}`,{
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (id) => {
    try {
        const { access_token } = getLocalService()
        if(!access_token) return;
        return await http.delete(`/user/delete/${id}`,{
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateFieldUser = async (user_id, data) => {
    try {
        const { access_token } = getLocalService()
        if(!access_token) return;
        return await http.patch(`/user/update-field/${user_id}`, {
            ...data
        },{
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
    } catch (error) {
        console.log(error);
    }
}

export const changePasswordUser = async (data) => {
    try {
        const { access_token } = getLocalService()
        if(!access_token) return;
        return await http.post(`/user/change-password`, {
            ...data
        },{
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
    } catch (error) {
        console.log(error);
    }
}

export const getByIdUser = async () => {
    try {
        const { access_token } = getLocalService()
        if(!access_token) return;
        return await http.get(`/user/get-by-id`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
    } catch (error) {
        console.log(error);
    }
}