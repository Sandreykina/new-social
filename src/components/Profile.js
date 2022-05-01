import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
    const navigate = useNavigate();
    const profileFromStore = useSelector((state) => state.profile.profileData);

    return (
        <div className="content">
            <p><button onClick={() => navigate(-1)}>Go Back</button></p>
            <h1 className="profile__title">{profileFromStore.nickname}</h1>
            <p><img className='element__image' src={profileFromStore.avatar} alt='ava' /></p>
            <p>ФИО: {profileFromStore.fio}</p>
            <p>ВУЗ: {profileFromStore.education}</p>
            <p>Группа: {profileFromStore.group}</p>
        </div>
    )
}

export default Profile;
