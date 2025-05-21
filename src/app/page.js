import Image from "next/image";
import styles from "./page.module.css";
import prisma from '../../lib/prisma.ts';

export default async function Home() {
  // 直接在 Server Component 中撈資料
  const accounts = await prisma.account.findMany();
  console.log(accounts);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.js</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        {/* 顯示帳號資料 */}
        <h2>Accounts</h2>
        <ul>
          {accounts.map((account) => (
            <li key={account.id}>
              {account.username} ({account.id})
            </li>
          ))}
        </ul>

        <div className={styles.ctas}>
          {/* 略去原本按鈕區塊 */}
        </div>
      </main>
      <footer className={styles.footer}>
        {/* 略去 footer */}
      </footer>
    </div>
  );
}
