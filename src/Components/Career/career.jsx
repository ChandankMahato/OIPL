import React, { useState } from "react";
import "./career.css";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../Config/Firebase/config";
import { getCurrentDate } from "../../Utility/utils";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import captcha from "../../Config/captcha";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Career = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [jobPosition, setJobPosition] = useState('');
    const [experience, setExperience] = useState('');
    const [address, setAddress] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [cv, setCv] = useState(null);
    const [isVerified, setIsVerified] = useState(false);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [coverLetterError, setCoverLetterError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [jobPositionError, setJobPositionError] = useState('');
    const [experienceError, setExperienceError] = useState('');
    const [cvError, setCvError] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const handleCareerSubmit = async (e) => {
        e.preventDefault();
        setNameError('');
        setEmailError('');
        setAddressError('');
        setCoverLetterError('');
        setGenderError('');
        setPhoneError('');
        setJobPositionError('');
        setExperienceError('');
        setCvError('');

        let hasError = false;

        if (name.trim() === "") {
            setNameError('Name is required');
            hasError = true;
        }
        if (email.trim() === "") {
            setEmailError('Email is required');
            hasError = true;
        }
        if (address.trim() === "") {
            setAddressError('Address is required');
            hasError = true;
        }
        if (coverLetter.trim() === "") {
            setCoverLetterError('Cover Letter is required');
            hasError = true;
        }
        if (gender.trim() === "") {
            setGenderError('Gender is required');
            hasError = true;
        }
        if (phone.trim() === "") {
            setPhoneError('Phone Number is required');
            hasError = true;
        }
        if (jobPosition.trim() === "") {
            setJobPositionError('Job Position is required');
            hasError = true;
        }
        if (!cv) {
            setCvError('CV is required');
            hasError = true;
        }
        if (hasError) {
            return;
        }

        if (!isVerified) {
            return toast.info('Captcha Not Verified');
        }

        setIsUploading(true);

        const cvRef = ref(storage, `cvs/${cv.name}`);
        const uploadTask = uploadBytesResumable(cvRef, cv);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (Math.round(snapshot.bytesTransferred / snapshot.totalBytes)) * 100;
                setUploadProgress(progress);
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                toast.error("Could not upload CV, please try again");
                setIsUploading(false);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                try {
                    await addDoc(collection(db, `careers`), {
                        date: getCurrentDate(),
                        name,
                        email,
                        gender,
                        phone,
                        address,
                        jobPosition,
                        experience,
                        coverLetter,
                        cvUrl: downloadURL,
                    });
                    toast.success("Message Sent Successfully");
                    setName("");
                    setEmail("");
                    setAddress("");
                    setGender("");
                    setPhone("");
                    setAddress("");
                    setJobPosition("");
                    setExperience("");
                    setCoverLetter("");
                    setCv(null);
                    setUploadProgress(0);
                    document.getElementById('cv-input').value = "";
                } catch (error) {
                    toast.error("Could not Send Message, Check Your Network");
                }
                setIsUploading(false);
            }
        );
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 500 * 1024) { // 500 KB size limit
            setCvError('File size should be less than 500 KB');
            setCv(null);
        } else {
            setCv(file);
            setCvError('');
        }
    };

    return (
        <section className="career section">
            <div className="container">
                <h3 className="career-title padd-15">Send Job Request</h3>
                <div className="row">
                    <div className="career-form padd-15">
                        <div className="row">
                            <div className="form-item col-6 padd-15">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <span className="error">{nameError}</span>
                                </div>
                            </div>
                            <div className="form-item col-6 padd-15">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <span className="error">{emailError}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-item col-6 padd-15">
                                <div className="form-group">
                                    <select
                                        className="form-control"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <span className="error">{genderError}</span>
                                </div>
                            </div>
                            <div className="form-item col-6 padd-15">
                                <div className="form-group">
                                    <input
                                        type="phone"
                                        className="form-control"
                                        placeholder="Phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                    <span className="error">{phoneError}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-item col-12 padd-15">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                    <span className="error">{addressError}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-item col-6 padd-15">
                                <div className="form-group">
                                    <select
                                        className="form-control"
                                        value={jobPosition}
                                        onChange={(e) => setJobPosition(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Job Position</option>
                                        <option value="Accountant">Accountant</option>
                                        <option value="Data Analyst">Data Analyst</option>
                                        <option value="Receptionist">Receptionist</option>
                                        <option value="Content Writer">Content Writer</option>
                                    </select>
                                    <span className="error">{jobPositionError}</span>
                                </div>
                            </div>
                            <div className="form-item col-6 padd-15">
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Years of Experience"
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                        required
                                    />
                                    <span className="error">{experienceError}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-item col-12 padd-15">
                                <div className="form-group">
                                    <textarea
                                        name=""
                                        className="form-control"
                                        placeholder="Cover Letter"
                                        value={coverLetter}
                                        onChange={(e) => setCoverLetter(e.target.value)}
                                        required
                                    />
                                    <span className="error">{coverLetterError}</span>
                                </div>
                            </div>
                        </div>
                        <h4 className="upload-cv-title">Upload CV</h4>
                        <div className="row">
                            <div className="form-item col-12 padd-15">
                                <div className="form-group">
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="cv-input"
                                        onChange={handleFileChange}
                                        required
                                    />
                                    <span className="error">{cvError}</span>
                                </div>
                            </div>
                        </div>
                         {isUploading && (
                            <div className="row">
                                <div className="form-item col-12 padd-15">
                                    <div className="loader">Uploading... {uploadProgress}%</div>
                                </div>
                            </div>
                        )}
                        <div className="row">
                            <div className="recaptcha">
                                <ReCAPTCHA
                                    sitekey={captcha.key}
                                    onChange={(value) => { setIsVerified(value) }}
                                />
                            </div>
                            <div className="form-item col-12 padd-15">
                                <button
                                    className="btn"
                                    onClick={handleCareerSubmit}
                                    disabled={isUploading}
                                >
                                    {isUploading ? "Uploading..." : "Send Request"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Career;
