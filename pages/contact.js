import React, { useState } from "react";
import styles from "../styles/Contact.module.css";

const Contact = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [desc, setdesc] = useState("");

    const submit = (e) => {
        e.preventDefault();
        const data = { name, email, phone, desc };

        fetch("http://localhost:3000/api/postcontact", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.text())
            .then((data) => {
                alert("Thanks for contacting us");
                setname("");
                setemail("");
                setphone("");
                setdesc("");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    const handleChange = (e) => {
        if (e.target.name == "name") {
            setname(e.target.value);
        } else if (e.target.name == "email") {
            setemail(e.target.value);
        } else if (e.target.name == "phone") {
            setphone(e.target.value);
        } else if (e.target.name == "desc") {
            setdesc(e.target.value);
        }
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Contact Us</h1>
            <form onSubmit={submit}>
                <div className={styles.mb3}>
                    <label htmlFor="name" className={styles.formLabel}>
                        Enter your name
                    </label>
                    <input
                        type="text"
                        value={name}
                        name="name"
                        placeholder="Username"
                        onChange={handleChange}
                        className={styles.input}
                        id="name"
                        aria-describedby="emailHelp"
                        required
                    />
                </div>
                <div className={styles.mb3}>
                    <label htmlFor="email" className={styles.formLabel}>
                        Enter your email
                    </label>
                    <input
                        type="email"
                        value={email}
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className={styles.input}
                        id="email"
                        aria-describedby="emailHelp"
                        required
                    />
                </div>
                <div className={styles.mb3}>
                    <label htmlFor="phone" className={styles.formLabel}>
                        Enter your Phone no.
                    </label>
                    <input
                        type="text"
                        value={phone}
                        name="phone"
                        placeholder="Phone no."
                        onChange={handleChange}
                        className={styles.input}
                        id="phone"
                        aria-describedby="emailHelp"
                        required
                    />
                </div>
                <div className={styles.mb3}>
                    <label className={styles.formLabel} htmlFor="desc">
                        Elaborate your concern
                    </label>
                    <textarea
                        value={desc}
                        name="desc"
                        onChange={handleChange}
                        placeholder="Write your concern here"
                        id="desc"
                    />
                </div>
                <button type="submit" className={styles.btn}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Contact;
