const ProfileCompnent = ({ profileData, createProfile }) => {
    return (
        <div>
            {profileData ? (
                <div>
                    <h2>Profile Data for {profileData.name}</h2>

                </div>
            ) : (
                <button onClick={createProfile}>Create New Profile</button>

                
            )}
        </div>
    )
}