// components/Loader.js
import styles from './Loader.module.css';

const Loader = () => {
  const letters = ['U', 'N', 'E', 'L', 'M', 'A'];

  return (
    <div className={styles.loaderWrapper}>
      {letters.map((letter, index) => (
        <span
          key={index}
          className={styles.loaderLetter}
          style={{ animationDelay: `${0.1 + index * 0.105}s` }}
        >
          {letter}
        </span>
      ))}
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
