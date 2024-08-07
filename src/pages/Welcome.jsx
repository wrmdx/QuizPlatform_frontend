import {useSelector} from "react-redux";
import {selectCurrentName, selectCurrentToken, selectCurrentUser} from "@/features/auth/authSlice.jsx";


const Welcome = () => {

    const user = useSelector(selectCurrentName)
    const token = useSelector(selectCurrentToken)
    const welcome = user ? `Welcome ${user}` : 'Welcome!'
    const tokenAbbr = `${token.slice(0,9)}...`

    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token : {tokenAbbr}</p>
        </section>
    )
    return content
}
export default Welcome ;
