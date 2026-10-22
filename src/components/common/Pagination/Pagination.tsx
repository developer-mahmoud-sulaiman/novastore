import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.css'

interface PaginationProps 
{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function getPageNumbers( current: number, total: number): (number | '...')[] {
    if (total <= 7) 
    {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 3) 
    {
        return [1, 2, 3, 4, '...', total];
    }

    if (current >= total - 2) 
    {
        return [1, '...', total - 3, total - 2, total - 1, total];
    }

    return [1, '...', current - 1, current, current + 1, '...', total];
}

function Pagination({currentPage, totalPages, onPageChange}: PaginationProps)
{
    if (totalPages <= 1) return null

    const page = getPageNumbers(currentPage, totalPages)

    return(
        <nav className={styles.wrapper} aria-label='Pagination'>

            <button type="button"  className={styles.arrow} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} aria-label='Previous Page'>
                    <ChevronLeft size={18} />
            </button>

            {
                page.map((p, i) => 
                    p === '...' ? (
                        <span key={`dots-${i}`} className={styles.dots}>...</span>
                    ) : (
                        <button type="button" key={p} className={`${styles.page} ${p === currentPage ? styles.active : ''}`} onClick={() => onPageChange(p)}>
                            {p}
                        </button>
                    )
                )
            }

            <button type="button" className={styles.arrow} onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label='Next Page'>
                    <ChevronRight size={18} />
            </button>

        </nav>
    )
}

export default Pagination