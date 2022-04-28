import React from 'react';
import { useNavigate } from 'react-router-dom';
import { initialProfile } from '../initialProfile';

const Profile = () => {
    const navigate = useNavigate();

    return (
        <div className="content">
            <p><button onClick={() => navigate(-1)}>Go Back</button></p>
            <h1 className="profile__title">{initialProfile.nickname}</h1>
            <p><img className='element__image' src={initialProfile.avatar} alt='ava' /></p>
            <p>ФИО: {initialProfile.fio}</p>
            <p>ВУЗ: {initialProfile.education}</p>
            <p>Группа: {initialProfile.group}</p>
        </div>
    )
}

export default Profile;
