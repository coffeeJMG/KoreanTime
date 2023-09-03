import { Container } from "./components/Container";
import "./globals.css";
import type { Metadata } from "next";
import { ToasterProvider } from "./providers/ToasterProvider";
import { Navbar } from "./components/Navbar";
import { ClientOnly } from "./ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";
import { NewSchedule } from "./components/modals/NewScheduleModal";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();

    return (
        <html lang="en">
            <body>
                <ClientOnly>
                    <ToasterProvider />
                    <Navbar currentUser={currentUser} />
                    <NewSchedule />
                </ClientOnly>
                <Container>{children}</Container>
            </body>
        </html>
    );
}
