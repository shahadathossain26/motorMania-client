import React from 'react';

const Footer = () => {
    return (
        <footer className="footer p-10 bg-black text-neutral-content">
            <div>
                <h3 className="footer-title text-3xl">Get in Touch</h3>
                <h4 className='text-primary text-2xl'>Address:</h4>
                <address>(843) 846-2230 20 Zamuna Bank Tower Rd <br /> Uttora, Dhaka.</address>
                <h4 className='text-primary text-2xl'>Email:</h4>
                <p>shiimran172372@gmail.com</p>
                <p>shahadat3838@gmail.com</p>
            </div>
            <div>
                <span className="footer-title">Services</span>
                <a href='/' className="link link-hover">Branding</a>
                <a href='/' className="link link-hover">Design</a>
                <a href='/' className="link link-hover">Marketing</a>
                <a href='/' className="link link-hover">Advertisement</a>
            </div>
            <div>
                <span className="footer-title">Company</span>
                <a href='/' className="link link-hover">About us</a>
                <a href='/' className="link link-hover">Contact</a>
                <a href='/' className="link link-hover">Jobs</a>
                <a href='/' className="link link-hover">Press kit</a>
            </div>
            <div>
                <span className="footer-title">Legal</span>
                <a href='/' className="link link-hover">Terms of use</a>
                <a href='/' className="link link-hover">Privacy policy</a>
                <a href='/' className="link link-hover">Cookie policy</a>
            </div>
        </footer>
    );
};

export default Footer;