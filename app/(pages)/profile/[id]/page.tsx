import React from 'react';
import { useSession } from 'next-auth/react';



const ProfilePage = () => {
    return (
        <div>
            <h1>Profile Page</h1>
            <p>Welcome to your profile page!</p>
            {/* Add your profile information here */}
        </div>
    );
};

export default ProfilePage;