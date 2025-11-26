import styles from './ArrowButton.module.css';


export default function ArrowButton({ onClick }) {
return (
<div className={styles.arrow} onClick={onClick}>
<div className={styles.arrowTop}> </div>
<div className={styles.arrowBottom}> </div>
</div>
);
}