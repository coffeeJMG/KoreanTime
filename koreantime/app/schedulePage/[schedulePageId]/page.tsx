import { getScheduleId } from "@/app/actions/getScheduleId";
import { Schedule } from "./Schedule";
import { IParams } from "@/app/types";
import getCurrentUser from "@/app/actions/getCurrentUser";

const SchedulePage = async ({ params }: { params: IParams }) => {
    const schedule = await getScheduleId(params);
    const currentUser = await getCurrentUser();

    if (!schedule) {
        return null;
    }

    return (
        <>
            <Schedule schedule={schedule} currentUser={currentUser} />
        </>
    );
};
export default SchedulePage;
