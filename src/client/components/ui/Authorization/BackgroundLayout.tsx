import React from 'react'
import styles from './background-layout.module.css'

export interface LayoutProps {
  children: React.ReactNode
}

const BackgroundLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className={styles.context}>{children}</div>
      <div className={styles.area}>
        <ul className={styles.circles}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  )
}

export default BackgroundLayout
