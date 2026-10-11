import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks";
import styles from './SearchBar.module.css'
import { Search, X } from "lucide-react";

interface SearchBarProps
{
    value: string;
    onChange: (value: string) => void;
    placeholder: string
}

function SearchBar({value, onChange, placeholder = 'Search Products...'} : SearchBarProps)
{
    const [input, setInput] = useState(value)
    const debounced = useDebounce(input, 400)

    useEffect(() => {
        if (debounced !== value)
        {
            onChange(debounced)
        }
    }, [debounced, value, onChange])

    useEffect(() => {
        setInput(value)
    }, [value])

    const handleClear = () => setInput('')

    return(
        <div className={styles.wrapper}>

            <Search size={18} className={styles.icon} />
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={placeholder} className={styles.input} aria-label="Search Products" />

            {
                input && (
                    <button className={styles.clear} onClick={handleClear} aria-label="Clear Search">
                        <X size={16} /> 

                    </button>
                )
            }

        </div>
    )
}

export default SearchBar