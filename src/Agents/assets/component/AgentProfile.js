import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { IMGURL } from '../../../utils/imgpath';
import toast, { Toaster } from 'react-hot-toast';

const cities = [
    "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast",
    "Canberra", "Newcastle", "Wollongong", "Geelong", "Hobart", "Townsville",
    "Cairns", "Darwin", "Toowoomba", "Ballarat", "Bendigo", "Launceston",
    "Mackay", "Rockhampton", "Bundaberg", "Coffs Harbour", "Wagga Wagga",
    "Hervey Bay", "Mildura", "Shepparton", "Gladstone", "Tamworth", "Traralgon",
    "Orange", "Bowral", "Dubbo", "Albany", "Geraldton", "Nowra", "Bathurst",
    "Warrnambool", "Kalgoorlie", "Devonport", "Mount Gambier", "Lismore",
    "Burnie", "Broken Hill", "Sunbury", "Frankston", "Campbelltown", "Goulburn",
    "Armidale", "Queanbeyan", "Bunbury", "Port Macquarie", "Albion Park",
    "Emerald", "Grafton", "Karratha", "Busselton", "Port Hedland", "Whyalla",
    "Alice Springs", "Horsham", "Wodonga", "Katherine", "Taree", "Morwell",
    "Mount Isa", "Albury", "Echuca", "Sale", "Forster", "Narrabri", "Inverell",
    "Kingaroy", "Parkes", "Griffith", "Lithgow", "Swan Hill", "Yeppoon",
    "Gympie", "Port Lincoln", "Colac", "Muswellbrook", "Bairnsdale", "Roma",
    "Dalby", "Warwick", "Cowra", "Scone", "Ulverstone", "Charters Towers",
    "Deniliquin", "Moe", "Stawell", "Ararat", "Victor Harbor", "Lorne",
    "Moranbah", "Kempsey", "Narrandera", "Yass", "Gatton"
];

const servicesOptions = [
    "Owner-occupier purchases",
    "Investor property purchases",
    "Auction bidding",
    "Vendor advocacy",
    "Property sourcing only",
];

const clientTypesOptions = [
    "First-home buyers",
    "Investors",
    "Interstate buyers",
    "Expats",
    "SMSF buyers",
    "Developers",
];

const AgentProfile = () => {
    const [agentData, setAgentData] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        phone: '',
        businessName: '',
        website: '',
        areasCovered: [],
        isLicensed: false,
        licenseNumber: '',
        licenseState: '',
        services: [],
        offMarketDeals: false,
        clientTypes: [],
        yearsOfExperience: '',
        clientsServed: '',
        avgBudget: '',
        bio: '',
        profileImage: null,
        additionalImages: [],
        introVideo: null,
        existingProfileImage: null,
        existingAdditionalImages: [],
        existingIntroVideo: null,
    });
    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestionRef = useRef(null);

    const [previewUrls, setPreviewUrls] = useState({
        profileImage: null,
        additionalImages: [],
        introVideo: null,
    });

    useEffect(() => {
        const fetchAgent = async () => {
            try {
                const response = await axiosInstance.get('/agents/get-agent-details');
                const data = response.data.data;
                console.log(data);
                setAgentData(data);
                setFormData({
                    firstName: data.firstName || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    businessName: data.agentDetails?.agency_name || '',
                    website: data.agentDetails?.website || '',
                    areasCovered: data.agentDetails?.postCode_cover || [],
                    isLicensed: data.agentDetails?.isLicensed || false,
                    licenseNumber: data.agentDetails?.licenseNumber || '',
                    licenseState: data.agentDetails?.licenseState || '',
                    services: data.agentDetails?.services_provided
                        ? data.agentDetails.services_provided.split(', ').filter(s => servicesOptions.includes(s))
                        : [],
                    offMarketDeals: data.agentDetails?.method_of_sale === 'Off-Market',
                    clientTypes: data.agentDetails?.specialization
                        ? data.agentDetails.specialization.split(', ').filter(ct => clientTypesOptions.includes(ct))
                        : [],
                    yearsOfExperience: data.agentDetails?.yearsOfExperience?.toString() || '',
                    clientsServed: data.agentDetails?.clientsServed?.toString() || '',
                    avgBudget: data.agentDetails?.fees_structure?.min?.toString() || '',
                    bio: data.agentDetails?.aboutAgent || '',
                    profileImage: null,
                    additionalImages: [],
                    introVideo: null,
                    existingProfileImage: data.profile_img || null,
                    existingAdditionalImages: data.additionalImages || [],
                    existingIntroVideo: data.introVideo || null,
                });
            } catch (err) {
                console.error(err);
                toast.error('Failed to fetch agent details.');
            }
        };
        fetchAgent();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        return () => {
            if (previewUrls.profileImage) URL.revokeObjectURL(previewUrls.profileImage);
            previewUrls.additionalImages.forEach((url) => URL.revokeObjectURL(url));
            if (previewUrls.introVideo) URL.revokeObjectURL(previewUrls.introVideo);
        };
    }, [previewUrls]);

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

        if (!formData.firstName) newErrors.firstName = 'Full Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email address';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
        if (!formData.businessName) newErrors.businessName = 'Agency Name is required';
        if (formData.website && !urlRegex.test(formData.website)) newErrors.website = 'Invalid URL';
        if (!formData.areasCovered || formData.areasCovered.length === 0) newErrors.areasCovered = 'At least one area is required';
        if (formData.isLicensed === undefined) newErrors.isLicensed = 'Please specify if licensed';
        if (formData.isLicensed) {
            if (!formData.licenseNumber) newErrors.licenseNumber = 'License Number is required';
            if (!formData.licenseState) newErrors.licenseState = 'License State is required';
        }
        if (!formData.services || formData.services.length === 0) newErrors.services = 'At least one service is required';
        if (formData.offMarketDeals === undefined) newErrors.offMarketDeals = 'Please specify if off-market deals are offered';
        if (!formData.clientTypes || formData.clientTypes.length === 0) newErrors.clientTypes = 'At least one client type is required';
        if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of Experience is required';
        else if (formData.yearsOfExperience < 0) newErrors.yearsOfExperience = 'Years of experience cannot be negative';
        if (!formData.clientsServed) newErrors.clientsServed = 'Clients Served is required';
        else if (formData.clientsServed < 0) newErrors.clientsServed = 'Clients served cannot be negative';
        if (!formData.avgBudget) newErrors.avgBudget = 'Average Budget is required';
        if (!formData.bio) newErrors.bio = 'Bio is required';
        if (!formData.profileImage && !formData.existingProfileImage) newErrors.profileImage = 'Profile image is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: '' }));
    };

    const handleCheckboxChange = (key, option, checked) => {
        setFormData((prev) => {
            const currentValues = prev[key] || [];
            if (checked) {
                return { ...prev, [key]: [...currentValues, option] };
            } else {
                return { ...prev, [key]: currentValues.filter((item) => item !== option) };
            }
        });
        setErrors((prev) => ({ ...prev, [key]: '' }));
    };

    const handleFileChange = (key, files) => {
        if (!files || files.length === 0) return;

        const maxFileSize = 5 * 1024 * 1024;
        const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        const validVideoTypes = ['video/mp4', 'video/mov', 'video/webm'];

        if (key === 'profileImage') {
            const file = files[0];
            if (!validImageTypes.includes(file.type)) {
                setErrors((prev) => ({ ...prev, profileImage: 'Only JPEG, PNG, or JPG files are allowed' }));
                return;
            }
            if (file.size > maxFileSize) {
                setErrors((prev) => ({ ...prev, profileImage: 'File size must be less than 5MB' }));
                return;
            }
            const newUrl = URL.createObjectURL(file);
            setPreviewUrls((prev) => {
                if (prev.profileImage) URL.revokeObjectURL(prev.profileImage);
                return { ...prev, profileImage: newUrl };
            });
            setFormData((prev) => ({
                ...prev,
                [key]: file,
                existingProfileImage: null,
            }));
            setErrors((prev) => ({ ...prev, [key]: '' }));
        } else if (key === 'additionalImages') {
            const newFiles = Array.from(files).filter((file) => {
                if (!validImageTypes.includes(file.type)) {
                    setErrors((prev) => ({ ...prev, additionalImages: 'Only JPEG, PNG, or JPG files are allowed' }));
                    return false;
                }
                if (file.size > maxFileSize) {
                    setErrors((prev) => ({ ...prev, additionalImages: 'Each file must be less than 5MB' }));
                    return false;
                }
                return true;
            });
            const newUrls = newFiles.map((file) => URL.createObjectURL(file));
            setPreviewUrls((prev) => {
                prev.additionalImages.forEach((url) => URL.revokeObjectURL(url));
                return { ...prev, additionalImages: [...prev.additionalImages, ...newUrls] };
            });
            setFormData((prev) => ({
                ...prev,
                [key]: [...(prev[key] || []), ...newFiles],
            }));
            setErrors((prev) => ({ ...prev, [key]: '' }));
        } else if (key === 'introVideo') {
            const file = files[0];
            if (!validVideoTypes.includes(file.type)) {
                setErrors((prev) => ({ ...prev, introVideo: 'Only MP4, MOV, or WEBM files are allowed' }));
                return;
            }
            if (file.size > maxFileSize) {
                setErrors((prev) => ({ ...prev, introVideo: 'File size must be less than 5MB' }));
                return;
            }
            const newUrl = URL.createObjectURL(file);
            setPreviewUrls((prev) => {
                if (prev.introVideo) URL.revokeObjectURL(prev.introVideo);
                return { ...prev, introVideo: newUrl };
            });
            setFormData((prev) => ({
                ...prev,
                [key]: file,
                existingIntroVideo: null,
            }));
            setErrors((prev) => ({ ...prev, [key]: '' }));
        }
    };

    const handleRemoveFile = (key, index = null) => {
        if (key === 'profileImage') {
            setFormData((prev) => ({
                ...prev,
                [key]: null,
                existingProfileImage: null,
            }));
            setPreviewUrls((prev) => {
                if (prev.profileImage) URL.revokeObjectURL(prev.profileImage);
                return { ...prev, profileImage: null };
            });
        } else if (key === 'additionalImages' && index !== null) {
            setFormData((prev) => {
                const updatedImages = prev[key].filter((_, i) => i !== index);
                const updatedUrls = previewUrls.additionalImages.filter((_, i) => i !== index);
                previewUrls.additionalImages[index] && URL.revokeObjectURL(previewUrls.additionalImages[index]);
                setPreviewUrls((prevUrls) => ({ ...prevUrls, additionalImages: updatedUrls }));
                return { ...prev, [key]: updatedImages };
            });
        } else if (key === 'existingAdditionalImages' && index !== null) {
            setFormData((prev) => ({
                ...prev,
                [key]: prev[key].filter((_, i) => i !== index),
            }));
        } else if (key === 'introVideo') {
            setFormData((prev) => ({
                ...prev,
                [key]: null,
                existingIntroVideo: null,
            }));
            setPreviewUrls((prev) => {
                if (prev.introVideo) URL.revokeObjectURL(prev.introVideo);
                return { ...prev, introVideo: null };
            });
        }
    };

    const handleAreasCoveredInput = (value) => {
        const trimmedValue = value.trim();
        if (trimmedValue) {
            const filteredSuggestions = cities.filter((city) =>
                city.toLowerCase().includes(trimmedValue.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSelectCity = (city) => {
        setFormData((prev) => ({
            ...prev,
            areasCovered: [...new Set([...(prev.areasCovered || []), city])],
        }));
        setSuggestions([]);
        setShowSuggestions(false);
        setErrors((prev) => ({ ...prev, areasCovered: '' }));
    };

    const handleRemoveCity = (city) => {
        setFormData((prev) => ({
            ...prev,
            areasCovered: prev.areasCovered.filter((c) => c !== city),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm() || hasSubmitted) return;

        setHasSubmitted(true);
        setIsSubmitting(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('businessName', formData.businessName);
            formDataToSend.append('website', formData.website || '');
            formDataToSend.append('areasCovered', formData.areasCovered.join(','));
            formDataToSend.append('isLicensed', formData.isLicensed);
            if (formData.isLicensed) {
                formDataToSend.append('licenseNumber', formData.licenseNumber);
                formDataToSend.append('licenseState', formData.licenseState);
            }
            formData.services.forEach((service) => formDataToSend.append('services', service));
            formDataToSend.append('offMarketDeals', formData.offMarketDeals);
            formData.clientTypes.forEach((clientType) => formDataToSend.append('clientTypes', clientType));
            formDataToSend.append('yearsOfExperience', formData.yearsOfExperience);
            formDataToSend.append('clientsServed', formData.clientsServed);
            formDataToSend.append('avgBudget', formData.avgBudget);
            formDataToSend.append('bio', formData.bio);

            // Handle profileImage: append the file if it exists, or 'null' if removed
            if (formData.profileImage instanceof File) {
                formDataToSend.append('profileImage', formData.profileImage);
            } else if (!formData.profileImage && !formData.existingProfileImage) {
                formDataToSend.append('profileImage', 'null');
            }

            // Handle additionalImages: always append a value to indicate the desired action
            if (formData.additionalImages && formData.additionalImages.length > 0) {
                // New images are being uploaded
                formData.additionalImages.forEach((image) => {
                    if (image instanceof File) {
                        formDataToSend.append('additionalImages', image);
                    }
                });
            } else if (!formData.additionalImages || (formData.additionalImages.length === 0 && formData.existingAdditionalImages.length === 0)) {
                // No new images and existing images have been removed
                formDataToSend.append('additionalImages', '[]');
            } else {
                // No new images are uploaded, and existing images should be preserved
                formDataToSend.append('additionalImages', 'unchanged');
            }

            // Handle introVideo: append the file if it exists, or 'null' if removed
            if (formData.introVideo instanceof File) {
                formDataToSend.append('introVideo', formData.introVideo);
            } else if (!formData.introVideo && !formData.existingIntroVideo) {
                formDataToSend.append('introVideo', 'null');
            }

            const response = await axiosInstance.put('/agents/update-profile', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const updatedData = response.data.data;
            setAgentData(updatedData);
            setFormData((prev) => ({
                ...prev,
                existingProfileImage: updatedData.profile_img || null,
                existingAdditionalImages: updatedData.additionalImages || [],
                existingIntroVideo: updatedData.introVideo || null,
                profileImage: null,
                additionalImages: [],
                introVideo: null,
            }));
            setPreviewUrls({
                profileImage: null,
                additionalImages: [],
                introVideo: null,
            });
            setIsEditing(false);
            toast.success('Profile updated successfully!');
        } catch (err) {
            console.error(err);
            toast.error('Error updating profile. Please try again.');
        } finally {
            setIsSubmitting(false);
            setHasSubmitted(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            firstName: agentData.firstName || '',
            email: agentData.email || '',
            phone: agentData.phone || '',
            businessName: agentData.agentDetails?.agency_name || '',
            website: agentData.agentDetails?.website || '',
            areasCovered: agentData.agentDetails?.postCode_cover || [],
            isLicensed: agentData.agentDetails?.isLicensed || false,
            licenseNumber: agentData.agentDetails?.licenseNumber || '',
            licenseState: agentData.agentDetails?.licenseState || '',
            services: agentData.agentDetails?.services_provided
                ? agentData.agentDetails.services_provided.split(', ').filter(s => servicesOptions.includes(s))
                : [],
            offMarketDeals: agentData.agentDetails?.method_of_sale === 'Off-Market',
            clientTypes: agentData.agentDetails?.specialization
                ? agentData.agentDetails.specialization.split(', ').filter(ct => clientTypesOptions.includes(ct))
                : [],
            yearsOfExperience: agentData.agentDetails?.yearsOfExperience?.toString() || '',
            clientsServed: agentData.agentDetails?.clientsServed?.toString() || '',
            avgBudget: agentData.agentDetails?.fees_structure?.min?.toString() || '',
            bio: agentData.agentDetails?.aboutAgent || '',
            profileImage: null,
            additionalImages: [],
            introVideo: null,
            existingProfileImage: agentData.profile_img || null,
            existingAdditionalImages: agentData.additionalImages || [],
            existingIntroVideo: agentData.introVideo || null,
        });
        setErrors({});
        setSuggestions([]);
        setShowSuggestions(false);
        setPreviewUrls({
            profileImage: null,
            additionalImages: [],
            introVideo: null,
        });
        setIsEditing(false);
        setHasSubmitted(false);
    };

    return (
        <div className="min-h-screen bg-white p-6 max-w-5xl mx-auto space-y-10 font-poppins">
           
            <h2 className="text-4xl font-extrabold text-gray-900 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
                Agent Profile
            </h2>

            <form onSubmit={handleSubmit}>
                <Section title="Personal Information" className="section-card">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="Full Name"
                            value={formData.firstName}
                            isEditing={isEditing}
                            onChange={(value) => handleChange('firstName', value)}
                            error={errors.firstName}
                        />
                        <InputField
                            label="Email Address"
                            value={formData.email}
                            isEditing={isEditing}
                            onChange={(value) => handleChange('email', value)}
                            error={errors.email}
                        />
                        <InputField
                            label="Mobile Number"
                            value={formData.phone}
                            isEditing={isEditing}
                            onChange={(value) => handleChange('phone', value)}
                            error={errors.phone}
                        />
                        <InputField
                            label="Agency Name"
                            value={formData.businessName}
                            isEditing={isEditing}
                            onChange={(value) => handleChange('businessName', value)}
                            error={errors.businessName}
                        />
                        <InputField
                            label="Website"
                            value={formData.website}
                            isEditing={isEditing}
                            onChange={(value) => handleChange('website', value)}
                            error={errors.website}
                        />
                    </div>
                </Section>

                <Section title="Location & License" className="section-card">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-800 mb-1">Areas Covered</label>
                            <input
                                type="text"
                                value=""
                                onChange={(e) => handleAreasCoveredInput(e.target.value)}
                                className={`w-full p-3 rounded-lg border ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-100 border-gray-200'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                placeholder="Type to search cities..."
                                readOnly={!isEditing}
                            />
                            {isEditing && showSuggestions && suggestions.length > 0 && (
                                <ul
                                    ref={suggestionRef}
                                    className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto mt-1"
                                >
                                    {suggestions.map((city) => (
                                        <li
                                            key={city}
                                            onClick={() => handleSelectCity(city)}
                                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition-all"
                                        >
                                            {city}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.areasCovered &&
                                    formData.areasCovered.map((city) => (
                                        <div
                                            key={city}
                                            className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                                        >
                                            {city}
                                            {isEditing && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveCity(city)}
                                                    className="ml-2 text-red-500 hover:text-red-700 font-bold"
                                                >
                                                    X
                                                </button>
                                            )}
                                        </div>
                                    ))}
                            </div>
                            {errors.areasCovered && (
                                <div className="text-red-500 text-sm mt-1">{errors.areasCovered}</div>
                            )}
                        </div>
                        <SelectField
                            label="Licensed Buyer’s Agent?"
                            value={formData.isLicensed}
                            isEditing={isEditing}
                            onChange={(value) => handleChange('isLicensed', value === 'true')}
                            error={errors.isLicensed}
                        >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </SelectField>
                        {formData.isLicensed && (
                            <>
                                <InputField
                                    label="License Number"
                                    value={formData.licenseNumber}
                                    isEditing={isEditing}
                                    onChange={(value) => handleChange('licenseNumber', value)}
                                    error={errors.licenseNumber}
                                />
                                <InputField
                                    label="License State"
                                    value={formData.licenseState}
                                    isEditing={isEditing}
                                    onChange={(value) => handleChange('licenseState', value)}
                                    error={errors.licenseState}
                                />
                            </>
                        )}
                    </div>
                </Section>

                <ServicesAndClientTypes
                    services={formData.services || []}
                    clientTypes={formData.clientTypes || []}
                    offMarketDeals={formData.offMarketDeals}
                    isEditing={isEditing}
                    handleCheckboxChange={handleCheckboxChange}
                    handleChange={handleChange}
                    errors={errors}
                />

                <Section title="Additional Info" className="section-card">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="Years of Experience"
                            value={formData.yearsOfExperience}
                            isEditing={isEditing}
                            onChange={(value) => handleChange('yearsOfExperience', value)}
                            type="number"
                            error={errors.yearsOfExperience}
                        />
                        <InputField
                            label="Clients Served (Last 12 Months)"
                            value={formData.clientsServed}
                            isEditing={isEditing}
                            onChange={(value) => handleChange('clientsServed', value)}
                            type="number"
                            error={errors.clientsServed}
                        />
                        <InputField
                            label="Avg Property Budget"
                            value={formData.avgBudget}
                            isEditing={isEditing}
                            onChange={(value) => handleChange('avgBudget', value)}
                            error={errors.avgBudget}
                        />
                        <TextareaField
                            label="Bio"
                            value={formData.bio}
                            isEditing={isEditing}
                            onChange={(value) => handleChange('bio', value)}
                            error={errors.bio}
                        />
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-800 mb-2">Profile Picture (Required)</label>
                        {isEditing && (
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg"
                                onChange={(e) => handleFileChange('profileImage', e.target.files)}
                                className="file-input"
                            />
                        )}
                        {(formData.profileImage || formData.existingProfileImage) && (
                            <div className="mt-4 relative inline-block">
                                <img
                                    src={
                                        formData.profileImage instanceof File
                                            ? previewUrls.profileImage
                                            : `${IMGURL}${formData.existingProfileImage}`
                                    }
                                    alt="Profile"
                                    className="w-32 h-32 object-cover border-4  shadow-lg"
                                />
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFile('profileImage')}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-all"
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        )}
                        {errors.profileImage && (
                            <div className="text-red-500 text-sm mt-2">{errors.profileImage}</div>
                        )}
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-800 mb-2">Additional Images (Optional)</label>
                        {isEditing && (
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg"
                                multiple
                                onChange={(e) => handleFileChange('additionalImages', e.target.files)}
                                className="file-input"
                            />
                        )}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                            {formData.existingAdditionalImages &&
                                formData.existingAdditionalImages.map((url, index) => (
                                    <div key={`existing-${index}`} className="relative">
                                        <img
                                            src={`${IMGURL}${url}`}
                                            alt={`Additional ${index}`}
                                            className="w-full h-32 object-cover rounded-lg shadow-md"
                                        />
                                        {isEditing && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile('existingAdditionalImages', index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-all"
                                            >
                                                X
                                            </button>
                                        )}
                                    </div>
                                ))}
                            {formData.additionalImages &&
                                formData.additionalImages.map((image, index) => (
                                    <div key={`new-${index}-${image.name}`} className="relative">
                                        <img
                                            src={previewUrls.additionalImages[index]}
                                            alt={`Additional ${index}`}
                                            className="w-full h-32 object-cover rounded-lg shadow-md"
                                        />
                                        {isEditing && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile('additionalImages', index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-all"
                                            >
                                                X
                                            </button>
                                        )}
                                    </div>
                                ))}
                        </div>
                        {errors.additionalImages && (
                            <div className="text-red-500 text-sm mt-2">{errors.additionalImages}</div>
                        )}
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-800 mb-2">Intro Video (Optional)</label>
                        {isEditing && (
                            <input
                                type="file"
                                accept="video/mp4,video/mov,video/webm"
                                onChange={(e) => handleFileChange('introVideo', e.target.files)}
                                className="file-input"
                            />
                        )}
                        {(formData.introVideo || formData.existingIntroVideo) && (
                            <div className="mt-4 relative">
                                <video
                                    src={
                                        formData.introVideo instanceof File
                                            ? previewUrls.introVideo
                                            : `${IMGURL}${formData.existingIntroVideo}`
                                    }
                                    controls
                                    className="w-full max-w-md rounded-lg shadow-md"
                                />
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFile('introVideo')}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-all"
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        )}
                        {errors.introVideo && (
                            <div className="text-red-500 text-sm mt-2">{errors.introVideo}</div>
                        )}
                    </div>
                </Section>

                <div className="text-right mt-6">
                    {!isEditing ? (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="bg-pink-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-pink-700 transition"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <div className="space-x-4">
                            <button
                                type="submit"
                                disabled={isSubmitting || hasSubmitted}
                                className={`px-5 py-2 rounded-md font-semibold transition 
                                            ${isSubmitting || hasSubmitted 
                                                ? 'bg-green-300 text-white cursor-not-allowed' 
                                                : 'bg-green-600 text-white hover:bg-green-700'}`}
                            >
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isSubmitting || hasSubmitted}
                                className={`px-5 py-2 rounded-md font-semibold transition 
                                            ${isSubmitting || hasSubmitted 
                                                ? 'bg-red-300 text-white cursor-not-allowed' 
                                                : 'bg-red-600 text-white hover:bg-red-700'}`}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </form>

            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap');
        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }
        .section-card {
          @apply bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 space-y-6 border border-gray-100 transition-all duration-300 hover:shadow-xl;
        }
        .btn-primary {
          @apply px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md;
        }
        .btn-secondary {
          @apply px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out;
        }
        .custom-checkbox {
          appearance: none;
          width: 20px;
          height: 20px;
          border: 2px solid #d1d5db;
          border-radius: 4px;
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .custom-checkbox:checked {
          background-color: #2563eb;
          border-color: #2563eb;
        }
        .custom-checkbox:checked::after {
          content: '✔';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
        }
        .custom-checkbox:hover:not(:disabled) {
          border-color: #93c5fd;
        }
        .custom-checkbox:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .checkbox-label:hover .custom-checkbox:not(:disabled) {
          border-color: #93c5fd;
        }
        .file-input {
          @apply block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all;
        }
      `}</style>
        </div>
    );
};

const Section = ({ title, children, className }) => (
    <section className={className}>
        <h3 className="text-2xl font-semibold text-blue-600 animate-fade-in">{title}</h3>
        {children}
    </section>
);

const InputField = ({ label, value, isEditing, onChange, type = 'text', error }) => (
    <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">{label}</label>
        <input
            type={type}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full p-3 rounded-lg border ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-100 border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            readOnly={!isEditing}
        />
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
);

const TextareaField = ({ label, value, isEditing, onChange, error }) => (
    <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">{label}</label>
        <textarea
            rows={3}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full p-3 rounded-lg border ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-100 border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            readOnly={!isEditing}
        />
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
);

const SelectField = ({ label, value, isEditing, onChange, children, error }) => (
    <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            disabled={!isEditing}
        >
            {children}
        </select>
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
);

const ServicesAndClientTypes = ({
    services = [],
    clientTypes = [],
    offMarketDeals,
    isEditing,
    handleCheckboxChange,
    handleChange,
    errors,
}) => (
    <section className="section-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Services Offered</h3>
                <div className="space-y-3">
                    {servicesOptions.map((option) => (
                        <label key={option} className="flex items-center space-x-3 checkbox-label">
                            <input
                                type="checkbox"
                                checked={services.includes(option)}
                                onChange={(e) => handleCheckboxChange('services', option, e.target.checked)}
                                disabled={!isEditing}
                                className="custom-checkbox"
                            />
                            <span className="text-gray-800 text-sm">{option}</span>
                        </label>
                    ))}
                    {errors.services && (
                        <div className="text-red-500 text-sm mt-2">{errors.services}</div>
                    )}
                </div>
                <div className="mt-4">
                    <SelectField
                        label="Do you offer off-market deals?"
                        value={offMarketDeals}
                        isEditing={isEditing}
                        onChange={(value) => handleChange('offMarketDeals', value === 'true')}
                        error={errors.offMarketDeals}
                    >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </SelectField>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Client Types You Work With</h3>
                <div className="space-y-3">
                    {clientTypesOptions.map((option) => (
                        <label key={option} className="flex items-center space-x-3 checkbox-label">
                            <input
                                type="checkbox"
                                checked={clientTypes.includes(option)}
                                onChange={(e) => handleCheckboxChange('clientTypes', option, e.target.checked)}
                                disabled={!isEditing}
                                className="custom-checkbox"
                            />
                            <span className="text-gray-800 text-sm">{option}</span>
                        </label>
                    ))}
                    {errors.clientTypes && (
                        <div className="text-red-500 text-sm mt-2">{errors.clientTypes}</div>
                    )}
                </div>
            </div>
        </div>
    </section>
);

export default AgentProfile;