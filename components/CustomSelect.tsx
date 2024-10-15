// CustomSelect.tsx
import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    options,
    value,
    onChange,
    disabled,
    className
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleOptionClick = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectedOption = options.find(option => option.value === value);

    return (
        <div className={twMerge("relative", className)} ref={selectRef}>
            <button
                type="button"
                className={twMerge(`
                    flex
                    w-full
                    rounded-md
                    bg-neutral-700
                    border
                    border-transparent
                    px-3
                    py-3
                    text-sm
                    text-white
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    focus:outline-none
                `)}
                onClick={() => setIsOpen(!isOpen)}
                disabled={disabled}
            >
                {selectedOption ? selectedOption.label : "Select an option"}
            </button>
            {isOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-neutral-700 rounded-md shadow-lg">
                    {options.map(option => (
                        <li
                            key={option.value}
                            className="cursor-pointer px-3 py-2 text-sm text-white hover:bg-neutral-600"
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;