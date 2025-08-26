import { useState, useEffect } from "react";
export default function Avatar({ name }) {
    const [initials, setInitials] = useState('');
    const [background, setBackground] = useState('');
    useEffect(() => {
        if (name) {
            const nameParts = name.split(' ');
            let generatedInitials = '';
            if (nameParts.length > 0) {
                generatedInitials += nameParts[0].charAt(0).toUpperCase();
                if (nameParts.length > 1) {
                    generatedInitials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
                }
            }
            setInitials(generatedInitials);
            const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            setBackground(randomColor);
        }
    }, [name]);
    return (

        <div
            style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: background,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
            }}
        >
            {initials}
        </div>
    );

}