import { useQuery } from "features/config/hooks";
import { Navigate, Outlet, useParams } from "react-router-dom";

export function PopClubGuards(){
    
    const query = useQuery();
    let { platform } = useParams();
    const category = query.get('category');

    if(platform === undefined){
        return <Navigate to={'walk-in?category=all'}></Navigate>
    }else if (category === null){
        return <Navigate to={'?category=all'}></Navigate>
    }
    
    return <Outlet/>;
}