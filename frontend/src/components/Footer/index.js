import React from "react"

export default function Footer() {
    return (
        <footer className='root'>
            <div className='footer'>
                <p className='developer-name'>Beverly Duran</p>
                <div className='social-media-div'>
                    <a href="https://github.com/duranbeverly" target="_blank" rel="noreferrer" aria-label="Beverly Duran on GitHub (opens in a new tab)">
                        <i className="fa-brands fa-square-github social-icon" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/beverly-duran/" target="_blank" rel="noreferrer" aria-label="Beverly Duran on LinkedIn (opens in a new tab)">
                        <i className="fa-brands fa-linkedin social-icon" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </footer>
    )
}
