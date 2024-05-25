import React, { useState } from "react";
import "./contact.css";
import contactData from "./data";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Config/Firebase/config";
import { getCurrentDate } from "../../Utility/utils";
import { toast } from "react-toastify";
import { useUserAuth } from "../../context/userAuthContext";
import  ReCAPTCHA  from "react-google-recaptcha"
import captcha from "../../Config/captcha";

const Contact = () => {

    const {user} = useUserAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const [isVerified, setIsVerified] = useState(false);

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [subjectError, setSubjectError] = useState('');
    const [messageError, setMessageError] = useState('');


    const handleMessageSubmit = async(e) => {
        e.preventDefault();
        setNameError('');
        setEmailError('');
        setSubjectError('');
        setMessageError('');

        let hasError = false;

        if (name.trim() === "") {
            setNameError('Name is required');
            hasError = true;
        }
        if (email.trim() === "") {
            setEmailError('Email is required');
            hasError = true;
        }
        if (subject.trim() === "") {
            setSubjectError('Subject is required');
            hasError = true;
        }
        if (message.trim() === "") {
            setMessageError('Message is required');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        if(!isVerified){
            return toast.info('Captcha Not Verified');
        }
        try{
            await addDoc(collection(db, `contacts`), {
                date: getCurrentDate(),
                userId: user?.uid,
                name,
                email,
                subject,
                message
            })
            toast.success("Message Sent Successfully");
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
        }catch(error){
            toast.error("Could not Send Message, Check Your Network");
        }
    }

  return <section className="contact section" id="contact">
    <div className="container">
        <div className="row">
            <div className="section-title padd-15">
                <h2>Contact</h2>
            </div>
        </div>
        <div className="row">
            {contactData.map((data) => (
                <div className="contact-info-item padd-15" key={data.id}>
                    <a href={data.link} target="_blank" rel="noopener noreferrer">
                        <div className="icon">
                        <i className="fa">{data.icon}</i>
                        </div>
                        <h4>{data.title}</h4>
                    </a>
                </div>
            ))}
        </div>
         <h3 className="contact-title padd-15">Send Messages</h3>
        <div className="row">
            <div className="contact-form padd-15">
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
                     <div className="form-item col-12 padd-15">
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                             <span className="error">{subjectError}</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                     <div className="form-item col-12 padd-15">
                        <div className="form-group">
                           <textarea 
                            name="" 
                            className="form-control" 
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            />
                            <span className="error">{messageError}</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="recaptcha padd-15">
                        <ReCAPTCHA
                            sitekey={captcha.key}
                            onChange={(value) => {setIsVerified(value)}}
                        />
                    </div>
                     <div className="form-item col-12 padd-15">
                        <button 
                            className="btn"
                            onClick={handleMessageSubmit}
                        >
                            Send message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </section>
};

export default Contact;
