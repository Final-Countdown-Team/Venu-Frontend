import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./_contactForm.scss";

export default function ContactForm() {
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (!email || !subject || !message) {
			return toast.error("Please fill email, subject and message");
		}
		try {
			setLoading(true);
			const { data } = await axios.post("/api/email", {
				email,
				subject,
				message,
			});
			setLoading(false);
			toast.success(data.message);
		} catch (err) {
			setLoading(false);
			toast.error(
				err.response && err.response.data.message
					? err.response.data.message
					: err.message
			);
		}
	};
	return (
		<div className="contact-form">
			<ToastContainer position="bottom-center" limit={1} />
			<header className="contact-header">
				<form onSubmit={submitHandler}>
					<h1>Send Email</h1>
					<div>
						<label htmlFor="email">Email</label>
						<input
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							placeholder="Email"
						></input>
					</div>
					<div>
						<label htmlFor="subject">Subject</label>
						<input
							onChange={(e) => setSubject(e.target.value)}
							type="text"
							placeholder="Subject"
						></input>
					</div>
					<div>
						<label htmlFor="message">Message</label>
						<textarea
							onChange={(e) => setMessage(e.target.value)}
							type="text"
							placeholder="Message"
							// rows="5"
							// cols="50"
						></textarea>
					</div>
					<div>
						<label></label>
						<button type="submit" disabled={loading}>
							{loading ? "Sending..." : "Submit"}
						</button>
					</div>
				</form>
			</header>
		</div>
	);
}
