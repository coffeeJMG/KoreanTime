import { Container } from "./components/Container";
import "./globals.css";
import type { Metadata } from "next";
import { ToasterProvider } from "./providers/ToasterProvider";
import { Navbar } from "./components/Navbar";
import { ClientOnly } from "./ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";
import { NewScheduleModal } from "./components/modals/NewScheduleModal";
import { InviteModal } from "./components/modals/InviteModal";
import { InvitationModal } from "./components/modals/InvitationModal";
import getinvitationList from "./actions/getInvitationList";
import { DeleteScheduleModal } from "./components/modals/DeleteScheduleModal";
import LoginForm from "./components/LoginForm";
import ScheduleList from "./components/SchedulList";

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
    const invitationList = await getinvitationList();

    return (
        <html lang="en">
            <body>
                <ClientOnly>
                    <ToasterProvider />
                    <Navbar currentUser={currentUser} />
                    <NewScheduleModal currentUser={currentUser} />
                    <InviteModal />
                    <DeleteScheduleModal />

                    <InvitationModal invitationList={invitationList} />
                </ClientOnly>
                <Container>{children}</Container>
            </body>
        </html>
    );
}
