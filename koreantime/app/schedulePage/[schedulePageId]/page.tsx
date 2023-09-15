import { getScheduleId } from "@/app/actions/getScheduleId";
import { Schedule } from "./Schedule";
import { IParams } from "@/app/types";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getMembersLocation } from "@/app/actions/getMemebersLocation";

const SchedulePage = async ({ params }: { params: IParams }) => {
    const schedule = await getScheduleId(params);
    const currentUser = await getCurrentUser();
    let membersLocation;
    if (typeof params.schedulePageId === "string") {
        membersLocation = await getMembersLocation(params.schedulePageId);
        // 필요한 경우 setState 또는 다른 로직을 사용하여 fetched 데이터를 처리합니다.
    }
    console.log(membersLocation);
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
