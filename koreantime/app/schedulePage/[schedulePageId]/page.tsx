import { getScheduleId } from "@/app/actions/getScheduleId";
import { Schedule } from "./Schedule";

interface IParams {
    schedulePageId?: string | undefined;
}

const SchedulePage = async ({ params }: { params: IParams }) => {
    const schedule = await getScheduleId(params);
    console.log(schedule);
    return <>{/* <Schedule schedule={schedule} /> */}</>;
};

export default SchedulePage;
