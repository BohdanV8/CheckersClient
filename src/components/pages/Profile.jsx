import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../../App";

const Profile = observer(() => {
    const { store } = useContext(Context);
    console.log(store.user)
    return (
        <div className="container">
            <h1>Profile</h1>
            {/* <h2>Welcome {store.user}</h2> */}
        </div>
    )
})

export default Profile;