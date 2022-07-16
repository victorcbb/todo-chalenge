import imageLogo from "../assets/logo.svg"

import styles from "./Header.module.css"

export function Header() {
  return (
    <div className={styles.header}>
      <img src={imageLogo} alt="Logotipo de foguete decolando" />
      <h1>
        to<span>do</span>
      </h1>
    </div>
  )
}