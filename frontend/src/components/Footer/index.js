import React from "react"

export default function Footer() {
    return (
        <div className='root'>
            <div className='footer'>
                <p className='developer-name'>Beverly Duran</p>
                <div className='social-media-div'>
                    <a href="https://github.com/duranbeverly" target="_blank" rel="noreferrer">
                        {/* <img className="social-icon" alt="github icon" src="https://be-leaf.s3.amazonaws.com/github-icon.png"></img> */}
                        <i className="fa-brands fa-square-github social-icon"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/beverly-duran/" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-linkedin social-icon"></i>
                    </a>
                </div>
            </div>
        </div >
    )
}
