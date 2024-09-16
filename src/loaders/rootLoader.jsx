import {selectCurrentToken} from "@/features/auth/authSlice.jsx";
import {redirect} from "react-router-dom";
import {store} from "@/store/store.jsx";


const rootLoader = () => {
    const state = store.getState()
    const token = selectCurrentToken(state)
    if (!token) {
        return redirect('/login')
    }
}
export default rootLoader
