import React from 'react'
import { FaLinkedin, FaFacebook, FaDiscord } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-white border border-gray-200  py-4">
      <div className="container mx-auto flex justify-center items-center space-x-6">
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-500"
        >
          <FaLinkedin size={30} />
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700"
        >
          <FaFacebook size={30} />
        </a>
        <a
          href="https://www.discord.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-purple-600"
        >
          <FaDiscord size={30} />
        </a>
      </div>
      <div className="text-center mt-4">
        <p>&copy; 2024 JOB HUNT. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer