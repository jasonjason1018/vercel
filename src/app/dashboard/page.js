import { cookies } from 'next/headers';
import styles from "./page.module.css";
import prisma from '../../../lib/prisma';
import { redirect } from 'next/navigation';

export default async function Home() {
    const cookieStore = cookies();
    const idAccount = Number(cookieStore.get('id_account')?.value);

    if (!idAccount) {
        redirect('/');
    }
    
    const account = await prisma.account.findFirst({
        where: { id: idAccount },
        select: {
            username: true
        }
    });

    return (
        <div>
            <h1>Dashboard</h1>
            <div className={styles.container}>
                <p>Hi {account.username}</p>
                <br/>
                <p>Welcome to the dashboard!</p>
            </div>
        </div>
    );
}