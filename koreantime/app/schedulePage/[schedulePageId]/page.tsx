import { getScheduleId } from "@/app/actions/getScheduleId";
import { Schedule } from "./Schedule";
import { IParams } from "@/app/types";

const SchedulePage = async ({ params }: { params: IParams }) => {
    const schedule = await getScheduleId(params);

    if (!schedule) {
        return null;
    }

    console.log(schedule);
    return <>{<Schedule schedule={schedule} />}</>;
};
export default SchedulePage;
