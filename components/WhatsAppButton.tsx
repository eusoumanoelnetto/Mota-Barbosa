
import React from 'react';

interface WhatsAppButtonProps {
  text: string;
  href: string;
  size?: 'normal' | 'large';
  variant?: 'primary' | 'secondary';
  className?: string;
  showIcon?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
    text, 
    href, 
    size = 'normal',
    variant = 'primary',
    className = '',
    showIcon = true,
}) => {
    const sizeClasses = size === 'large' ? 'px-8 py-4 text-lg' : 'px-6 py-3';
    
    const variantClasses = {
        primary: 'bg-emerald-500 hover:bg-emerald-600 text-white',
        secondary: 'bg-white hover:bg-slate-100 text-emerald-600'
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`
                inline-flex items-center justify-center font-bold rounded-full shadow-lg 
                transform hover:scale-105 transition-all duration-300 ease-in-out
                ${sizeClasses}
                ${variantClasses[variant]}
                ${className}
            `}
        >
            {showIcon && <i className="fa fa-whatsapp fa-lg mr-3" aria-hidden="true"></i>}
            <span>{text}</span>
        </a>
    );
};
