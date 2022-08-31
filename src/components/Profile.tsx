import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { profileType } from '../slices/profileSlice'

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<profileType>();

    useEffect(() => {
        axios.get(`https://new-social-api.herokuapp.com/api/profile`)
            .then(res => {
                setProfile(res.data);
        })
    }, [])

    return (
        <div className="content">
            <p><button onClick={() => navigate(-1)}>Go Back</button></p>
            <h1 className="profile__title">{profile?.['nickname']}</h1>
            <p><img className='element__image' src={profile?.['avatar']} alt='ava' /></p>
            <p>ФИО: {profile?.['fio']}</p>
            <p>ВУЗ: {profile?.['education']}</p>
            <p>Группа: {profile?.['group']}</p>
        </div>
    )
}

export default Profile;
