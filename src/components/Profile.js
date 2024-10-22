const Profile = ({ profileData }) => {
    return (
        <div>
            {profileData ? (
                <div>
                    <h2>Profile Data for {profileData.name}</h2>

                </div>
            ) : (
                <button>Create New Profile</button>

                
            )}
        </div>
    )
}

export default Profile;