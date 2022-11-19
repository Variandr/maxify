import { Modal } from '@lib/types/modals'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '@store/selectors/profile'
import ProfileData from '@components/profile/EditProfile/ProfileData'
import React, { useState } from 'react'
import EditProfileInput from '@components/profile/EditProfile/EditProfileInput'
import { $authHost } from '@lib/interceptors'
import { updateProfile } from '@store/actions/profile'
import Error from '@components/response/Error'

interface Props {
  setModal: (modal: Modal) => void
}

const EditProfile = ({ setModal }: Props) => {
  const profile = useSelector(getProfile)

  const [name, setName] = useState(profile.name ?? '')
  const [surname, setSurname] = useState(profile.surname ?? '')
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber ?? '')
  const [address, setAddress] = useState(profile.address ?? '')
  const [location, setLocation] = useState(profile.city ?? '')
  const [birthday, setBirthDay] = useState(profile.birthday ?? '')
  const [email, setEmail] = useState(profile.email ?? '')
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async () => {
    const updatedProfile = await $authHost
      .put(`/api/profile/put?userId=${profile.id}`, {
        name,
        surname,
        phoneNumber,
        address,
        city: location,
        birthday: new Date(birthday),
        email,
      })
      .then((res) => res.data.profile)
      .catch((res) => setErrorMessage(res.response.data.message))
    if (updatedProfile) {
      dispatch(updateProfile(updatedProfile))
      setModal(Modal.PROFILE)
    }
  }

  return (
    <div className="flex flex-col justify-between h-[95%]">
      <div className="flex px-10 py-8 w-full justify-around">
        <ProfileData profile={profile} />
        <div className="w-1/3">
          <p className="text-center">Profile Settings</p>
          <div className="flex flex-col">
            <div className="flex justify-between [&>*]:w-[45%]">
              <EditProfileInput
                value={name}
                heading="Name"
                placeholder="Change your name..."
                onChangeAction={setName}
              />
              <EditProfileInput
                value={surname}
                heading="Surname"
                placeholder="Change your surname..."
                onChangeAction={setSurname}
              />
            </div>

            <EditProfileInput
              value={phoneNumber}
              heading="Phone number"
              placeholder="Change your phone number..."
              onChangeAction={setPhoneNumber}
            />
            <EditProfileInput
              value={address}
              heading="Address"
              placeholder="Change your address..."
              onChangeAction={setAddress}
            />
            <EditProfileInput
              value={location}
              heading="Location(City, Country)"
              placeholder="Change your location..."
              onChangeAction={setLocation}
            />

            <div className="flex flex-col mt-4">
              <label>Birthday</label>
              <input
                // @ts-ignore
                value={new Date(birthday).toISOString().split('T')[0]}
                type="date"
                placeholder="Change your birthday"
                className=" rounded dark:text-white bg-transparent outline-0 px-3 py-1"
                style={{ border: '1px solid gray' }}
                onChange={(e) => setBirthDay(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-1/5">
          <p className="text-center">Employee Settings</p>
          <EditProfileInput
            onChangeAction={setEmail}
            value={email}
            heading="Email"
            placeholder="Change your work email..."
          />
        </div>
      </div>
      <div className="flex w-25 mt-19 px-14 justify-end items-center">
        <button
          className="dark:bg-purple-600 bg-green-400 rounded px-8 py-3 hover:bg-green-500 duration-300 hover:dark:bg-purple-700 hover:scale-105"
          onClick={() => onSubmit()}
        >
          Save Profile
        </button>
        <button
          className="ml-6 hover:scale-105 duration-300"
          onClick={() => setModal(Modal.PROFILE)}
        >
          Cancel
        </button>
      </div>
      <Error message={errorMessage} />
    </div>
  )
}

export default EditProfile
