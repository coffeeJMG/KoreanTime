import { SafeUser, ScheduleType } from "@/app/types";

interface scheduleProps {
    schedule: ScheduleType & {
        user: SafeUser;
    };
}

export const Schedule: React.FC<scheduleProps> = ({ schedule }) => {
    return (
        <>
            <div>1</div>
        </>
    );
};
