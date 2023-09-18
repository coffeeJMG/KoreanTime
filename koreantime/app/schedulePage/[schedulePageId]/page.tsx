import { getScheduleId } from "@/app/actions/getScheduleId";
import { IParams } from "@/app/types";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Schedule from "./Schedule";

const SchedulePage = async ({ params }: { params: IParams }) => {
    const schedule = await getScheduleId(params);
    const currentUser = await getCurrentUser();

    if (!schedule) {
        return <></>;
    }

    return (
        <>
            <Schedule schedule={schedule} currentUser={currentUser} />
        </>
    );
};
export default SchedulePage;
