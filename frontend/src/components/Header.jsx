import React from 'react';

function Header() {
    return (
        <header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '20px', backgroundColor: '#f8f9fa' }}>
            <nav>
                <ul style={{ listStyle: 'none', margin: '0', padding: '0', display: 'flex' }}>
                    <li style={{ margin: '0 10px' }}><a href="login" style={{ textDecoration: 'none', color: 'black' }}>Login</a></li>
                    <li style={{ margin: '0 10px' }}><a href="signup" style={{ textDecoration: 'none', color: 'black' }}>Sign up</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
