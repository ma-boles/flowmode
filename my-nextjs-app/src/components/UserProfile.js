import { useFetchUserData } from "./FetchUserData";

const UserProfile = ({ account }) => {
    const userData = useFetchUserData(account);

    return (
        <div>
            {userData && (
                <>
                    <h2>Welcome {userData.display_name}</h2>
                    <img src={userData.images[0].url} alt="Profile"></img>
                </>
            )}
        </div>
    );
};

export default UserProfile;