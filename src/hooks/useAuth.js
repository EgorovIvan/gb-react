import { useSelector, shallowEqual } from "react-redux"
import getUser from '../redux/store/user/selectors'

const useAuth = () => {
    const {email,token,id} = useSelector(getUser, shallowEqual)

    return (
        {
            isAuth: email ? true : false,
            email,
            token,
            id
        }
    )
}

export default useAuth