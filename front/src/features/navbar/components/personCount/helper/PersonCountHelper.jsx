import { setMapboxDrawRef, setMapref } from "@/shared/redux/features/mapSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PersonCountHelper() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const hanldeNavigate = (idMapa)=>{

        dispatch(setMapboxDrawRef(null));
        dispatch(setMapref(null));

        if(idMapa === 'layer_view_only'){
            navigate("/dashboard/layers")
        }else{
            navigate(-1)
        }

        
    }    
    return{hanldeNavigate};
}
