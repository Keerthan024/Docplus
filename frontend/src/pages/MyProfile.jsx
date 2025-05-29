import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)

    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)


    // Function to update user profile data using API
    const updateUserProfileData = async () => {

        try {

            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    return userData ? (
        <div className="relative">
            <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-black -z-10"></div>
            <div className="max-w-lg w-full mx-auto backdrop-blur-md bg-white/60 dark:bg-white/10 dark:text-white p-6 rounded-2xl shadow-xl animate-fade-in transition duration-500 mt-10">

                {/* Profile Image */}
                {isEdit ? (
                    <label htmlFor="image">
                        <div className="inline-block relative cursor-pointer transition-all duration-300 hover:scale-105">
                            <img
                                className="w-36 rounded-full opacity-80 hover:opacity-100 transition shadow-md"
                                src={image ? URL.createObjectURL(image) : userData.image}
                                alt=""
                            />
                            {!image && (
                                <img className="w-10 absolute bottom-2 right-2" src={assets.upload_icon} alt="Upload Icon" />
                            )}
                        </div>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                    </label>
                ) : (
                    <img className="w-36 rounded-full shadow-md transition-all duration-300 hover:scale-105" src={userData.image} alt="" />
                )}

                {/* Name */}
                <div className="mt-6">
                    {isEdit ? (
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={userData.name}
                                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                                className="peer w-full bg-transparent border-b-2 border-gray-300 text-2xl dark:text-white placeholder-transparent focus:outline-none focus:border-primary transition-all"
                                placeholder="Name"
                            />
                            <label className="absolute left-0 -top-5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-400 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-gray-500">
                                Name
                            </label>
                        </div>
                    ) : (
                        <p className="text-3xl font-semibold text-[#262626] dark:text-white mt-2">{userData.name}</p>
                    )}
                </div>

                <hr className="my-6 border-gray-300 dark:border-gray-600" />

                {/* Contact Info */}
                <div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm underline font-semibold mb-3">CONTACT INFORMATION</p>
                    <div className="grid grid-cols-[1fr_3fr] gap-y-4 text-gray-800 dark:text-gray-200">
                        <p className="font-medium">Email id:</p>
                        <p className="text-blue-600 dark:text-blue-400">{userData.email}</p>

                        <p className="font-medium">Phone:</p>
                        {isEdit ? (
                            <input
                                type="text"
                                value={userData.phone}
                                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-primary transition"
                            />
                        ) : (
                            <p className="text-blue-600 dark:text-blue-400">{userData.phone}</p>
                        )}

                        <p className="font-medium">Address:</p>
                        {isEdit ? (
                            <div className="flex flex-col gap-1">
                                <input
                                    type="text"
                                    value={userData.address.line1}
                                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                    className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-primary transition"
                                />
                                <input
                                    type="text"
                                    value={userData.address.line2}
                                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                    className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-primary transition"
                                />
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-300">{userData.address.line1}<br />{userData.address.line2}</p>
                        )}
                    </div>
                </div>

                {/* Basic Info */}
                <div className="mt-6">
                    <p className="text-gray-700 dark:text-gray-300 text-sm underline font-semibold mb-3">BASIC INFORMATION</p>
                    <div className="grid grid-cols-[1fr_3fr] gap-y-4 text-gray-800 dark:text-gray-200">
                        <p className="font-medium">Gender:</p>
                        {isEdit ? (
                            <select
                                value={userData.gender}
                                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-primary transition"
                            >
                                <option value="Not Selected">Not Selected</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-300">{userData.gender}</p>
                        )}

                        <p className="font-medium">Birthday:</p>
                        {isEdit ? (
                            <input
                                type="date"
                                value={userData.dob}
                                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-primary transition"
                            />
                        ) : (
                            <p className="text-gray-500 dark:text-gray-300">{userData.dob}</p>
                        )}
                    </div>
                </div>

                {/* Save / Edit Button */}
                <div className="mt-10 text-center">
                    {isEdit ? (
                        <button
                            onClick={updateUserProfileData}
                            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 shadow hover:shadow-lg active:scale-95"
                        >
                            Save Information
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEdit(true)}
                            className="border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow hover:shadow-lg active:scale-95"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    ) : null
}

export default MyProfile;